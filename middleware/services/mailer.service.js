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
            host: CONFIG.SEMAPPS_SMTP_HOST,
            port: CONFIG.SEMAPPS_SMTP_PORT,
            secure: CONFIG.SEMAPPS_SMTP_SECURE,
            auth: {
                user: CONFIG.SEMAPPS_SMTP_USER,
                pass: CONFIG.SEMAPPS_SMTP_PASS,
            },
        },
        templateFolder: path.join(__dirname, "../templates"),
    },
    dependencies: ['ldp'],
    actions: {
        async contactUser(ctx) {
            const { userUri, name, email, title, content, emailPredicate } = ctx.params;

            if( !userUri || !emailPredicate ) {
                throw new Error('One or more parameters are missing');
            }

            const user = await ctx.call('ldp.resource.get', {
                resourceUri: userUri,
                accept: MIME_TYPES.JSON
            });

            await ctx.call('mailer.send', {
                to: user[emailPredicate],
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
        getApiRoutes() {
            return [
                {
                    bodyParsers: { json: true },
                    aliases: {
                        [`POST _mailer/contact-user`]: 'mailer.contactUser',
                    }
                }
            ];
        }
    }
};
