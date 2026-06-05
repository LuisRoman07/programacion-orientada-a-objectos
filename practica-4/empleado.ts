abstract class Empleado {
    nombre: string;

    constructor(nombre: string) {
        this.nombre = nombre;
    }

    abstract calcularSalario(): number;
}