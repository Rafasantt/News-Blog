import * as React from 'react';
import api from '../services/api';
import { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom'
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Alert from '@mui/material/Alert';

const theme = createTheme();

export default function SignIn() {
  const [alerta, setAlerta] = useState('false')
  const [user, setUser] = useState('true')
  const navigate = useNavigate()
  const timer = 60000*5

  useEffect(()=>{
    setTimeout(()=>{
      setUser('false')
      navigate("/login")
    },timer)
  },[])
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (data.get('titulo') == '' || data.get('imagem') == '' || data.get('categoria') == '' || data.get('conteudo') == '' || data.get('slug') == '' || data.get('autor') == '' ) {
      alert('Preencha todos os campos !')
    }else{
      api
      .post("/login/cadastro", {
        titulo: data.get('titulo'),
        imagem: data.get('imagem'),
        categoria: data.get('categoria'),
        conteudo: data.get('conteudo'),
        slug: data.get('slug'),
        autor: data.get('autor'),
      })
      .then(()=>{
        setAlerta('true')

        setTimeout(()=>{
          setAlerta('false')
          navigate("/login/lista")
        },1000)
    })
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Novas Notícias
          </Typography>
          <Box component="form" onSubmit={handleSubmit}  noValidate sx={{ mt: 1, width: "100%"}}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="titulo"
              label="Titulo da Noticia"
              name="titulo"
              autoComplete="titulo"
              autoFocus
            />
            <Box>
            <TextField 
              sx={{paddingRight: 1}}
              margin="normal"
              required
              fullWidth
              id="categoria"
              label="Categoria"
              name="categoria"
              autoComplete="categoria"
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="slug"
              label="Slug"
              name="slug"
              autoComplete="slug"
            />
            </Box>

            <Box>
            <TextField 
              sx={{paddingRight: 1}}
              margin="normal"
              required
              fullWidth
              id="imagem"
              label="Url da Imagem"
              name="imagem"
              autoComplete="imagem"
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="autor"
              label="Autor"
              name="autor"
              autoComplete="autor"
            />
            </Box>

            <TextField
              fullWidth
              required
              margin='normal'
              rows={5}
              id="conteudo"
              label="Conteudo"
              name='conteudo'
              autoComplete="conteudo"
              multiline
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              <Link to={"/login/lista"}>
                Salvar
              </Link>
            </Button>
          </Box>
          {alerta === 'true' && 
            <div className=' bottom-0 fixed w-full flex justify-end pr-4 pb-4'>
              <Alert variant="filled" severity="success">Notícia Cadastrada com Sucesso!</Alert>
            </div>
          }
        </Box>
      </Container>
    </ThemeProvider>
  );
}