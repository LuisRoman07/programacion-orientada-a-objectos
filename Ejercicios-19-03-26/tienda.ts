import * as readline from 'readline';
 
abstract class Producto {
  constructor(
    protected nombre: string,
    protected precioBase: number
  ) {}
 
  abstract calcularPrecioFinal(): number;
  abstract mostrarInformacion(): void;
}
 
 
class ProductoElectronico extends Producto {
  private readonly IVA      = 0.13;
  private readonly GARANTIA = 0.05;
 
  constructor(nombre: string, precioBase: number, private marca: string) {
    super(nombre, precioBase);
  }
 
  calcularPrecioFinal(): number {
    return this.precioBase * (1 + this.IVA + this.GARANTIA);
  }
 
  mostrarInformacion(): void {
    const iva      = this.precioBase * this.IVA;
    const garantia = this.precioBase * this.GARANTIA;
    console.log('\n Producto Electrónico');
    console.log(`   Nombre:            ${this.nombre}`);
    console.log(`   Marca:             ${this.marca}`);
    console.log(`   Precio base:       $${this.precioBase.toFixed(2)}`);
    console.log(`   IVA (13%):        +$${iva.toFixed(2)}`);
    console.log(`   Garantía (5%):    +$${garantia.toFixed(2)}`);
    console.log(`   ─────────────────────────────`);
    console.log(`   PRECIO FINAL:      $${this.calcularPrecioFinal().toFixed(2)}`);
  }
}
 
class Ropa extends Producto {
  private readonly DESCUENTO = 0.20;
  private readonly IVA       = 0.13;
 
  constructor(nombre: string, precioBase: number, private talla: string) {
    super(nombre, precioBase);
  }
 
  calcularPrecioFinal(): number {
    const precioConDescuento = this.precioBase * (1 - this.DESCUENTO);
    return precioConDescuento * (1 + this.IVA);
  }
 
  mostrarInformacion(): void {
    const descuento      = this.precioBase * this.DESCUENTO;
    const precioDescuento = this.precioBase - descuento;
    const iva            = precioDescuento * this.IVA;
 
    console.log('\n Producto de Ropa');
    console.log(`   Nombre:               ${this.nombre}`);
    console.log(`   Talla:                ${this.talla}`);
    console.log(`   Precio base:          $${this.precioBase.toFixed(2)}`);
    console.log(`   Descuento (20%):     -$${descuento.toFixed(2)}`);
    console.log(`   Precio c/descuento:   $${precioDescuento.toFixed(2)}`);
    console.log(`   IVA (13%):           +$${iva.toFixed(2)}`);
    console.log(`   ──────────────────────────────────`);
    console.log(`   PRECIO FINAL:         $${this.calcularPrecioFinal().toFixed(2)}`);
  }
}
 
class Alimento extends Producto {
  private readonly CARGO_MANEJO = 0.02;
 
  constructor(
    nombre: string,
    precioBase: number,
    private fechaVencimiento: string
  ) {
    super(nombre, precioBase);
  }
 
  calcularPrecioFinal(): number {
    return this.precioBase * (1 + this.CARGO_MANEJO);
  }
 
  mostrarInformacion(): void {
    const cargoManejo = this.precioBase * this.CARGO_MANEJO;
    console.log('\n Producto Alimenticio');
    console.log(`   Nombre:              ${this.nombre}`);
    console.log(`   Fecha vencimiento:   ${this.fechaVencimiento}`);
    console.log(`   Precio base:         $${this.precioBase.toFixed(2)}`);
    console.log(`   IVA:                 Exento`);
    console.log(`   Cargo manejo (2%):  +$${cargoManejo.toFixed(2)}`);
    console.log(`   ──────────────────────────────────`);
    console.log(`   PRECIO FINAL:        $${this.calcularPrecioFinal().toFixed(2)}`);
  }
}
 
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const preguntar = (texto: string): Promise<string> =>
  new Promise((resolve) => rl.question(texto, resolve));
 
async function main() {
  console.log('\n===  Sistema de Tienda (Nivel Avanzado) ===');
  console.log('1. Electrónico  →  IVA 13% + Garantía 5%');
  console.log('2. Ropa         →  Descuento 20% + IVA 13%');
  console.log('3. Alimento     →  Sin IVA + Cargo manejo 2%');
 
  const opcion = await preguntar('\nSeleccione el tipo de producto (1-3): ');
  const nombre = await preguntar('Nombre del producto: ');
  const precio = parseFloat(await preguntar('Precio base ($): '));
  let producto: Producto | null = null;
 
  switch (opcion.trim()) {
    case '1': {
      const marca = await preguntar('Marca: ');
      producto = new ProductoElectronico(nombre, precio, marca);
      break;
    }
    case '2': {
      const talla = await preguntar('Talla (XS / S / M / L / XL): ');
      producto = new Ropa(nombre, precio, talla.toUpperCase());
      break;
    }
    case '3': {
      const vence = await preguntar('Fecha de vencimiento (DD/MM/AAAA): ');
      producto = new Alimento(nombre, precio, vence);
      break;
    }
    default:
      console.log(' Opción no válida.');
  }
 
  if (producto) producto.mostrarInformacion();
  rl.close();
}
 
main();