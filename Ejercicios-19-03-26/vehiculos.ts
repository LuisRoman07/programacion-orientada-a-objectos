import * as readline from 'readline';
 
abstract class Vehiculo {
  abstract mover(): void;
}
 
class Carro extends Vehiculo {
  mover(): void {
    console.log('El carro se mueve usando un motor de combustión por las carreteras.');
  }
}
 
class Bicicleta extends Vehiculo {
  mover(): void {
    console.log('La bicicleta se mueve pedaleando por caminos y ciclovías.');
  }
}
 
class Motocicleta extends Vehiculo {
  mover(): void {
    console.log('La motocicleta se mueve con su motor a través del tráfico.');
  }
}
 
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
 
console.log('\n=== Sistema de Vehículos ===');
console.log('1. Carro');
console.log('2. Bicicleta');
console.log('3. Motocicleta');
 
rl.question('\nSeleccione un vehículo (1-3): ', (opcion) => {
  let vehiculo: Vehiculo | null = null;
 
  switch (opcion.trim()) {
    case '1': vehiculo = new Carro();       break;
    case '2': vehiculo = new Bicicleta();   break;
    case '3': vehiculo = new Motocicleta(); break;
    default:  console.log('Opción no válida.');
  }
 
  if (vehiculo) vehiculo.mover();
  rl.close();
});