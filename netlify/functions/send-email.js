const nodemailer = require('nodemailer');

exports.handler = async function(event, context) {
    // Apenas aceita requisições POST
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    const { condominio, telefone, email } = JSON.parse(event.body);

    // Configuração do transporte de e-mail
    const transporter = nodemailer.createTransport({
        service: 'gmail', 
        auth: {
            user: 'viniciusselhorst18@gmail.com',
            // DICA DE SEGURANÇA: No Netlify, o ideal é usar Variáveis de Ambiente (Environment Variables)
            // para não deixar a senha exposta no código, mas para testar agora vamos usar a senha direta.
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: 'viniciusselhorst18@gmail.com',
        to: 'viniciusselhorst18@gmail.com',
        subject: `Novo Lead OnHouse: ${condominio}`,
        text: `
            Novo interesse registrado no site!
            
            Condomínio: ${condominio}
            Telefone: ${telefone}
            E-mail: ${email}
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Email enviado!' })
        };
    } catch (error) {
        console.error('Erro ao enviar email:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Erro ao enviar email.' })
        };
    }
};