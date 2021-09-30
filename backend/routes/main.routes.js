import { Router } from "express";
import { 
    enviarCorreos,
} from "../controllers/main.controller.js";
import { check, validationResult  } from 'express-validator';

const router = Router();

//Enviar correos electrónicos
router.post('/correo/enviar', [ 
    check('correo').not().isEmpty().trim().escape(),
    check('asunto').not().isEmpty().trim().escape(),
    check('mensaje').not().isEmpty().trim().escape(),
  ], (req, res) => { 
    // console.log(req)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
        var respuesta = enviarCorreos(req, res).then(respuesta => {
            res.send(JSON.stringify({
                    estado: 'completado',
                    mensaje: 'Los datos han sido registrados correctamente',
                    datos: respuesta
                }));
        })
        .catch((error) => {
            console.log(error)
            res.send(JSON.stringify({
                estado: 'fallido',
                mensaje: 'Los datos no han sido registrados',
                datos: error
            }));
        });
    }
});


export default router;



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