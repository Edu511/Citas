import request from "supertest"; 
import app from '../server.js';

describe('amparos_api', () => {
    it('GET /api/listarAmparos ---> array amparos', () => {
        return request(app)
            .get('/api/listarAmparos')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toContain('no_amparo')
            });
    });

    it('GET /api/buscarAmparoPorId/:id ---> buscar el amparo por ID', () => {
        return request(app)
            .get('/api/buscarAmparoPorId/2')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual(expect.arrayContaining({
                    no_amparo: expect.any(String),
                    quejoso: expect.any(String),
                }))
            });
    });

    it('GET /api/buscarAmparoPorId/:id ---> regresa un 404 si no encuentra nada', () => {
        return request(app)
        .get('/api/listarAmparos')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
            expect(response.body).toEqual(expect.arrayContaining({
                no_amparo: expect.any(String),
                quejoso: expect.any(String),
            }))
        });
    });


    it('POST /api/nuevoAmparo ---> registrar nuevo amparo', () => {
        return request(app)
        .get('/api/listarAmparos')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
            expect(response.body).toEqual(expect.arrayContaining({
                no_amparo: expect.any(String),
                quejoso: expect.any(String),
            }))
        });
    });

    it('PUT /api/actualizarAmparoPorId/:id ---> actualizar amparo especificado por ID', () => {
        return request(app)
        .get('/api/listarAmparos')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
            expect(response.body).toEqual(expect.arrayContaining({
                no_amparo: expect.any(String),
                quejoso: expect.any(String),
            }))
        });
    });

    it('POST /api/eliminarAmparoPorId/:id ---> eliminar un amparo por ID', () => {
        return request(app)
        .get('/api/listarAmparos')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
            expect(response.body).toEqual(expect.arrayContaining({
                no_amparo: expect.any(String),
                quejoso: expect.any(String),
            }))
        });
    });

    it('POST /api/buscarAmparoPorBuscador ---> busca amparos desde la barra de busqueda', () => {
        return request(app)
        .get('/api/listarAmparos')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
            expect(response.body).toEqual(expect.arrayContaining({
                no_amparo: expect.any(String),
                quejoso: expect.any(String),
            }))
        });
    });

    
    it('POST /api/BucarAmparosPorFiltro ---> busca amparos desde el boton filtros', () => {
        return request(app)
        .get('/api/listarAmparos')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
            expect(response.body).toEqual(expect.arrayContaining({
                no_amparo: expect.any(String),
                quejoso: expect.any(String),
            }))
        });
    });

})










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