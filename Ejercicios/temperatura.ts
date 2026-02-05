class ConversorTemperatura {
  valor: number;

  constructor(valor: number) {
    this.valor = valor;
  }

  fahrenheitACelsius(): number {
    return (this.valor - 32) * 5 / 9;
  }

  celsiusAFahrenheit(): number {
    return (this.valor * 9 / 5) + 32;
  }

  kelvinAFahrenheit(): number {
    return (this.valor - 273.15) * 9 / 5 + 32;
  }

  kelvinACelsius(): number {
    return this.valor - 273.15;
  }
}

const temp = new ConversorTemperatura(100);

console.log("F a C:", temp.fahrenheitACelsius());
console.log("C a F:", temp.celsiusAFahrenheit());
console.log("K a F:", temp.kelvinAFahrenheit());
console.log("K a C:", temp.kelvinACelsius());
