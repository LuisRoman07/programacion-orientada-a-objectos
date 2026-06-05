abstract class CuentaBancaria {
    saldo: number;

    constructor(saldo: number) {
        this.saldo = saldo;
    }

    abstract calcularInteres(): number;
}
class CuentaAhorro extends CuentaBancaria {
    constructor(saldo: number) {
        super(saldo);
    }

    calcularInteres(): number {
        return this.saldo * 0.05;
    }
}

class CuentaCorriente extends CuentaBancaria {
    constructor(saldo: number) {
        super(saldo);
    }

    calcularInteres(): number {
        return this.saldo * 0.02;
    }
}