import nodemailer from 'nodemailer';
import { google } from 'googleapis';

export const enviarCorreos = async (req, res) => {
    let correo = req.body.correo;
    let asunto = req.body.asunto;
    let mensaje = req.body.mensaje;
    let opciones = req.body.opciones;
    
    if(!correo || !asunto || !mensaje){

    } else {
        const gmail = google.gmail({version: 'v1', auth});
        let resultado = await gmail.users.labels.list({
            userId: 'me',
        }).then((resultado) => {
            const labels = resultado.data.labels;
            if (labels.length) {
                console.log('Labels:');
                labels.forEach((label) => {
                    console.log(`- ${label.name}`);
                });
            }
            
            return labels; 
        }).catch((error) => {
            
            if (error) return console.log('The API returned an error: ' + error);
        })

        return resultado
    }
    
};