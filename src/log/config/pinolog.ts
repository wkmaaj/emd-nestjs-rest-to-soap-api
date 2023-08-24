import pino from 'pino';
import { stringify } from '../utils';

const pinolog = (
  name: string,
  isClientLogger = false,
  restClient = (obj: unknown): unknown => obj,
  httpConstants = {},
) =>
  pino({
    name,
    browser: isClientLogger
      ? {
          write: (o: any): string => stringify()(o, null, '2'),
        }
      : {},
    level: 'trace',
  });
