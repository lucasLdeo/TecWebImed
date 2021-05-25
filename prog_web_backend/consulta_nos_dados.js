var express = require("express");
var cors = require('cors');
var jwt = require("jsonwebtoken")
var app = express();
app.use(cors());
app.use(express.json());

var mysql = require("mysql");


var conection = mysql.createConnection({

    host: "localhost",
    user: "root",
    password: "infomed",
    database: "infomed"
});


app.post("/auth",(req,resp)=>{
    var user = req.body;   
    console.log('Login') 
    conection.query("SELECT * FROM infomed.usuario where login = ? and senha = ?",[user.login, user.senha],(err,result)=>{
        var usuario = result[0];
        if (result.lenth == 0){
            resp.status(401);
            resp.send({token: null, usuario:usuario, success: false});
        }else{            
            let token = jwt.sign({id:usuario.login}, 'infomed', {expiresIn:6000});            
            resp.status(200);
            resp.send({token: token, usuario:usuario, success: true});    
        }          
    });
});
verifica_token = (req,resp,next)=>{

     var token = req.headers['x-access-token'];
     if (!token){
         return resp.status(401).end();
     }else{
         jwt.verify(token,'infomed',(err,decoded)=>{
            if (err){
                return resp.status(401).end();
            }
            req.usuario = decoded.id;
            next();
         });
     }
}
app.post("/paciente", verifica_token,(req,resp) =>{
    var paciente = req.body;
    console.log('Post_paciente')    
    conection.query("INSERT INTO infomed.paciente SET ?",[paciente], function (err,result){        
        if (err){
            console.log(err);
            resp.status(500).end();
        }else{            
            resp.status(200);            
            console.log(result.insertedId)
            resp.json(result.insertId);             
        }
    });
});

app.get("/paciente/:idpaciente", verifica_token,(req,resp) =>{
    var idpaciente = req.params.idpaciente
    
    console.log('GET-Pacente_ID')
    console.log(req.params.idpaciente)
    conection.query("SELECT * FROM infomed.paciente WHERE idpaciente = ?",[idpaciente],(err,result)=>{
        
        if (err){
            console.log(err);
            resp.status(500).end();
        }else{
            resp.status(200);
            resp.json(result); 
        }
    });
});
app.get("/pacienteNome/:idpaciente", verifica_token,(req,resp) =>{
    var idpaciente = req.params.idpaciente
    
    console.log('GET-Pacente_nome')
    console.log(req.params.idpaciente)
    conection.query("SELECT nome_paciente FROM infomed.paciente WHERE idpaciente = ?",[idpaciente],(err,result)=>{
        
        if (err){
            console.log(err);
            resp.status(500).end();
        }else{
            console.log(result)
            resp.status(200);
            resp.send(result); 
        }
    });
});
app.get("/pacientes", verifica_token, (req,resp) =>{    
    console.log('GET-TODOS_Paciente_ID')
    conection.query("SELECT * FROM infomed.paciente",(err,result)=>{

        if (err){
            console.log(err);
            resp.status(500).end();
        }else{
            resp.status(200);
            resp.json(result); 
        }
    });

});



app.put("/pacientes/:idpaciente",verifica_token, (req,resp) =>{
    var idpaciente = req.params.idpaciente
    var paciente = req.body;
    console.log(idpaciente)    
    console.log('PUT-Paciente_ID')
    conection.query("UPDATE infomed.paciente set ? WHERE idpaciente = ?",[paciente,idpaciente],(err,result)=>{

        if (err){
            console.log(err);
            resp.status(500).end();
        }else{
            resp.status(200);
            resp.json(result); 
        }
    });

});

app.delete("/paciente/:idpaciente", verifica_token,(req,resp) =>{
    var idpaciente = req.params.idpaciente
    console.log('DELETE_paciente')
    console.log (idpaciente)
    conection.query("DELETE FROM infomed.paciente WHERE idpaciente =?",idpaciente,(err,result)=>{
        if (err){
            console.log(err);
            resp.status(500).end();
        }else{
            resp.status(200);
            resp.json(result); 
        }
    });
});

app.post("/consulta/:idpaciente",verifica_token, (req,resp) =>{    
    var consulta = req.body;            
    console.log('POST_consultas_idpaciente')             
    conection.query("INSERT INTO infomed.consulta SET ? ",[consulta],(erro,result)=>{            
        if (erro){
            console.log(erro);
            resp.status(500).end();
        }else{
            resp.status(200);                      
            resp.json(result); 
        }
    });        
});

app.get("/consulta/:idconsulta",verifica_token, (req,resp) =>{
    var idconsulta = req.params.idconsulta
    
    console.log('GET_consultas_ID')
    conection.query("SELECT * FROM infomed.consulta WHERE idconsulta = ?",[idconsulta],(err,result)=>{
        if (err){
            console.log(err);
            resp.status(500).end();
        }else{
            resp.status(200);
            resp.json(result); 
        }
    });

});
app.get("/consulta", verifica_token,(req,resp) =>{    
    console.log('GET-TODOS_consultas_ID')
    conection.query("SELECT * FROM infomed.consulta",(err,result)=>{
        if (err){
            console.log(err);
            resp.status(500).end();
        }else{
            resp.status(200);
            resp.json(result); 
        }
    });

});



app.put("/consulta/:idconsulta", verifica_token,(req,resp) =>{
    var idconsulta = req.params.idconsulta
    var consulta = req.body;    
    console.log('PUT_consultas_ID')
    conection.query("UPDATE infomed.consulta set ? WHERE idconsulta = ?",[consulta,idconsulta],(err,result)=>{

        if (err){
            console.log(err);
            resp.status(500).end();
        }else{
            resp.status(200);
            resp.json(result); 
        }
    });

});

app.delete("/consulta/:idconsulta", verifica_token,(req,resp) =>{
    var idpaciente = req.params.idconsulta
    console.log('DELETE_consultas')
    conection.query("DELETE FROM infomed.consulta WHERE idconsulta = ?",[idpaciente],(err,result)=>{
        if (err){
            console.log(err);
            resp.status(500).end();
        }else{
            resp.status(200);
            resp.json(result); 
        }
    });
});
app.listen(3000, function () {
    console.log("Aplicacao Web rodando na porta 3000!");
});