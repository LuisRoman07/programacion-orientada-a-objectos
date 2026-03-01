class Coche {
    marca: string;
    modelo: string;

    constructor(marca: string, modelo: string) {
        this.marca = marca;
        this.modelo = modelo;
    }

    mostrarInformacion(): void {
        console.log(`Coche: ${this.marca} ${this.modelo}`);
    }
}

// Crear objeto y ejecutar método
const miCoche = new Coche("Toyota", "Corolla");
miCoche.mostrarInformacion();