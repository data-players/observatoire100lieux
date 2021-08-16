const path = require('path');
const MailerService = require('moleculer-mail');
const { MIME_TYPES } = require('@semapps/mime-types');
const CONFIG = require('../config');

module.exports = {
    name: 'mailer',
    mixins: [MailerService],
    settings: {
        from: `${CONFIG.FROM_NAME} <${CONFIG.FROM_EMAIL}>`,
        transport: {
            host: CONFIG.SMTP_HOST,
            port: CONFIG.SMTP_PORT,
            secure: CONFIG.SMTP_SECURE,
            auth: {
                user: CONFIG.SMTP_USER,
                pass: CONFIG.SMTP_PASS,
            },
        },
        templateFolder: path.join(__dirname, "../templates"),
    },
    dependencies: ['api'],
    async started() {
      /*  const delay = t => new Promise(resolve => setTimeout(resolve, t));
        await delay(5000);*/
        await this.broker.call('api.addRoute', {
            route: {
                path: '/_mailer',
                bodyParsers: { json: true },
                aliases: {
                    [`POST contact-user`]: 'mailer.contactUser'
                }
            }
        });
    },
    actions: {
        async contactUser(ctx) {
            const { name, email, title, content } = ctx.params;

            await ctx.call('mailer.send', {
                to: CONFIG.FROM_EMAIL,
                replyTo: `${name} <${email}>`,
                subject: title,
                template: 'contact-user',
                data: {
                    name,
                    email,
                    title,
                    content,
                    contentWithBr: content.replace(/\r\n|\r|\n/g, '<br />')
                }
            });
        },
    }
};
