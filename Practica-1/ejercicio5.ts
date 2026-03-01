class Libro {
    titulo: string;
    autor: string;

    constructor(titulo: string, autor: string) {
        this.titulo = titulo;
        this.autor = autor;
    }

    mostrarDescripcion(): void {
        console.log(`El libro "${this.titulo}" fue escrito por ${this.autor}.`);
    }
}

// Crear objeto y ejecutar método
const libro1 = new Libro("Cien Años de Soledad", "Gabriel García Márquez");
libro1.mostrarDescripcion();