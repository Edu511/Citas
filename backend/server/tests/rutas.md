# Rutas

============================================================

## todas son con el server hhtp://localhost:5000/

============================================================

### ** rutas de login **

- POST : /api/login

  Inicia sesión y da un JWT token de vuelta

- GET : /api/logout

  Borra todas las cookies puestas en el client

============================================================

## a partir de aqui ** todas estas rutas llevan el middleware 'authenticate' **

============================================================

### ** rutas de usuarios **

CRUD de usuarios para base de datos

- GET : /api/listarUsuarios

  lista todos los usuarios de la BD

- GET : /api/listarUsuarioPorID/:id

  Obtiene la info de un usuario de acurdo al id pasado en el slug

- POST : /api/nuevoUsuario

  Registra un usuario en la base de datos

- PUT : /api/actualizarUsuarioPorId/:id

  Actualiza la información de un usuario mencionado por el id del slug

- PUT : /api/eliminarUsuarioPorId/:id

  Elimina un usuario por el id que se pasa en el slug (paranoid)

- POST : /api/buscarUsuarioPorBuscador

  Busca un usuario de acuerdo al valor 'busqueda' que se pasa en el body ex. { busqueda: 'mariano' }

- POST : /api/buscarUsuarioPorFiltro

  Lista los usuarios de acuerdo al valor 'columna' y 'direccion' que se pasa en el body ex. { columna: 'fecha', direccion: 'ASC' }

============================================================

### ** rutas de juicios **

CRUD de juicios de amparo

- GET : /api/listarAmparos

  lista todos los amparos de la BD

- GET : /api/buscarAmparoPorId/:id

  Obtiene la info de un juicio de amparo de acurdo al id pasado en el slug

- POST : /api/nuevoAmparo

  Registra un juicio de amparo en la base de datos

- PUT : /api/actualizarAmparoPorId/:id

  Actualiza la información de un juicio de amparo mencionado por el id del slug

- PUT : /api/eliminarAmparoPorId/:id

  Elimina un juicio de amparo por el id que se pasa en el slug (paranoid)

- POST : /api/buscarAmparoPorBuscador

  Busca un juicio de amparo de acuerdo al valor 'busqueda' que se pasa en el body ex. { busqueda: 'mariano' }

- POST : /api/buscarAmparoPorFiltro

  Lista los amparos de acuerdo al valor 'columna' y 'direccion' que se pasa en el body ex. { columna: 'fecha', direccion: 'ASC' }

============================================================

### ** rutas de autoridades responsables **

CRUD de autoridades responsables

- GET : /api/listarAutoridades

  lista todos los autoridades responsables de la BD (catálogo)

- GET : /api/buscarAutoridadPorId/:id

  Obtiene la info de una autoridad responsable de acurdo al id pasado en el slug

- POST : /api/nuevaAutoridad

  Registra una autoridad responsable en la base de datos

- PUT : /api/actualizarAutoridadPorId/:id

  Actualiza la información de una autoridad responsable mencionado por el id del slug

- PUT : /api/eliminarAutoridadPorId/:id

  Elimina una autoridad responsable por el id que se pasa en el slug (paranoid)

============================================================

### ** rutas de movimientos **

- GET : /api/listarMovimientos

  lista todos los movimientos de la BD

- GET : /api/buscarMovimientoPorId/:id

  Obtiene la info de un movimiento de acurdo al id pasado en el slug

- POST : /api/nuevoMovimiento

  Registra un movimiento en la base de datos

- PUT : /api/actualizarMovimientoPorId/:id

  Actualiza la información de un movimiento mencionado por el id del slug

- PUT : /api/eliminarMovimientoPorId/:id

  Elimina un movimiento por el id que se pasa en el slug (paranoid)

- POST : /api/buscarMovimentoPorBuscador

  Busca un movimiento de acuerdo al valor 'busqueda' que se pasa en el body ex. { busqueda: 'mariano' }

- POST : /api/buscarMovimientoPorFiltro

  Lista los movimientos de acuerdo al valor 'columna' y 'direccion' que se pasa en el body ex. { columna: 'fecha', direccion: 'ASC' }

============================================================

### ** rutas de notificaciones **

- GET : /api/listarTodasNotificaciones

  lista todos las notificaciones de la BD

- GET : /api/buscarNotificacionPorId/:id

  Obtiene la info de una notificación de acurdo al id pasado en el slug

- POST : /api/nuevaNotificacion

  Registra una notificación en la base de datos

- PUT : /api/actualizarNotificacionPorId/:id

  Actualiza la información de una notificación mencionado por el id del slug

- PUT : /api/eliminarNotificacionPorId/:id

  Elimina una notificación por el id que se pasa en el slug (paranoid)

============================================================

### ** rutas de roles **

- GET : /api/listarRoles (catálogo)

  lista todos los roles de la BD

- GET : /api/buscarRolPorId/:id

  Obtiene la info de un rol de acurdo al id pasado en el slug

- POST : /api/nuevoRol

  Registra un rol en la base de datos

- PUT : /api/actualizarRolPorId/:id

  Actualiza la información de un rol mencionado por el id del slug

- PUT : /api/eliminarRolPorId/:id

  Elimina un rol por el id que se pasa en el slug (paranoid)

- POST : /api/buscarRolPorBuscador

  Busca un rol de acuerdo al valor 'busqueda' que se pasa en el body ex. { busqueda: 'mariano' }

============================================================

### ** rutas de uniones autoridad-juicio **

- GET : /api/listarUnionesAutoridadJuicio

  lista todas las uniiones autoridad-juicio de la BD

- GET : /api/buscarUnionAutoridadJuicioPorId/:id

  Obtiene la info de una unión autoridad-juicio de acurdo al id pasado en el slug

- POST : /api/nuevaUnionAutoridadJuicio

  Registra una unión autoridad-juicio en la base de datos

- PUT : /api/actualizarUnionAutoridadJuicioPorId/:id

  Actualiza la información de una unión autoridad-juicio mencionado por el id del slug

- PUT : /api/eliminarUnionAutoridadJuicioPorId/:id

  Elimina una unión autoridad-juicio por el id que se pasa en el slug (paranoid)
