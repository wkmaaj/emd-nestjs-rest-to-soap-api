import { Injectable } from '@nestjs/common';
// import { logger } from '../log';
import { Namespace, SoapConvert } from './soap.convert';

@Injectable()
export class SoapUtil {
  constructor(private readonly soapConvert: SoapConvert) {}

  convertRestToSoap = (
    request: {
      [key: string]: any;
    },
    nsOpts: Partial<{
      namespace: Partial<Namespace>;
      namespaces: Partial<Namespace>[];
    }> = {
      namespace: { prefix: '', value: '' },
      namespaces: [],
    },
    opts?: Partial<{
      includeNsDeclaration: boolean;
      isClosingTag: boolean;
      isSingleTag: boolean;
    }>,
  ): string => {
    console.log(
      `SoapUtil | convertRestToSoap | Incoming variables:\n${request}\n${nsOpts}\n${opts}`,
    );
    // logger.trace('SoapUtil', '', request);
    // logger.trace('SoapUtil', '', nsOpts);
    // logger.trace('SoapUtil', '', opts);

    return this.soapConvert.buildSoapEnvelope(
      this.soapConvert.buildSoapBody({
        ...request,
        ...{
          namespace: {
            prefix: 'emd',
            value: 'llc:jaradatbros:emd:api:soap:mongo',
          },
        },
        opts,
      }),
      { prefix: 'emd', value: 'llc:jaradatbros:emd:api:soap:mongo' },
    );
  };
}
