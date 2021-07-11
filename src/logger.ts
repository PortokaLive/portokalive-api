import Loglestial from "@techlestial/loglestial";
const logger = Loglestial.init({ logToFile: true });

const stream = Object.create(process.stdout);
stream.write = logger.info;

export const loggerStream = stream;
export default logger;
