class PersonaEdad {
    public nombre: string;
    public fechaNacimiento: Date;

    constructor(nombre: string, fechaNacimiento: Date) {
        this.nombre = nombre;
        this.fechaNacimiento = fechaNacimiento;
    }

    calcularEdad(): number {
        const hoy = new Date();
        let edad = hoy.getFullYear() - this.fechaNacimiento.getFullYear();
        const mes = hoy.getMonth() - this.fechaNacimiento.getMonth();

        if (mes < 0 || (mes === 0 && hoy.getDate() < this.fechaNacimiento.getDate())) {
            edad--;
        }

        return edad;
    }

    clasificarEdad(): void {
        let edad = this.calcularEdad();
        let estado = "";

        if (edad >= 0 && edad <= 2) {
            estado = "Bebé";
        } else if (edad > 2 && edad <= 10) {
            estado = "Niño/Niña";
        } else if (edad > 10 && edad <= 14) {
            estado = "Pre-adolescente";
        } else if (edad > 14 && edad <= 17) {
            estado = "Adolescente";
        } else if (edad >= 18 && edad <= 30) {
            estado = "Joven";
        } else if (edad > 30 && edad <= 50) {
            estado = "Adulto";
        } else {
            estado = "Adulto Mayor";
        }

        console.log("Edad: " + edad);
        console.log("Estado: " + estado);
    }
}

const personaEdad1 = new PersonaEdad("María", new Date(2005, 5, 15));

personaEdad1.clasificarEdad();