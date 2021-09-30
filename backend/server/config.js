const config = require('./dotenv');
 config();

 export default {
     port: process.env.PORT || 5000,
     db_user: process.env.DB_USER,
     db_pass: process.env.DB_PASSWORD,
     db_server: process.env.DB_SERVER,
     db_database: process.env.DB_DATABASE,
 }





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