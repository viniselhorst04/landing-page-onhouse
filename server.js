const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// Configurações
app.use(express.json());
app.use(cors());
app.use(express.static(__dirname)); // Serve os arquivos do site (html, css, img)

// Rota para envio de e-mail
app.post('/send-email', async (req, res) => {
    const { condominio, telefone, email } = req.body;

    // Configuração do transporte de e-mail
    // DICA: Se usar Gmail, crie uma "Senha de App" em sua conta Google
    const transporter = nodemailer.createTransport({
        service: 'gmail', 
        auth: {
            user: 'viniciusselhorst18@gmail.com', // Seu e-mail real
            pass: 'gqat yktt delt mfsb'           // COLE AQUI A SENHA DE APP GERADA
        }
    });

    const mailOptions = {
        from: 'viniciusselhorst18@gmail.com',
        to: 'viniciusselhorst18@gmail.com', // Para onde vai o lead
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
        console.log('Email enviado com sucesso!');
        res.status(200).json({ message: 'Email enviado!' });
    } catch (error) {
        console.error('Erro ao enviar email:', error);
        res.status(500).json({ message: 'Erro ao enviar email.' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});