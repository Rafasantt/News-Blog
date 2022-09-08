import * as React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Trash, User, CalendarBlank } from 'phosphor-react'
import api from '../services/api'
import { Button } from '@mui/material'
import Alert from '@mui/material/Alert'

export default function MediaCard() {
  const [lista, setLista] = useState([])
  const [alerta, setAlerta] = useState('false')
  const token = localStorage.getItem('token')
  const navigate = useNavigate()

  useEffect(() => {
    api
      .get('/login/lista', { headers: { 'x-access-token': token } })
      .then(res => {
        setLista(res.data)
      })
      .catch(Error => {
        console.log(Error.response.data.auth)
        navigate('/login')
      })
  }, [])

  function deletarNoticia(id) {
    api.delete(`/login/cadastro/${id}`).then(setAlerta('true'))
    setLista(lista.filter(list => list._id !== id))

    setTimeout(() => {
      setAlerta('false')
    }, 2000)
  }

  return (
    <section className="text-center bg-slate-50">
      <div className="text-[25px] my-6 text-black">
        <h2>Lista de Notícias</h2>
      </div>
      <div className="w-full flex justify-evenly flex-wrap">
        {lista.map((list, key) => {
          return (
            <div
              className="flex flex-col items-center mb-5 w-[45%] text-black lg:w-full"
              key={key}
            >
              <div className="w-[90%] shadow-xl relative">
                <div>
                  <img className="w-full" src={list.imagem} alt="" />
                </div>
                <div className="w-full h-52 bg-white flex flex-col items-center">
                  <h2 className="font-bold pt-2">{list.titulo}</h2>
                  <p className="p-2 text-[14px]">
                    {list.conteudo.substr(0, 180)}
                  </p>
                  <div className="text-[12px] p-2 w-full lg:flex lg:justify-evenly">
                    <div className="flex items-center">
                      <User size={13} weight="fill" />
                      <p>{list.autor}</p>
                    </div>
                    <div className="flex items-center">
                      <CalendarBlank size={13} weight="fill" />
                      <p>{list.date}</p>
                    </div>
                  </div>
                  <div className="text-[#d22e2e] hover:text-[#e61919] mt-2 font-bold absolute bottom-2">
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => deletarNoticia(list._id)}
                    >
                      Apagar
                      <Trash
                        className="mb-[3px] ml-1"
                        size={14}
                        weight="fill"
                      />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      {alerta === 'true' && (
        <div className=" bottom-0 fixed w-full flex justify-end pr-4 pb-4">
          <Alert variant="filled" severity="success">
            Notícia Deletada com Sucesso!
          </Alert>
        </div>
      )}
    </section>
  )
}
