import nodemailer from 'nodemailer';
import fs from 'fs';
import { authorize } from '../utils/googleapis/gapi.js';
import { google } from 'googleapis';

export const enviarCorreos = async (req, res) => {
    let remitente = 'noreplycentenario@pgjhidalgo.gob.mx';
    let destinatario = req.body.correo;
    let asunto = req.body.asunto;
    let mensaje = req.body.mensaje;
    let opciones = req.body.opciones;
    
    if(!destinatario || !asunto || !mensaje){
        return new Error('faltan datos por enviar para completar la operación, revise bien');
    } else {

        try {
            // Load client secrets from a local file.
            fs.readFile('../backend/utils/googleapis/credentials.json', (err, content) => {
                if (err) return console.log('Error loading client secret file:', err);
                authorize(JSON.parse(content), (auth) => {
                    var raw = makeBody(destinatario, remitente, asunto, mensaje);
                    const gmail = google.gmail({version: 'v1', auth});
                    gmail.users.messages.send({
                        auth: auth,
                        userId: 'me',
                        resource: {
                            raw: raw
                        }
                    
                    }, (err, response) => {
                        console.log(err || response)
                        return(err || response)
                    });
                });
            });           

            
        } catch (error) {
            console.error(new Error(error.message))
        }

    }
    
};

function makeBody(to, from, subject, message) {
    var str = ["Content-Type: text/plain; charset=\"UTF-8\"\n",
        "MIME-Version: 1.0\n",
        "Content-Transfer-Encoding: 7bit\n",
        "to: ", to, "\n",
        "from: ", from, "\n",
        "subject: ", subject, "\n\n",
        message
    ].join('');
  
    var encodedMail = new Buffer.from(str).toString("base64").replace(/\+/g, '-').replace(/\//g, '_');
    return encodedMail;
};
