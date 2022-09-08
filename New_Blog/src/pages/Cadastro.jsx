import React from 'react'
import FormCadastro from '../components/FormCadastro'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

export function Cadastro() {
  return (
    <div>
      <Header />
      <div className="flex w-full justify-center bg-slate-50">
        <section className="w-[50%] my-5 bg-white shadow-xl">
          <FormCadastro />
        </section>
      </div>
      <Footer />
    </div>
  )
}
