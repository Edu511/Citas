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
        enviarCorreos(req, res).then(respuesta => {
            
            res.send(JSON.stringify({
                estado: 'completado',
                mensaje: 'El correo ha sido enviado con éxito',
                respuesta: respuesta,
            }));
    })
        .catch((error) => {
            console.error(new Error(error))
            res.send(JSON.stringify({
                estado: 'fallido',
                mensaje: 'Error al enviar el correo, revise información del error',
                error: error
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