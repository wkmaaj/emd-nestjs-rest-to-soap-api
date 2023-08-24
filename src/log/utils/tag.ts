const FIELD_TAG_KEYS = [
  'UserId',
  'UserType',
  'System',
  'EventType',
  'EventId',
  'EventStatus',
  'SessionId',
  'StatusCode',
];

export const isFieldTag = (obj: object) => {
  if (Object.keys(obj).length > 0) {
    try {
      return Object.keys(obj)
        .map((key) => FIELD_TAG_KEYS.includes(key))
        .reduce((prev, curr) => {
          if (prev === true || curr === true) return true;
          return false;
        });
    } catch (e) {
      return false;
    }
  }
  return false;
};

export const setTags = (req, options: { [key: string]: string } = {}) => ({
  Path: `${req.url}`,
  ...(() => (options && options.eventId ? { EventId: options.eventId } : {}))(),
  SrcAddr: `${req.headers['x-forwarded-for']}`,
  DestinationSrcAddr: `${req.socket.remoteAddress}`,
  DeviceIdentifier: `${req.socket.remoteAddress}`,
});
