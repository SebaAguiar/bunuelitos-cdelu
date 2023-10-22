'use client'

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useExistentContext } from '@/context/AppContext';
import { bunuelosToContext } from '@/utils/extraFunctions';
import { useRouter, redirect } from 'next/navigation';


const LandingForm = () => {

  const router = useRouter()
  const [clasico, setClasico] = useState(0)
  const [special, setSpecial] = useState(0)
  const [individual, setIndividual] = useState(0)
  const [individualSpecial, setIndividualSpecial] = useState(0)
  const [mercadopago, setMercadopago] = useState(false)
  const [mediaDocenaClasico, setMediaDocenaClasico] = useState(false)
  const [mediaDocenaSpecial, setMediaDocenaSpecial] = useState(false)
  const { bunuelos ,setBunuelosState, venta, setVenta } = useExistentContext()

  useEffect(() => {
    return async () => {
      if (bunuelos.length == 0) {
        const bun = await bunuelosToContext()
        setBunuelosState(bun)
      }
    }
  })


  const handleClasico = (e) => {
    e.preventDefault()
    if (e.target.value === 'mas') {
      setClasico(clasico + 1)
    } else {
      if (clasico > 0) {
        setClasico(clasico - 1)
      }
    }

  }

  const handleSpecial = (e) => {
    e.preventDefault()
    if (e.target.value === 'mas') {
      setSpecial(special + 1)
    } else {
      if (special > 0) {
        setSpecial(special - 1)
      }
    }
  }

  const handleIndividualClassic = (e) => {
    e.preventDefault()
    if (e.target.value === 'mas') {
      setIndividual(individual + 1)
    } else {
      if (individual > 0) {
        setIndividual(individual - 1)
      }
    }
  }

  const handleIndividualSpecial = (e) => {
    e.preventDefault()
    if (e.target.value === 'mas') {
      setIndividualSpecial(individualSpecial + 1)
    } else {
      if (individualSpecial > 0) {
        setIndividualSpecial(individualSpecial - 1)
      }
    }
  }

  const handleMPCheckbox = (e) => {
    e.preventDefault()
    setMercadopago(!mercadopago)
  }

  const handleSpecialHalf = (e) => {
    e.preventDefault()
    setMediaDocenaSpecial(!mediaDocenaSpecial)
  }

  const handleClassicHalf = (e) => {
    e.preventDefault()
    setMediaDocenaClasico(!mediaDocenaClasico)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = {
      clasico,
      special,
      individual,
      individualSpecial,
      mercadopago,
      mediaDocenaClasico,
      mediaDocenaSpecial
    }
    const prod = await axios.post('/api/ventas', data)
    setVenta(prod.data.response)
    router.push('/venta-realizada')
  }

  return (
    <div className='w-full h-full flex justify-center'>
      <form onSubmit={handleSubmit} className='w-5/6 h-full grid grid-cols-5 grid-rows-10 overflow-y-scroll'>
      <h1 className='grid col-start-1 col-end-6 row-start-1 text-center text-xl font-bold'>Crear Pedido</h1>
        <div className='col-start-1 col-end-6 row-start-2 row-end-4 flex flex-col items-center'>
          <h2 className='font-semibold text-lg text-center'>Clasico</h2>
          <div className='flex flex-row w-full justify-center'>
            <button className='w-1/3 h-16 border rounded-l-2xl' onClick={(e) => handleClasico(e)} type='button' value='menos'>-</button>
            <p className='w-1/3 h-16 flex items-center justify-center font-semibold text-lg bg-white border '>{clasico}</p>
            <button className='w-1/3 h-16 border rounded-r-2xl' onClick={(e) => handleClasico(e)} type='button' value='mas'>+</button>
          </div>
            <div>
              <input className='h-4 w-4' checked={mediaDocenaClasico} onChange={handleClassicHalf} type='checkbox' />
              <label> Media Docena</label>
            </div>
        </div>
        <div className='col-start-1 col-end-6 row-start-4 row-end-6 flex flex-col items-center'>
          <h2 className='font-semibold text-lg text-center'>Relleno</h2>
          <div className='flex flex-row w-full justify-center'>
            <button className='w-1/3 h-16 border rounded-l-2xl' onClick={(e) => handleSpecial(e)} type='button' value='menos'>-</button>
            <p className='w-1/3 h-16 flex items-center justify-center font-semibold text-lg bg-white border '>{special}</p>
            <button className='w-1/3 h-16 border rounded-r-2xl' onClick={(e) => handleSpecial(e)} type='button' value='mas'>+</button>
          </div>
            <div>
              <input className='h-4 w-4' checked={mediaDocenaSpecial} onChange={handleSpecialHalf} type='checkbox' />
              <label> Media Docena</label>
            </div>
        </div>
        <div className='col-start-1 col-end-6 row-start-6 row-end-8 flex flex-col items-center'>
          <h2 className='font-semibold text-lg text-center'>Individual Clasico</h2>
          <div className='flex flex-row w-full justify-center'>
            <button className='w-1/3 h-16 border rounded-l-2xl' onClick={(e) => handleIndividualClassic(e)} type='button' value='menos'>-</button>
            <p className='w-1/3 h-16 flex items-center justify-center font-semibold text-lg bg-white border '>{individual}</p>
            <button className='w-1/3 h-16 border rounded-r-2xl' onClick={(e) => handleIndividualClassic(e)} type='button' value='mas'>+</button>
          </div>
        </div>
        <div className='col-start-1 col-end-6 row-start-8 row-end-10 flex flex-col items-center'>
          <h2 className='font-semibold text-lg text-center'>Individual Relleno</h2>
          <div className='flex flex-row w-full justify-center'>
            <button className='w-1/3 h-16 border rounded-l-2xl' onClick={(e) => handleIndividualSpecial(e)} type='button' value='menos'>-</button>
            <p className='w-1/3 h-16 flex items-center justify-center font-semibold text-lg bg-white border '>{individualSpecial}</p>
            <button className='w-1/3 h-16 border rounded-r-2xl' onClick={(e) => handleIndividualSpecial(e)} type='button' value='mas'>+</button>
          </div>
        </div>
        <div className='col-start-1 col-end-6 row-start-10 flex justify-center items-start'>
          <div>
            <input className='h-4 w-4' checked={mercadopago} onChange={handleMPCheckbox} type="checkbox" />
            <label htmlFor="">MP</label>
          </div>
          <button className='border rounded-lg w-28 h-10' type='submit'>Enviar</button>
        </div>
      </form>
    </div>
  )
}

export default LandingForm
