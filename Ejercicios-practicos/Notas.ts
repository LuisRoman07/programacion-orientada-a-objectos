import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Ingrese la nota del estudiante (0 - 10): ", (input) => {
    const nota = Number(input);

        if (isNaN(nota)) {
        console.log("Error: Debe ingresar un número válido.");
    } 
 
    else if (nota < 0 || nota > 10) {
        console.log("Error: La nota debe estar entre 0 y 10.");
    } 
    else if (nota >= 9) {
        console.log("Estado: Excelente");
    } 
    else if (nota >= 7) {
        console.log("Estado: Bueno");
    } 
    else if (nota >= 6) {
        console.log("Estado: Regular");
    } 
    else {
        console.log("Estado: Reprobado");
    }

    rl.close();
});