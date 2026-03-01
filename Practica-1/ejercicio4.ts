class Producto {
    nombre: string;
    precio: number;

    constructor(nombre: string, precio: number) {
        this.nombre = nombre;
        this.precio = precio;
    }

    calcularDescuento(): void {
        const precioFinal = this.precio * 0.9;
        console.log(`Producto: ${this.nombre}`);
        console.log(`Precio original: $${this.precio}`);
        console.log(`Precio con 10% de descuento: $${precioFinal}`);
    }
}

// Crear objeto y ejecutar método
const producto1 = new Producto("Laptop", 1500);
producto1.calcularDescuento();