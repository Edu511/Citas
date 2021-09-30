import set_dev_logger from "./dev_logger.js";
import set_prod_logger from "./prod_logger.js";
import dotenv from "dotenv";

dotenv.config();

let logger = process.env.NODE_ENV == 'development' ? set_dev_logger() : set_prod_logger();

export default logger;












// ⠀⠀⠀⠀⠀⠀⠀⢀⣤⣶⣶⣦⣄⠀⠀⠀⠀⠀⠀⠀
// ⠀⠀⠀⠀⠀⠀⣰⡿⠋⢀⣀⠈⠻⣷⡄⠀⠀⠀⠀⠀
// ⠀⠀⠀⠀⠀⠀⣿⡇⠐⠿⠻⣷⠀⢹⣷⠀⠀⠀⠀⠀
// ⠀⠀⠀⠀⠀⠀⠘⢿⣦⣤⣾⠟⠀⣼⡏⠀⠀⠀⠀⠀
// ⠀⠀⠀⣀⣠⣤⣄⣀⠉⠉⢁⣠⣾⠟⠁⠀⠀⠀⠀⠀
// ⠀⣠⣾⠟⠋⠉⠙⠛⢿⣿⣿⡿⠁⣠⣴⣶⣶⣤⡀⠀
// ⢠⣿⠃⢠⣾⠿⢷⣦⠀⢻⣿⠁⢰⣿⠁⣀⡈⠹⣷⡀
// ⠸⣿⠀⠸⣧⡦⠀⣿⡇⠈⣿⡄⠘⣿⣤⣼⡇⠀⣿⡇
// ⠀⠻⣷⣄⣀⣀⣴⡿⠁⠀⠙⣿⣄⡀⠉⠉⣀⣼⡟⠀
// ⠀⠀⠈⠙⠛⠛⠉⠀⠀⠀⠀⠈⠙⠻⠿⠿⠛⠉⠀⠀