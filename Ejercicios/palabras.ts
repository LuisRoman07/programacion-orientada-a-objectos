class Nota {
  titulo: string;
  detalle: string;

  constructor(titulo: string, detalle: string) {
    this.titulo = titulo;
    this.detalle = detalle;
  }

  contarPalabras(): number {
    return this.detalle.split(" ").length;
  }

  guardarNota(): void {
    console.log("Título:", this.titulo);
    console.log("Palabras:", this.contarPalabras());
  }
}

const nota1 = new Nota(
  "Recordatorio",
  "Estudiar programacion orientada a objetos en TypeScript"
);

nota1.guardarNota();
