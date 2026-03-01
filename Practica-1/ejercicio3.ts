class CuentaBancaria {
    titular: string;
    saldo: number;

    constructor(titular: string, saldo: number) {
        this.titular = titular;
        this.saldo = saldo;
    }

    depositar(monto: number): void {
        this.saldo += monto;
        console.log(`Depósito realizado. Nuevo saldo: $${this.saldo}`);
    }
}

// Crear objeto y ejecutar método
const cuenta1 = new CuentaBancaria("Carlos", 1000);
cuenta1.depositar(500);