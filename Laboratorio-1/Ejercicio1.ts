class Persona {
    public nombre: string;
    public apellido: string;
    public telefono: string;
    public correo: string;
    private codIdentificacion: string;

    constructor(nombre: string, apellido: string, telefono: string, correo: string, codIdentificacion: string) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.telefono = telefono;
        this.correo = correo;
        this.codIdentificacion = codIdentificacion;
    }
}


const persona1 = new Persona("Juan", "Perez", "7777-8888", "juan@email.com", "ABC123");


console.log("Nombre: " + persona1.nombre);
console.log("Apellido: " + persona1.apellido);
console.log("Teléfono: " + persona1.telefono);
console.log("Correo: " + persona1.correo);


//console.log(persona1.codIdentificacion);
// No se puede por que es privada :/