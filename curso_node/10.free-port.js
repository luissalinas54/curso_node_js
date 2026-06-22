// FUNCIÓN PARA ENCONTRAR UN PUERTO DISPONIBLE.
//
// Funcionamiento:
// 1. Intenta abrir un servidor temporal en el puerto solicitado.
// 2. Si el puerto está libre:
//      - Obtiene el número de puerto asignado.
//      - Cierra inmediatamente el servidor para liberar el puerto.
//      - Devuelve el puerto encontrado mediante resolve().
// 3. Si el puerto está ocupado (EADDRINUSE):
//      - Solicita al sistema operativo que asigne automáticamente
//        cualquier puerto libre usando findAvailablePort(0).
//      - Devuelve el nuevo puerto disponible encontrado.
// 4. Si ocurre cualquier otro error:
//      - Rechaza la promesa mediante reject().
//
// Ejemplo:
//   findAvailablePort(3000)
//
//   Caso 1:
//     Puerto 3000 libre  -> devuelve 3000
//
//   Caso 2:
//     Puerto 3000 ocupado -> busca otro puerto
//     El sistema asigna, por ejemplo, 52341
//     -> devuelve 52341

const net = require('node:net');

function findAvailablePort (dessiredPort) {
  return new Promise((resolve, reject) => {
    const server = net.createServer();

    server.listen(dessiredPort, () => {
      const { port } = server.address(); // Obtiene la información de la dirección donde quedó escuchando el servidor.
      server.close(() => { // Cuando se coprueba que el puerto esta disponible, se cierra el servidor, liberando el puerto nuevamente
        resolve(port); // Termina la promesa y devuelve el numero del puerto
      });
    });
    // Se genera une scuchador de eventos con .on, 'error' es el evento que se dispara y err contiene info sobre el error
    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') { // EADDRINUSE = Error Address In Use
        findAvailablePort(0).then(port => resolve(port));
      } else {
        reject(err);
      }
    });
  });
}

module.exports = { findAvailablePort };
