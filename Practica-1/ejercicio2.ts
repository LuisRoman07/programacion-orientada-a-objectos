class Estudiante {
    nombre: string;
    nota: number;

    constructor(nombre: string, nota: number) {
        this.nombre = nombre;
        this.nota = nota;
    }

    evaluar(): void {
        if (this.nota >= 6) {
            console.log(`${this.nombre} aprueba con nota ${this.nota}`);
        } else {
            console.log(`${this.nombre} reprueba con nota ${this.nota}`);
        }
    }
}

// Crear objeto y ejecutar método
const estudiante1 = new Estudiante("Ana", 7);
estudiante1.evaluar();