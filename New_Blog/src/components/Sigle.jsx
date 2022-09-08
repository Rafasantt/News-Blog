import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import api from '../services/api'
import { Header } from './Header'
import { Footer } from './Footer'
import { User, CalendarBlank } from 'phosphor-react'
import CircularProgress from '@mui/material/CircularProgress'

export function Single() {
  const [single, setSingle] = useState([])
  const { slug } = useParams()

  useEffect(() => {
    api
      .get(`/${slug}`)
      .then(res => {
        setSingle(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  if (!single.length) {
    return (
      <div className="w-full flex flex-col justify-center items-center h-screen bg-gray-800">
        <CircularProgress />
        <p className="mt-4">Carregando...</p>
      </div>
    )
  }

  return (
    <div>
      <Header />
      <div className="w-full flex justify-center text-black mt-10">
        {single.map((noticiaSingle, key) => {
          return (
            <div className="w-11/12 flex lg:flex-col lg:items-center" key={key}>
              <div className="w-1/2 lg:w-11/12">
                <img className="w-full" src={noticiaSingle.imagem} alt="" />
              </div>
              <div className="w-1/2 pl-7 lg:w-11/12 lg:pl-0">
                <h2 className="text-center text-[25px] font-semibold">
                  {noticiaSingle.titulo}
                </h2>
                <p className="text-justify pt-3">{noticiaSingle.conteudo}</p>
                <div className="flex mt-5 lg:flex-col lg:mt-0">
                  <div className="flex items-center lg:py-2">
                    <User size={18} weight="fill" />
                    <p className="text-[15px]">{noticiaSingle.autor}</p>
                  </div>
                  <div className="flex items-center pl-10 lg:pl-0">
                    <CalendarBlank size={18} weight="fill" />
                    <p className="text-[15px]">{noticiaSingle.date}</p>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <div className="mt-20">
        <Footer />
      </div>
    </div>
  )
}
