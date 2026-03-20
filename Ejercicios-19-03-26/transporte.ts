import * as readline from 'readline';
 
abstract class Transporte {
  abstract calcularCosto(distanciaKm: number): number;
  abstract mostrarDetalles(distanciaKm: number): void;
}
 
class Taxi extends Transporte {
  private readonly TARIFA_BASE   = 2.50;
  private readonly TARIFA_POR_KM = 1.80;
 
  calcularCosto(distanciaKm: number): number {
    return this.TARIFA_BASE + distanciaKm * this.TARIFA_POR_KM;
  }
 
  mostrarDetalles(distanciaKm: number): void {
    console.log('\n Servicio de Taxi');
    console.log(`   Tarifa base:   $${this.TARIFA_BASE.toFixed(2)}`);
    console.log(`   Tarifa/km:     $${this.TARIFA_POR_KM.toFixed(2)}`);
    console.log(`   Distancia:     ${distanciaKm} km`);
    console.log(`   Costo Total:   $${this.calcularCosto(distanciaKm).toFixed(2)}`);
  }
}
 
class Autobus extends Transporte {
  private readonly TARIFA_FIJA = 0.30;
 
  calcularCosto(_distanciaKm: number): number {
    return this.TARIFA_FIJA; 
}
 
  mostrarDetalles(distanciaKm: number): void {
    console.log('\n Servicio de Autobús');
    console.log(`   Tarifa fija:   $${this.TARIFA_FIJA.toFixed(2)} (independiente de la distancia)`);
    console.log(`   Distancia:     ${distanciaKm} km`);
    console.log(`   Costo Total:   $${this.calcularCosto(distanciaKm).toFixed(2)}`);
  }
}
 
class Uber extends Transporte {
  private readonly TARIFA_BASE    = 1.50;
  private readonly TARIFA_POR_KM  = 1.20;
  private readonly TARIFA_MINIMA  = 3.00;
 
  calcularCosto(distanciaKm: number): number {
    const calculado = this.TARIFA_BASE + distanciaKm * this.TARIFA_POR_KM;
    return Math.max(calculado, this.TARIFA_MINIMA);
  }
 
  mostrarDetalles(distanciaKm: number): void {
    const calculado = this.TARIFA_BASE + distanciaKm * this.TARIFA_POR_KM;
    const aplicaMinimo = calculado < this.TARIFA_MINIMA;
 
    console.log('\n Servicio de Uber');
    console.log(`   Tarifa base:    $${this.TARIFA_BASE.toFixed(2)}`);
    console.log(`   Tarifa/km:      $${this.TARIFA_POR_KM.toFixed(2)}`);
    console.log(`   Tarifa mínima:  $${this.TARIFA_MINIMA.toFixed(2)}`);
    console.log(`   Distancia:      ${distanciaKm} km`);
    if (aplicaMinimo) console.log(' Se aplica tarifa mínima.');
    console.log(`   Costo Total:    $${this.calcularCosto(distanciaKm).toFixed(2)}`);
  }
}
 
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const preguntar = (texto: string): Promise<string> =>
  new Promise((resolve) => rl.question(texto, resolve));
 
async function main() {
  console.log('\n===  Sistema de Transporte ===');
  console.log('1. Taxi');
  console.log('2. Autobús');
  console.log('3. Uber');
 
  const opcion    = await preguntar('\nSeleccione el medio de transporte (1-3): ');
  const distancia = parseFloat(await preguntar('Ingrese la distancia recorrida (km): '));
  let transporte: Transporte | null = null;
 
  switch (opcion.trim()) {
    case '1': transporte = new Taxi();    break;
    case '2': transporte = new Autobus(); break;
    case '3': transporte = new Uber();    break;
    default:  console.log(' Opción no válida.');
  }
 
  if (transporte) transporte.mostrarDetalles(distancia);
  rl.close();
}
 
main();