import * as readline from 'readline';
 
abstract class Notificacion {
  constructor(
    protected destinatario: string,
    protected mensaje: string
  ) {}
 
  abstract enviar(): void;
}
 
class NotificacionEmail extends Notificacion {
  constructor(
    destinatario: string,
    mensaje: string,
    private asunto: string
  ) {
    super(destinatario, mensaje);
  }
 
  enviar(): void {
    console.log('\n Enviando notificación por Email...');
    console.log(`   Para:    ${this.destinatario}`);
    console.log(`   Asunto:  ${this.asunto}`);
    console.log(`   Mensaje: ${this.mensaje}`);
    console.log('   Estado:  Email enviado exitosamente ');
  }
}
 
class NotificacionSMS extends Notificacion {
  private readonly LIMITE_CARACTERES = 160;
 
  constructor(destinatario: string, mensaje: string) {
    super(destinatario, mensaje);
  }
 
  enviar(): void {
    const preview  = this.mensaje.substring(0, this.LIMITE_CARACTERES);
    const truncado = this.mensaje.length > this.LIMITE_CARACTERES;
 
    console.log('\n Enviando notificación por SMS...');
    console.log(`   Número:     ${this.destinatario}`);
    console.log(`   Mensaje:    ${preview}${truncado ? '...' : ''}`);
    console.log(`   Caracteres: ${Math.min(this.mensaje.length, this.LIMITE_CARACTERES)}/${this.LIMITE_CARACTERES}`);
    if (truncado) console.log('   Mensaje truncado al límite de SMS.');
    console.log('   Estado:     SMS enviado exitosamente ');
  }
}
 
class NotificacionWhatsApp extends Notificacion {
  constructor(destinatario: string, mensaje: string) {
    super(destinatario, mensaje);
  }
 
  enviar(): void {
    const hora = new Date().toLocaleTimeString('es-SV', { hour: '2-digit', minute: '2-digit' });
    console.log('\n Enviando notificación por WhatsApp...');
    console.log(`   Número:  ${this.destinatario}`);
    console.log(`   Mensaje: ${this.mensaje}`);
    console.log(`   Hora:    ${hora}`);
    console.log('   Estado:  Mensaje enviado ');
  }
}
 
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const preguntar = (texto: string): Promise<string> =>
  new Promise((resolve) => rl.question(texto, resolve));
 
async function main() {
  console.log('\n===  Sistema de Notificaciones ===');
  console.log('1. Email');
  console.log('2. SMS');
  console.log('3. WhatsApp');
 
  const opcion  = await preguntar('\nSeleccione el canal (1-3): ');
  const mensaje = await preguntar('Ingrese el mensaje: ');
  let notif: Notificacion | null = null;
 
  switch (opcion.trim()) {
    case '1': {
      const email  = await preguntar('Email del destinatario: ');
      const asunto = await preguntar('Asunto: ');
      notif = new NotificacionEmail(email, mensaje, asunto);
      break;
    }
    case '2': {
      const tel = await preguntar('Número telefónico: ');
      notif = new NotificacionSMS(tel, mensaje);
      break;
    }
    case '3': {
      const wa = await preguntar('Número de WhatsApp: ');
      notif = new NotificacionWhatsApp(wa, mensaje);
      break;
    }
    default:
      console.log(' Opción no válida.');
  }
 
  if (notif) notif.enviar();
  rl.close();
}
 
main();