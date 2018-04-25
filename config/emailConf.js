const Nodemailer = require('nodemailer');
let email={};


email.transporter=Nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: '',
            pass: ''
        },
    },
    {
    from:'',
    headers:{
    }
})

module.exports=email;
