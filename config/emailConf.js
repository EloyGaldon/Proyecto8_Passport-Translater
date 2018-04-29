const Nodemailer = require('nodemailer');
let email={};


email.transporter=Nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'pruebasegg@gmail.com',
            pass: 'programacion1404'
        },
    },
    {
    from:'pruebasegg@gmail.com',
    headers:{
    }
})

module.exports=email;
