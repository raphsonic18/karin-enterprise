import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import WhyUs from './components/WhyUs'
import Gallery from './components/Gallery'
import CTA from './components/CTA'
import Footer from './components/Footer'
import DevisModal from './components/DevisModal'

export default function App() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <Navbar onDevisClick={() => setModalOpen(true)} />
      <main>
        <Hero onDevisClick={() => setModalOpen(true)} />
        <Services />
        <WhyUs />
        <Gallery />
        <CTA onDevisClick={() => setModalOpen(true)} />
      </main>
      <Footer />
      <DevisModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  )
}
