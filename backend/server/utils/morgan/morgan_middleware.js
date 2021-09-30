import morgan from "morgan";
import dotenv from "dotenv";
import logger from "../logger/logger_index.js";

dotenv.config();

// cambia el stream de morgan por el de winston logger
const stream = {
  write: (message) => logger.http(message),
};

// determina si el ambiente es de produccion o desarrollo
// si es de produccion, evita escribir cosas
// si es de desarrollo, setea el skip en false para escribir cosas
const skip = () => {
  const env = process.env.NODE_ENV || "development";
  return env !== "development";
};

// morgan middleware
const morganMiddleware = morgan(
  ":method :url :status :res[content-length] - :response-time ms",
  { stream, skip }
);

export default morganMiddleware;