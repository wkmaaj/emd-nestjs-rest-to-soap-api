import { Injectable } from '@nestjs/common';
import { getSoapEnvelopeElements } from './soap.constant';

export type Namespace = {
  prefix: string;
  value: string;
};

@Injectable()
export class SoapConvert {
  buildNsDeclaration = (namespaces: Partial<Namespace>[]): string =>
    namespaces
      .map(
        (namespace) =>
          ` xmlns${namespace.prefix ? `:${namespace.prefix}` : ''}="${
            namespace.value
          }"`,
      )
      .reduce((prev, curr) => `${prev}${curr}`, '');

  buildXmlElementTag = (
    name: string,
    namespace: Partial<Namespace> = { prefix: '', value: '' },
    namespaces: Partial<Namespace>[] = [],
    opts: Partial<{
      includeNsDeclaration: boolean;
      isClosingTag: boolean;
      isSingleTag: boolean;
    }> = {
      includeNsDeclaration: false,
      isClosingTag: false,
      isSingleTag: false,
    },
  ): string =>
    `<${opts.isClosingTag ? '/' : ''}${
      namespace.prefix ? `${namespace.prefix}:` : ''
    }${name}${
      opts.includeNsDeclaration && namespaces.length > 0
        ? this.buildNsDeclaration(namespaces)
        : ''
    }${opts.isSingleTag ? ' /' : ''}>`;

  buildSoapEnvelope = (
    body: string,
    namespace = { prefix: '', value: '' },
  ): string =>
    getSoapEnvelopeElements(namespace)
      .map(
        (soapEnvelopeElement) =>
          `${
            soapEnvelopeElement.name === 'Body' &&
            soapEnvelopeElement.opts.isClosingTag
              ? body
              : ''
          }${this.buildXmlElementTag(
            soapEnvelopeElement.name,
            soapEnvelopeElement.namespace,
            soapEnvelopeElement.namespaces,
            soapEnvelopeElement.opts,
          )}`,
      )
      .reduce((prev, curr) => `${prev}${curr}`, '');

  buildSoapBody = (
    request: {
      [key: string]: any;
      namespace?: Partial<Namespace>;
      namespaces?: Partial<Namespace>[];
    } = { namespace: { prefix: '', value: '' }, namespaces: [] },
  ): string => {
    console.log(
      `SoapConvert | buildSoapBody | Incoming request:\n${JSON.stringify(
        request,
        null,
        2,
      )}\n`,
    );
    return Object.keys(request)
      .filter(
        (key) => !['nsPrefix', 'namespace', 'namespaces', 'opts'].includes(key),
      )
      .map((filteredKey) => {
        console.log(
          `filteredKey: ${filteredKey}\nrequest[filteredKey]: ${JSON.stringify(
            request[filteredKey],
            null,
            2,
          )}`,
        );

        if (typeof request[filteredKey] === 'object') {
          return `${this.buildXmlElementTag(
            filteredKey,
            request.namespace,
            request.namespaces,
            {
              includeNsDeclaration: false,
              isClosingTag: false,
              isSingleTag: false,
            },
          )}${this.buildSoapBody({
            ...request[filteredKey],
            namespace: request.namespace,
            namespaces: request.namespaces,
          })}${this.buildXmlElementTag(
            filteredKey,
            request.namespace,
            request.namespaces,
            {
              includeNsDeclaration: false,
              isClosingTag: true,
              isSingleTag: false,
            },
          )}`;
        }
        return `${this.buildXmlElementTag(
          filteredKey,
          request.namespace,
          request.namespaces,
          {
            includeNsDeclaration: false,
            isClosingTag: false,
            isSingleTag: false,
          },
        )}${request[filteredKey]}${this.buildXmlElementTag(
          filteredKey,
          request.namespace,
          request.namespaces,
          {
            includeNsDeclaration: false,
            isClosingTag: true,
            isSingleTag: false,
          },
        )}`;
      })
      .reduce((prev, curr) => `${prev}${curr}`, '');
  };
}
