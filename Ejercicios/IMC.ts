class Persona {
  nombre: string;
  peso: number;
  altura: number;

  constructor(nombre: string, peso: number, altura: number) {
    this.nombre = nombre;
    this.peso = peso;
    this.altura = altura;
  }

  calcularIMC(): number {
    return this.peso / (this.altura * this.altura);
  }

  mostrarIMC(): void {
    console.log(
      "IMC de " + this.nombre + ": " + this.calcularIMC().toFixed(2)
    );
  }
}

const persona1 = new Persona("Carlos", 70, 1.75);
persona1.mostrarIMC();
