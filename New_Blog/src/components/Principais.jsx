import React from 'react'
import { Link } from 'react-router-dom'
import { User, CalendarBlank, ArrowCircleRight } from 'phosphor-react'
import { useState, useEffect } from 'react'
import api from '../services/api'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'

export function Principais() {
  const [primaria, setPrimaria] = useState([])
  const [secundaria, setSecudaria] = useState([])
  const [list, setList] = useState([])

  useEffect(() => {
    api
      .get('/')
      .then(res => {
        setPrimaria([res.data[0]])
        setSecudaria(res.data.slice(1, 3))
        setList(res.data.slice(3))
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  if (!list.length) {
    return (
      <div className="w-full flex flex-col justify-center items-center h-screen bg-gray-800">
        <CircularProgress />
        <p className="mt-4">Carregando...</p>
      </div>
    )
  }
  return (
    <section>
      <div className="w-full flex justify-evenly mt-5 lg:flex-col lg:items-center">
        <div className="w-[60%] lg:w-[98%]">
          {primaria.map((noticiaPri, key) => {
            return (
              <div className="w-full relative lg:mb-2" key={key}>
                <div className="w-full h-full bg-gray-700 absolute z-10"></div>
                <img className="w-full" src={noticiaPri.imagem} alt="" />
                <div className="absolute z-20 bottom-5 p-5">
                  <h2 className="text-[30px] font-bold lg:text-[15px]">
                    {noticiaPri.titulo}
                  </h2>
                  <p className="lg:text-[12px]">
                    {noticiaPri.conteudo.substr(0, 100)} [...]
                  </p>
                  <div className="flex mt-2">
                    <div className="flex">
                      <User size={15} weight="fill" />
                      <p className="pl-1 text-[12px] lg:text-[8px]">
                        {noticiaPri.autor}
                      </p>
                    </div>
                    <div className="flex pl-10">
                      <CalendarBlank size={15} weight="fill" />
                      <p className="pl-1 text-[12px] lg:text-[8px]">
                        {noticiaPri.date}
                      </p>
                    </div>
                  </div>
                  <div className="mt-5 mb-[-20px] w-16">
                    <Button variant="contained">
                      <Link className="flex items-center" to={noticiaPri.slug}>
                        <p className="text-[12px]">Continue</p>
                        <ArrowCircleRight className="ml-1" size={13} />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="w-[30%] flex flex-col justify-between lg:w-[98%]">
          {secundaria.map((noticiaSec, key) => {
            return (
              <div className="w-[98%] relative lg:w-full lg:mb-2" key={key}>
                <div className="w-full h-full bg-gray-700 absolute z-10"></div>
                <img className="w-full" src={noticiaSec.imagem} alt="" />
                <div className="absolute z-20 bottom-5 p-5">
                  <h2 className="text-[15px] font-bold">{noticiaSec.titulo}</h2>
                  <p className="text-[12px]">
                    {noticiaSec.conteudo.substr(0, 100)} [...]
                  </p>
                  <div className="flex mt-2">
                    <div className="flex">
                      <User size={15} weight="fill" />
                      <p className="pl-1 text-[12px]">{noticiaSec.autor}</p>
                    </div>
                    <div className="flex pl-10">
                      <CalendarBlank size={15} weight="fill" />
                      <p className="pl-1 text-[12px]">{noticiaSec.date}</p>
                    </div>
                  </div>
                  <div className="mt-2 mb-[-20px] w-16">
                    <Button variant="contained">
                      <Link className="flex items-center" to={noticiaSec.slug}>
                        <p className="text-[11px]">Continue</p>
                        <ArrowCircleRight className="ml-1" size={13} />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="w-full flex-wrap justify-between flex p-5 lg:flex-col lg:items-center">
        {list.map((noticiaList, key) => {
          return (
            <div
              className="w-[49%] flex text-black mb-3 lg:w-[90%] lg:mb-3 mg:flex-col"
              key={key}
            >
              <img
                className="w-[40%] mg:w-full"
                src={noticiaList.imagem}
                alt=""
              />
              <div className="w-full bg-white shadow-xl">
                <h2 className="text-center text-[18px] pt-5 font-bold">
                  {noticiaList.titulo}
                </h2>
                <p className="text-[15px] text-justify p-2">
                  {noticiaList.conteudo.substr(0, 100)}[...]
                </p>
                <div className="flex lg:flex-col">
                  <div className="flex w-full justify-between">
                    <div className="pl-2">
                      <div className="flex items-center">
                        <User size={15} weight="fill" />
                        <p className="pl-1 text-[12px]">{noticiaList.autor}</p>
                      </div>
                      <div className="flex items-center">
                        <CalendarBlank size={15} weight="fill" />
                        <p className="pl-1 text-[12px]">{noticiaList.date}</p>
                      </div>
                    </div>
                    <div className="mt-1 pr-2 text-white lg:pl-2 lg:pb-2 lg:mt-5 mg:mt-2">
                      <Button variant="contained">
                        <Link
                          className="flex items-center"
                          to={noticiaList.slug}
                        >
                          <p className="text-[11px]">Continue</p>
                          <ArrowCircleRight className="ml-1" size={13} />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
