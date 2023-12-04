import mailer from "../emailsender";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { name, email, phone, subject, message, mailSubject } = await request.json();

    const templateName = "contactRequest";
    const sub = "Hardsteel | " + mailSubject;
    const args = { name, email, phone, subject, message, mailSubject }

    console.log({ name, email, phone, subject, message, mailSubject })

    try {
        await mailer.sendMail({ subject: sub, templateName, args });
        return NextResponse.json({ message: "EMail Sent Successfully" })
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ message: 'Error sending email', error }), {
            status: 500
        });
    }
}