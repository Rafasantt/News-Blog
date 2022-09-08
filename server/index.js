const express = require ('express');
const mongoose = require('mongoose');
const Posts = require('./posts')
const fileupload = require ('express-fileupload');
var bodyParser = require('body-parser');
const fs = require ('fs');
const cors = require ('cors');
const app = express()
var path = require ('path');
require("dotenv-safe").config();
const jwt = require('jsonwebtoken');

const port = 3001


mongoose.connect(process.env.DATABASE,{useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
  console.log('Conectado com sucesso');
}).catch((err)=>{
  console.log(err.message);
})

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', (req, res)=>{
  Posts.find({}).limit().exec((err, post)=>{
    res.send(post)
  })
})

app.get('/:slug',(req, res)=>{
  Posts.find({slug: req.params.slug}, (err, post)=>{
    res.send(post)
  })
})

app.post('/login', (req, res, next) => {
    if(req.body.email === 'teste' && req.body.password === '123'){
        //auth ok
      const id = 1; //esse id viria do banco de dados
      const token = jwt.sign({ id }, process.env.SECRET, {
        expiresIn: 300 // expires in 5min
      });
      return res.json({ auth: true, token: token });
    }
      res.status(500).json({message: 'Login inválido!'});
})

function verifyJWT(req, res, next){
  const token = req.headers['x-access-token'];
  if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });
  
  jwt.verify(token, process.env.SECRET, function(err, decoded) {
    if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
    
    // se tudo estiver ok, salva no request para uso posterior
    req.userId = decoded.id;
    next();
  });
}

app.get('/login/lista', verifyJWT, (req, res)=>{
  Posts.find({}).limit().exec((err, post)=>{
    res.send(post)
  })
})

app.post('/login/cadastro',(req, res)=>{
  var dataAtual = ''
  function atualizarDt() {
    var data = new Date()
    var dia = String(data.getDate()).padStart(2, '0')
    var mes = String(data.getMonth() + 1).padStart(2, '0')
    var ano = data.getFullYear()
    dt = dia + '-' + mes + '-' + ano
    dataAtual = dt
  }
  atualizarDt()

  NewPost = new Posts({
    titulo: req.body.titulo,
    imagem: req.body.imagem,
    conteudo: req.body.conteudo,
    slug: req.body.slug,
    categoria: req.body.categoria,
    autor: req.body.autor,
    date: dataAtual,
  })
  
  try {
    NewPost.save();
    console.log('Cadastrada com sucesso')
    res.json({'Status': 'cadastrado'})
  }catch(err){
    next(err)
  }
})

app.delete('/login/cadastro/:id',(req,res)=>{

  Posts.deleteOne({_id:req.params.id})
  .then(()=>{
    res.json({'menssagem': 'apagada com sucesso'})
    console.log('apagado')
  })
})





app.listen(port, ()=>{
  console.log(`🚀 Server listening on port ${port}`);
});