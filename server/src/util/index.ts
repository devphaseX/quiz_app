function buildMongoLocalURL(option: {
  host: string;
  port: number;
  type: string;
}) {
  return `${option.host}:${option.port}/${option.type}`;
}
export { buildMongoLocalURL };
