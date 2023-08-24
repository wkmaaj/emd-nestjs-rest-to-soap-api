import { configure } from 'safe-stable-stringify';

export default (maximumDepth = 2) =>
  configure({
    bigint: true,
    maximumDepth,
  });
