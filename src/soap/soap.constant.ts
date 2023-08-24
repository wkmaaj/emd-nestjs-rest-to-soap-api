import { Namespace } from './soap.convert';

const SOAP_NAMESPACE_PREFIX = 'SOAP-ENV';
const SOAP_URL = 'http://schemas.xmlsoap.org/soap/envelope/';

export const getSoapEnvelopeElements = (
  opts: Partial<Namespace> = { prefix: '', value: '' },
) => [
  {
    name: 'Envelope',
    ...(() =>
      opts.prefix || opts.value
        ? {
            namespace: { prefix: SOAP_NAMESPACE_PREFIX, value: SOAP_URL },
            namespaces: [
              { prefix: opts.prefix, value: opts.value },
              { prefix: SOAP_NAMESPACE_PREFIX, value: SOAP_URL },
            ],
          }
        : {
            namespace: { prefix: SOAP_NAMESPACE_PREFIX, value: SOAP_URL },
            namespaces: [{ prefix: SOAP_NAMESPACE_PREFIX, value: SOAP_URL }],
          })(),
    opts: {
      includeNsDeclaration: true,
      isClosingTag: false,
      isSingleTag: false,
    },
  },
  {
    name: 'Header',
    ...(() =>
      opts.prefix || opts.value
        ? {
            namespace: { prefix: SOAP_NAMESPACE_PREFIX, value: SOAP_URL },
            namespaces: [
              { prefix: opts.prefix, value: opts.value },
              { prefix: SOAP_NAMESPACE_PREFIX, value: SOAP_URL },
            ],
          }
        : {
            namespace: { prefix: SOAP_NAMESPACE_PREFIX, value: SOAP_URL },
            namespaces: [{ prefix: SOAP_NAMESPACE_PREFIX, value: SOAP_URL }],
          })(),
    opts: {
      includeNsDeclaration: false,
      isClosingTag: false,
      isSingleTag: true,
    },
  },
  {
    name: 'Body',
    ...(() =>
      opts.prefix || opts.value
        ? {
            namespace: { prefix: SOAP_NAMESPACE_PREFIX, value: SOAP_URL },
            namespaces: [
              { prefix: opts.prefix, value: opts.value },
              { prefix: SOAP_NAMESPACE_PREFIX, value: SOAP_URL },
            ],
          }
        : {
            namespace: { prefix: SOAP_NAMESPACE_PREFIX, value: SOAP_URL },
            namespaces: [{ prefix: SOAP_NAMESPACE_PREFIX, value: SOAP_URL }],
          })(),
    opts: {
      includeNsDeclaration: false,
      isClosingTag: false,
      isSingleTag: false,
    },
  },
  {
    name: 'Body',
    ...(() =>
      opts.prefix || opts.value
        ? {
            namespace: { prefix: SOAP_NAMESPACE_PREFIX, value: SOAP_URL },
            namespaces: [
              { prefix: opts.prefix, value: opts.value },
              { prefix: SOAP_NAMESPACE_PREFIX, value: SOAP_URL },
            ],
          }
        : {
            namespace: { prefix: SOAP_NAMESPACE_PREFIX, value: SOAP_URL },
            namespaces: [{ prefix: SOAP_NAMESPACE_PREFIX, value: SOAP_URL }],
          })(),
    opts: {
      includeNsDeclaration: false,
      isClosingTag: true,
      isSingleTag: false,
    },
  },
  {
    name: 'Envelope',
    ...(() =>
      opts.prefix || opts.value
        ? {
            namespace: { prefix: SOAP_NAMESPACE_PREFIX, value: SOAP_URL },
            namespaces: [
              { prefix: opts.prefix, value: opts.value },
              { prefix: SOAP_NAMESPACE_PREFIX, value: SOAP_URL },
            ],
          }
        : {
            namespace: { prefix: SOAP_NAMESPACE_PREFIX, value: SOAP_URL },
            namespaces: [{ prefix: SOAP_NAMESPACE_PREFIX, value: SOAP_URL }],
          })(),
    opts: {
      includeNsDeclaration: false,
      isClosingTag: true,
      isSingleTag: false,
    },
  },
];
