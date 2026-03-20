import * as readline from 'readline';
 
abstract class Empleado {
  constructor(protected nombre: string) {}
 
  abstract calcularSalario(): number;
 
  mostrarInformacion(): void {
    console.log(`\n Empleado:      ${this.nombre}`);
    console.log(`   Salario Total:  $${this.calcularSalario().toFixed(2)}`);
  }
}
 
class EmpleadoPorHoras extends Empleado {
  constructor(
    nombre: string,
    private horasTrabajadas: number,
    private tarifaHora: number
  ) {
    super(nombre);
  }
 
  calcularSalario(): number {
    return this.horasTrabajadas * this.tarifaHora;
  }
 
  mostrarInformacion(): void {
    console.log(`\n Empleado por Horas: ${this.nombre}`);
    console.log(`   Horas trabajadas: ${this.horasTrabajadas}`);
    console.log(`   Tarifa por hora:  $${this.tarifaHora.toFixed(2)}`);
    console.log(`   Salario Total:    $${this.calcularSalario().toFixed(2)}`);
  }
}
 
class EmpleadoFijo extends Empleado {
  constructor(nombre: string, private salarioBase: number) {
    super(nombre);
  }
 
  calcularSalario(): number {
    return this.salarioBase;
  }
 
  mostrarInformacion(): void {
    console.log(`\n Empleado Fijo: ${this.nombre}`);
    console.log(`   Salario mensual: $${this.calcularSalario().toFixed(2)}`);
  }
}
 
class EmpleadoPorComision extends Empleado {
  constructor(
    nombre: string,
    private salarioBase: number,
    private totalVentas: number,
    private porcentajeComision: number
  ) {
    super(nombre);
  }
 
  calcularSalario(): number {
    const comision = this.totalVentas * (this.porcentajeComision / 100);
    return this.salarioBase + comision;
  }
 
  mostrarInformacion(): void {
    const comision = this.totalVentas * (this.porcentajeComision / 100);
    console.log(`\n Empleado por Comisión: ${this.nombre}`);
    console.log(`   Salario base:       $${this.salarioBase.toFixed(2)}`);
    console.log(`   Ventas realizadas:  $${this.totalVentas.toFixed(2)}`);
    console.log(`   Comisión (${this.porcentajeComision}%):      $${comision.toFixed(2)}`);
    console.log(`   Salario Total:      $${this.calcularSalario().toFixed(2)}`);
  }
}
 
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const preguntar = (texto: string): Promise<string> =>
  new Promise((resolve) => rl.question(texto, resolve));
 
async function main() {
  console.log('\n===  Sistema de Empleados ===');
  console.log('1. Empleado por Horas');
  console.log('2. Empleado Fijo');
  console.log('3. Empleado por Comisión');
 
  const opcion = await preguntar('\nSeleccione el tipo de empleado (1-3): ');
  const nombre = await preguntar('Nombre del empleado: ');
  let empleado: Empleado | null = null;
 
  switch (opcion.trim()) {
    case '1': {
      const horas  = parseFloat(await preguntar('Horas trabajadas: '));
      const tarifa = parseFloat(await preguntar('Tarifa por hora ($): '));
      empleado = new EmpleadoPorHoras(nombre, horas, tarifa);
      break;
    }
    case '2': {
      const salario = parseFloat(await preguntar('Salario mensual ($): '));
      empleado = new EmpleadoFijo(nombre, salario);
      break;
    }
    case '3': {
      const base      = parseFloat(await preguntar('Salario base ($): '));
      const ventas    = parseFloat(await preguntar('Total de ventas ($): '));
      const comision  = parseFloat(await preguntar('Porcentaje de comisión (%): '));
      empleado = new EmpleadoPorComision(nombre, base, ventas, comision);
      break;
    }
    default:
      console.log('Opción no válida.');
  }
 
  if (empleado) empleado.mostrarInformacion();
  rl.close();
}
 
main();