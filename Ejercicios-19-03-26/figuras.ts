import * as readline from 'readline';
 
abstract class Figura {
  abstract calcularArea(): number;
  abstract calcularPerimetro(): number;
 
  mostrarResultados(): void {
    console.log(`   Área:       ${this.calcularArea().toFixed(2)}`);
    console.log(`   Perímetro:  ${this.calcularPerimetro().toFixed(2)}`);
  }
}
 
class Cuadrado extends Figura {
  constructor(private lado: number) {
    super();
  }
  calcularArea(): number      { return this.lado ** 2; }
  calcularPerimetro(): number { return 4 * this.lado; }
 
  mostrarResultados(): void {
    console.log(`\n Cuadrado  |  lado = ${this.lado}`);
    super.mostrarResultados();
  }
}
 
class Rectangulo extends Figura {
  constructor(private base: number, private altura: number) {
    super();
  }
  calcularArea(): number      { return this.base * this.altura; }
  calcularPerimetro(): number { return 2 * (this.base + this.altura); }
 
  mostrarResultados(): void {
    console.log(`\n Rectángulo  |  base = ${this.base}, altura = ${this.altura}`);
    super.mostrarResultados();
  }
}
 
class Circulo extends Figura {
  constructor(private radio: number) {
    super();
  }
  calcularArea(): number      { return Math.PI * this.radio ** 2; }
  calcularPerimetro(): number { return 2 * Math.PI * this.radio; }
 
  mostrarResultados(): void {
    console.log(`\n Círculo  |  radio = ${this.radio}`);
    super.mostrarResultados();
  }
}
 
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const preguntar = (texto: string): Promise<string> =>
  new Promise((resolve) => rl.question(texto, resolve));

async function main() {
  console.log('\n===  Sistema de Figuras Geométricas ===');
  console.log('1. Cuadrado');
  console.log('2. Rectángulo');
  console.log('3. Círculo');
 
  const opcion = await preguntar('\nSeleccione una figura (1-3): ');
  let figura: Figura | null = null;
 
  switch (opcion.trim()) {
    case '1': {
      const lado = parseFloat(await preguntar('Ingrese el lado: '));
      figura = new Cuadrado(lado);
      break;
    }
    case '2': {
      const base   = parseFloat(await preguntar('Ingrese la base: '));
      const altura = parseFloat(await preguntar('Ingrese la altura: '));
      figura = new Rectangulo(base, altura);
      break;
    }
    case '3': {
      const radio = parseFloat(await preguntar('Ingrese el radio: '));
      figura = new Circulo(radio);
      break;
    }
    default:
      console.log('Opción no válida.');
  }
 
  if (figura) figura.mostrarResultados();
  rl.close();
}
 
main();