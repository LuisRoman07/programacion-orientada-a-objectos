import * as readline from 'readline';
 
abstract class Pago {
  constructor(protected monto: number) {}
 
  abstract procesarPago(): void;
}
 
class PagoEfectivo extends Pago {
  constructor(monto: number, private montoPagado: number) {
    super(monto);
  }
 
  procesarPago(): void {
    const cambio = this.montoPagado - this.monto;
    console.log('\n Procesando pago en Efectivo...');
    console.log(`   Monto a pagar: $${this.monto.toFixed(2)}`);
    console.log(`   Monto pagado:  $${this.montoPagado.toFixed(2)}`);
    if (cambio >= 0) {
      console.log(`   Cambio:        $${cambio.toFixed(2)} `);
    } else {
      console.log(`    Efectivo insuficiente. Faltan $${Math.abs(cambio).toFixed(2)}`);
    }
  }
}
 
class PagoTarjeta extends Pago {
  constructor(monto: number, private ultimosDigitos: string) {
    super(monto);
  }
 
  procesarPago(): void {
    console.log('\n Procesando pago con Tarjeta...');
    console.log(`   Monto:   $${this.monto.toFixed(2)}`);
    console.log(`   Tarjeta: **** **** **** ${this.ultimosDigitos}`);
    console.log('   Estado:  Aprobado ');
  }
}
 
class TransferenciaBancaria extends Pago {
  constructor(monto: number, private cuentaDestino: string) {
    super(monto);
  }
 
  procesarPago(): void {
    console.log('\n Procesando Transferencia Bancaria...');
    console.log(`   Monto:          $${this.monto.toFixed(2)}`);
    console.log(`   Cuenta destino: ${this.cuentaDestino}`);
    console.log('   Estado:         Transferencia exitosa ');
  }
}
 
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const preguntar = (texto: string): Promise<string> =>
  new Promise((resolve) => rl.question(texto, resolve));
 
async function main() {
  console.log('\n===  Sistema de Pagos ===');
 
  const monto = parseFloat(await preguntar('Ingrese el monto a pagar ($): '));
 
  console.log('\nMétodo de pago:');
  console.log('1. Efectivo');
  console.log('2. Tarjeta');
  console.log('3. Transferencia Bancaria');
 
  const opcion = await preguntar('\nSeleccione una opción (1-3): ');
  let pago: Pago | null = null;
 
  switch (opcion.trim()) {
    case '1': {
      const efectivo = parseFloat(await preguntar('¿Cuánto efectivo entrega? $'));
      pago = new PagoEfectivo(monto, efectivo);
      break;
    }
    case '2': {
      const digitos = await preguntar('Últimos 4 dígitos de la tarjeta: ');
      pago = new PagoTarjeta(monto, digitos.trim());
      break;
    }
    case '3': {
      const cuenta = await preguntar('Número de cuenta destino: ');
      pago = new TransferenciaBancaria(monto, cuenta.trim());
      break;
    }
    default:
      console.log(' Opción no válida.');
  }
 
  if (pago) pago.procesarPago();
  rl.close();
}
 
main();