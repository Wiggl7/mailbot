import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import fs from "fs";

const list: string[] = [
    "emanuele.volpi07@gmail.com",
    "fausto.morandelli098@gmail.com"
    /*
  "panzaersilia@hotmail.com",
  "paolacolli57@gmail.com",
  "Angelica2003@live.it",
  "ale.mantovani69@gmail.com",
  "sormanilaila@yahoo.it",
  "magnilino@libero.it",
  "davidefini.74@gmail.com",
  "maurosolera@libero.it",
  "silviagara79@hotmail.com",
  "paolo.martinori@gmail.com",
  "graziella.cappello@gmail.com",
  "fazzini.rita@libero.it",
  "beatricepisano3@gmail.com",
  "sara_bellintani@yahoo.it",
  "luca.fiorin.If@gmail.com",
  "samantarellamonti@gmail.com",
  "schettinomonica142@gmail.com",
  "garmimaresa@gmail.com",
  "fepagino@gmail.com",
  "marti.mantovani@icloud.com",
  "lillimarta@gmail.com",
  "ceronidavide@libero.it",
  "jessica.fibbia@yahoo.it",
  "valy2491@hotmail.it",
  "francescadibiase89@gmail.com",
  "badronassab@yahoo.it",
  "carloeanna70@libero.it",
  "badronassab@yahoo.it",
  "carloeanna70@libero.it",
  "nora.bossi62@gmail.com",
  "massia71@gmail.com",
  "zorzan.davide7@gmail.com",
  "emanuelasbisa34@gmail.com",
  "patriziabudrio@gmail.com",
  "sarasalvafondi@icloud.com",
  "reb.pisano03@gmail.com",
  */
]

async function sendMail(receiver: string, subject: string, body: string, html: string): Promise<Error | null>{
    try {
      const transporter = nodemailer.createTransport({
        host: 'smtps.aruba.it', 
        port: 587,
        secure: false,
        auth: {
          user: "info@portomario.com", 
          pass: "" 
        },
      }); 
      await transporter.sendMail({
        from: "info@portomario.com",
        to: receiver,
        subject: subject,
        text: body,
        html: html
      });
      return null;
    } catch (err) {
      const error = err instanceof Error ? err : undefined
      console.error("Errore nell'invio dell'email: ", error?.message)
      return new Error(`Errore nell'invio dell'email: ${error?.message}`);
    }
  }

async function mailBot() {
        const html= fs.readFileSync("./templates/template-auguril.html", "utf8")
        await Promise.allSettled(list.map( email => {
            return sendMail(email, "Auguri di Buone Feste", ".", html)
        }))
}

export async function GET() {
    try {
        await mailBot()
        return NextResponse.json({"message": "inviati con successo"}, {status:200})

    } catch(err) {
        return NextResponse.json({"error": err instanceof Error ? err.message : "non vanno le mail del bot"}, {status:500})
    }
}
