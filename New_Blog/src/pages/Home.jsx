import React from 'react';
import { Header } from '../components/Header';
import { Principais } from '../components/Principais';
import { Footer } from '../components/Footer'

export function Home() {
  return (
    <div>
      <Header />
      <Principais />
      <Footer />
    </div>
  )
}
