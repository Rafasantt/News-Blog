import { Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { Noticia } from './pages/Noticia';
import { Login } from './pages/Login';
import { Cadastro } from './pages/Cadastro';
import { Lista } from './pages/Lista'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/:slug" element={<Noticia />} />
      <Route path="/login/cadastro" element={<Cadastro />} />
      <Route path="/login/lista" element={<Lista />} />
    </Routes>
  )
}
