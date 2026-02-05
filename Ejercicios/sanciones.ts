class Estudiante {
  nombre: string;

  constructor(nombre: string) {
    this.nombre = nombre;
  }

  aplicarSancion(infraccion: string): void {
    let monto: number = 0;

    if (infraccion === "Llegada tardía") monto = 1;
    if (infraccion === "Caminar pasillos") monto = 3;
    if (infraccion === "Vestimenta inapropiada") monto = 5;
    if (infraccion === "Mal uso instalaciones") monto = 10;

    console.log(
      this.nombre +
      " cometió: " +
      infraccion +
      " | Total a pagar: $" +
      monto
    );
  }
}

const estudiante1 = new Estudiante("María");
estudiante1.aplicarSancion("Vestimenta inapropiada");
