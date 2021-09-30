import nodemailer from 'nodemailer';
import fs from 'fs';
import { google } from 'googleapis';

export const enviarCorreos = async (req, res) => {
    let correo = req.body.correo;
    let asunto = req.body.asunto;
    let mensaje = req.body.mensaje;
    let opciones = req.body.opciones;
    
    if(!correo || !asunto || !mensaje){
        return new Error('faltan datos por enviar para completar la operación, revise bien');
    } else {

        try {
            let client_id = process.env.GAPI_CLIENT_ID || '837480058245-vk4i0mtdij09ml8is97looa7t328cfnq.apps.googleusercontent.com';
            let client_secret = process.env.GAPI_CLIENT_SECRET || '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';
            let refresh_token = process.env.GAPI_REFRESH_TOKEN || '1//04ovlvgAwRKVQCgYIARAAGAQSNwF-L9Iryqt187lHAKtnY6LYKk_bgswyJFMXw2J7qFQU33H8YYdldkAyOf2KDeSNX6lte_tBalo';
            const redirect_uris =  "https://www.googleapis.com/auth/gmail.send";

            let oauth2 = new google.auth.OAuth2(client_id, client_secret, redirect_uris)
            oauth2.setCredentials({ refresh_token: refresh_token });
            const access_token = oauth2.getAccessToken();

            const transporter = nodemailer.createTransport({
                port: 465,               // true for 465, false for other ports
                host: "smtp.gmail.com",
                auth: {
                        type: 'OAuth2',
                        user: 'sthefanyrangel.it@gmail.com',
                        clientId: client_id,
                        clientSecret: client_secret,
                        refreshToken : refresh_token,
                        accessToken : access_token,
                        accessUrl: 'https://oauth2.googleapis.com/token'
                    },
                secure: true,
                });
            
            let html = '<h1>' + asunto + '</h1> <br> ' + mensaje + '<br/>'

            const mailData = {
                from: 'Portal de registro de denuncias de la PGJEH <sthefanyrangel.it@gmail.com>',  // sender address
                    to: correo,   // list of receivers
                    subject: asunto,
                    text: mensaje,
                    html: html,
                };

            transporter.sendMail(mailData, function (err, info) {
                if(err)
                    console.log(err)
                else
                    console.log(info);
            });


        } catch (error) {
            console.error(new Error(error.message))
        }

    }
    
};