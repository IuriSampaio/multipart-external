var fs = require('fs');
const express = require('express'); 
var exec = require('child_process').exec;
const multer = require('multer');
const path = require('path');

const app = express();

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
 
app.post( '/' ,parser.single('file'), async ( req , res ) => {
    
    var command = `curl "${req.query.url}" \
        --request POST \
        --header Accept:application/json \
        --user ${req.query.user_name}:${req.query.password} \
        --header Content-Type:multipart/form-data \
        -F table_name=${req.body.table_name} \
        -F table_sys_id=${req.body.table_sys_id} \
        -F uploadFile=@${req.file.path}
    `;

    exec(command, function (error, stdout, stderr) {
        fs.unlink(req.file.path, function(e){
            if (e != null) console.error("ERRO AO DELETAR O ANEXO DO SERVIDOR "+e)
        });

        res.send(stdout);
        
        if (error !== null) 
            res.status(400).send(stderr);
    });
    
});


app.use(express.static('public'));

app.listen( 3001 , ( ) => console.log('ouvindo') );