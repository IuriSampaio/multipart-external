var fs = require('fs');
var exec = require('child_process').exec;
const path = require('path');

const express = require('express'); 
const multer = require('multer');
var cors =  require('cors');

const app = express();

const PORT = process.env.PORT || 3001;
const HOST = process.env.HOST;

const parser = multer({ 
    dest: path.resolve(__dirname,'public'),
    storage: multer.diskStorage({
        destination: (_,__,cb)=>{
            cb(null,path.join(__dirname,'public'))
        },
        filename: (req,file,callback) =>{
            var mili = new Date().getMilliseconds();

            callback(null,mili+'-'+file.originalname);
        }
    })
})


app.use(cors());
// app.use(express.json());

app.get( '/' , (req,res)=>{
    res.send({teste:'abcd'})
});


// Accept: */*
// Accept-Encoding: gzip, deflate, br
// Accept-Language: pt-BR,pt;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6
// Access-Control-Request-Headers: content-type,x-usertoken
// Access-Control-Request-Method: POST
// Connection: keep-alive
// Host: demo-form-external-unicred.herokuapp.com
// Origin: https://unicreddev.service-now.com
// Sec-Fetch-Dest: empty
// Sec-Fetch-Mode: cors
// Sec-Fetch-Site: cross-site
// User-Agent:


app.post( '/' ,parser.single('file'), async ( req , res ) => {

    // res.setHeader('Access-Control-Allow-Origin', '*');
    // res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token, x-usertoken , Accept-Encoding, Connection, Host, Sec-Fetch-Dest, Sec-Fetch-Mode, User-Agent')
    // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS')

    // const command = `curl "${req.query.url}" \
    //     --request POST \
    //     --header Accept:application/json \
    //     --user ${req.query.user_name}:${req.query.password} \
    //     --header Content-Type:multipart/form-data \
    //     -F table_name=${req.body.table_name} \
    //     -F table_sys_id=${req.body.table_sys_id} \
    //     -F uploadFile=@${req.file.path}
    // `;
    console.log(req.body);
    console.log(req.file)
    // exec(command, function (error, stdout, stderr) {
    //     console.log(error, stdout, stderr);
    //     fs.unlink(req.file.path, function(e){
    //         if (e != null) console.error("ERRO AO DELETAR O ANEXO DO SERVIDOR "+e)
    //     });

    //     res.send(stdout);
        
    //     if (error !== null) 
    //         res.status(400).send(stderr);
    // });
    res.send({body:req.body,file:req.file});
});


app.use(express.static('public'));

app.listen( PORT , ( ) => console.log('🔥 SERVER STARTED AT '+HOST+' AT PORT '+PORT));