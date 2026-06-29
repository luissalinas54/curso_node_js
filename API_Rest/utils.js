// FORMA RECOEMNDADA DE LEER UN JSON
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url); // import.meta.url nos da la direccion del  archivo actual

export const readJSON = (path) => require(path);
