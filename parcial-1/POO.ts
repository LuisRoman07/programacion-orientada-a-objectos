class Persona {
    nombre: string;
    fechaNacimiento: Date;
    estadoFamiliar: string;
    sueldo: number;

    constructor(nombre: string, fechaNacimiento: string, estadoFamiliar: string, sueldo: number) {
        this.nombre = nombre;
        this.fechaNacimiento = new Date(fechaNacimiento);
        this.estadoFamiliar = estadoFamiliar.toLowerCase();
        this.sueldo = sueldo;
    }

    calcularEdad(): number {
        const hoy = new Date();
        let edad = hoy.getFullYear() - this.fechaNacimiento.getFullYear();

        const mes = hoy.getMonth() - this.fechaNacimiento.getMonth();

        if (mes < 0 || (mes === 0 && hoy.getDate() < this.fechaNacimiento.getDate())) {
            edad--;
        }

        return edad;
    }
}

class EvaluadorPrestamo {

    evaluar(persona: Persona): number {

        const edad = persona.calcularEdad();
        const sueldo = persona.sueldo;
        const estado = persona.estadoFamiliar;

        let prestamo = 0;

        if (estado === "casado" && edad > 22 && sueldo >= 450 && sueldo <= 600) {
            prestamo = 2000;
        }
        else if (estado === "casado" && edad > 32 && sueldo >= 601 && sueldo <= 1000) {
            prestamo = 3000;
        }
        else if (estado === "soltero" && edad > 22 && sueldo >= 400 && sueldo <= 600) {
            prestamo = 2500;
        }
        else if (estado === "soltero" && edad > 30 && sueldo >= 601 && sueldo <= 1000) {
            prestamo = 3500;
        }
        else if (estado === "viudo" && edad > 35 && sueldo >= 600 && sueldo <= 1500) {
            prestamo = 4000;
        }

        return prestamo;
    }
}

function mostrarResultado(persona: Persona, prestamo: number): void {

    const edad = persona.calcularEdad();

    console.log("\nResultado:");
    console.log(`${persona.nombre}, ${persona.estadoFamiliar} de ${edad} años con un sueldo de $${persona.sueldo.toFixed(2)}`);

    if (prestamo > 0) {
        console.log(`Se le permite otorgar el préstamo de $${prestamo.toFixed(2)}`);
    } else {
        console.log("No cumple con los requisitos para un préstamo.");
    }
}

const persona = new Persona(
    "Juan Antonio Perez",
    "1994-05-10",
    "soltero",
    500
);

const evaluador = new EvaluadorPrestamo();
const prestamo = evaluador.evaluar(persona);

mostrarResultado(persona, prestamo);