import * as readline from 'readline';
 
abstract class Animal {
  abstract hacerSonido(): void;
}
 

class Perro extends Animal {
  hacerSonido(): void {
    console.log(' El perro dice: ¡Guau Guau!');
  }
}
 
class Gato extends Animal {
  hacerSonido(): void {
    console.log(' El gato dice: ¡Miau Miau!');
  }
}
 
class Vaca extends Animal {
  hacerSonido(): void {
    console.log('La vaca dice: ¡Muuu Muuu!');
  }
}
 

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
 
console.log('\n=== Sistema de Animales ===');
console.log('1. Perro');
console.log('2. Gato');
console.log('3. Vaca');
 
rl.question('\nSeleccione un animal (1-3): ', (opcion) => {
  let animal: Animal | null = null;
 
  switch (opcion.trim()) {
    case '1': animal = new Perro(); break;
    case '2': animal = new Gato();  break;
    case '3': animal = new Vaca();  break;
    default:  console.log(' Opción no válida.');
  }
 
  if (animal) animal.hacerSonido();
  rl.close();
});