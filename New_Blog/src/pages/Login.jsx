import React from 'react'
import SignIn from '../components/Logar'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

export function Login() {
  return (
    <div>
      <Header />
      <SignIn />
      <div className="fixed bottom-0 w-full">
        <Footer />
      </div>
    </div>
  )
}
