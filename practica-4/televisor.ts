abstract class Electrodomestico {
    abstract encender(): void;
}
class Televisor extends Electrodomestico {
    encender(): void {
        console.log("El televisor se ha encendido");
    }
}

class Refrigeradora extends Electrodomestico {
    encender(): void {
        console.log("La refrigeradora se ha encendido");
    }
}