import winston from "winston";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import dotenv from "dotenv";

dotenv.config();

// url completa de este archivo
const __dirname = dirname(fileURLToPath(import.meta.url));

// Niveles de prioridad para morgan
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
}

// determina el nivel de acuerdo al ambiente en .env
const level = () => {
  const env = process.env.NODE_ENV || 'production'
  const isDevelopment = env === 'development'
  return isDevelopment ? 'warn' : 'debug'
}

// selecciona los colores de los mensajes
const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
}
winston.addColors(colors);

// Layout del log
const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  //winston.format.colorize({ all: true }),
  winston.format.printf(
    ({ level, message, label, timestamp, stack }) => {
      return `${timestamp} [${label}] ${level}: ${stack || message}`;
    })
);

// Indica por donde debe de ser impreso el log
const transports = [
  // archivos en maintenance
  new winston.transports.File({
    filename: __dirname + '../../../maintenance/development/logs/errores.log',
    level: 'error',
  }),
  new winston.transports.File({ 
    filename: __dirname + '../../../maintenance/development/logs/combined.log',
  })
]

// agrega un label al formato
const label = winston.format.label({ label: 'Production' });

// funcion para crear el logger
function set_dev_logger () {
  return winston.createLogger({
    level: level(),
    label,
    levels,
    format,
    transports,
  })
}
  
  // Niveles de logging(tolerancia):
  //    error:    0
  //    warn:     1
  //    info:     2
  //    http:     3
  //    verbose:  4
  //    debug:    5
  //    silly:    6


export default set_dev_logger;











// ⠀⠀⠀⠀⠀⠀⠀⢀⣤⣶⣶⣦⣄⠀⠀⠀⠀⠀⠀⠀
// ⠀⠀⠀⠀⠀⠀⣰⡿⠋⢀⣀⠈⠻⣷⡄⠀⠀⠀⠀⠀
// ⠀⠀⠀⠀⠀⠀⣿⡇⠐⠿⠻⣷⠀⢹⣷⠀⠀⠀⠀⠀
// ⠀⠀⠀⠀⠀⠀⠘⢿⣦⣤⣾⠟⠀⣼⡏⠀⠀⠀⠀⠀
// ⠀⠀⠀⣀⣠⣤⣄⣀⠉⠉⢁⣠⣾⠟⠁⠀⠀⠀⠀⠀
// ⠀⣠⣾⠟⠋⠉⠙⠛⢿⣿⣿⡿⠁⣠⣴⣶⣶⣤⡀⠀
// ⢠⣿⠃⢠⣾⠿⢷⣦⠀⢻⣿⠁⢰⣿⠁⣀⡈⠹⣷⡀
// ⠸⣿⠀⠸⣧⡦⠀⣿⡇⠈⣿⡄⠘⣿⣤⣼⡇⠀⣿⡇
// ⠀⠻⣷⣄⣀⣀⣴⡿⠁⠀⠙⣿⣄⡀⠉⠉⣀⣼⡟⠀
// ⠀⠀⠈⠙⠛⠛⠉⠀⠀⠀⠀⠈⠙⠻⠿⠿⠛⠉⠀⠀;
