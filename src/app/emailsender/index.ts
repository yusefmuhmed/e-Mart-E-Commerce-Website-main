import ejs from 'ejs';
import nodemailer, { Transporter } from 'nodemailer';
import getSettings from '../cms/getsettings';
import Settings from '../cms/types/settings';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

interface Props {
    to?: string | string[];

    subject: string;

    templateName: string;

    args?: { [key: string]: any };
}

type mailer = {
    sendMail: ({ to, subject, templateName, args }: Props) => Promise<void>
}

async function sendMail({ to, subject, templateName, args }: Props): Promise<any> {
    const settings = await getSettings();
    const from = settings.mailSettings.username;
    const transporter = createTransporter(settings);

    to = to || getKeyValue(templateName, settings.mailtoReceivers)
    const template = getKeyValue<string>(templateName, settings.mailTemplates);

    const html = ejs.render(template, args);

    await new Promise((resolve, reject) => {
        // verify connection configuration
        transporter.verify(function (err, info) {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                console.log("Server is ready to take our messages");
                console.log(info);
                resolve(info);
            }
        });
    });

    await new Promise((resolve, reject) => {
        transporter.sendMail({ from, to, subject, html }, (err, info) => {
            if (err) {
                console.error(err);
                reject(err)
            } else {
                console.log(info);
                resolve(info);
            }
        })
    });
}

function createTransporter(settins: Settings): Transporter<SMTPTransport.SentMessageInfo> {
    const options = {
        host: settins.mailSettings.host,
        port: settins.mailSettings.port,
        secure: settins.mailSettings.secure,
        auth: {
            user: settins.mailSettings.username,
            pass: settins.mailSettings.password,
        }
    }

    return nodemailer.createTransport(options)
}

function getKeyValue<T>(key: string, obj: { [key: string]: any }): T {
    return obj[key];
}

export default { sendMail } as mailer