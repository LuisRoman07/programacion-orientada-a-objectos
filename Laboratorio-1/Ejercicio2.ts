class Producto {
    public nombre: string;
    public precio: number;
    public cantidad: number;

    constructor(nombre: string, precio: number, cantidad: number) {
        this.nombre = nombre;
        this.precio = precio;
        this.cantidad = cantidad;
    }

    calcularTotal(descuento: number): void {
        let subtotal = this.precio * this.cantidad;
        let descuentoCalculado = subtotal * (descuento / 100);
        let iva = (subtotal - descuentoCalculado) * 0.13;
        let total = subtotal - descuentoCalculado + iva;

        console.log("****Cantidad de producto: " + this.cantidad + "*****");
        console.log("****Precio: $" + this.precio + "*****");
        console.log("****Descuento: $" + descuentoCalculado.toFixed(2) + "*****");
        console.log("****Iva: $" + iva.toFixed(2) + "*****");
        console.log("****Total a pagar: $" + total.toFixed(2) + "*****");
    }
}


const producto1 = new Producto("Laptop", 800, 2);


producto1.calcularTotal(10);