class EmpleadoTiempoCompleto extends Empleado {
    salarioMensual: number;

    constructor(nombre: string, salarioMensual: number) {
        super(nombre);
        this.salarioMensual = salarioMensual;
    }

    calcularSalario(): number {
        return this.salarioMensual;
    }
}

class EmpleadoPorHoras extends Empleado {
    horasTrabajadas: number;
    pagoPorHora: number;

    constructor(nombre: string, horas: number, pago: number) {
        super(nombre);
        this.horasTrabajadas = horas;
        this.pagoPorHora = pago;
    }

    calcularSalario(): number {
        return this.horasTrabajadas * this.pagoPorHora;
    }
}