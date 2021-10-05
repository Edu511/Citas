import express from 'express';
import dotenv from 'dotenv';
import url from 'url';
import middleware from './middlewares/index.js';

// importación de rutas...
import mainRoutes from './routes/main.routes.js'

// Settings
dotenv.config();
const app = express();
const base_url = url.host;
const cors_credentials = process.env.NODE_ENV === 'production' ? true : false;

// Middlewares
middleware(app);

//Rutas
app.get('/', (req, res) => {
    console.log('--------------------> Conectados a back-end <--------------------');
    res.send('----------> Conectados a back-end <----------');
})
app.use(mainRoutes);

//Conexion a servidor
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log('-------------------- ¡ Estamos en línea desde el puerto', port, '! --------------------');

});

export default app;







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