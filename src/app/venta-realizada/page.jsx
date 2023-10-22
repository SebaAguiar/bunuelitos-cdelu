'use client'
import React from 'react'
import { useExistentContext } from '@/context/AppContext';
import { useRouter } from 'next/navigation';

const VentaRealizada = () => {
  const router = useRouter()
  const { venta } = useExistentContext()
  console.log(venta);
  return (
    <div className='h-full w-full grid grid-cols-4 grid-rows-10 bg-yellow-2'>
      <h1 className='row-start-1 col-start-2 col-end-4 text-center text-xl font-bold mt-3'>Venta Realizada</h1>
      <div className='row-start-3 row-end-5 col-start-1 col-end-5 flex flex-col justify-center items-center'>
      <p className='font-bold text-xl'>Buñuelos Clásicos</p>
      <p className='font-medium text-lg'>{venta.classic}</p>
      <p className='font-bold text-xl'>Buñuelos Rellenos</p>
      <p className='font-medium text-lg'>{venta.special}</p>
      </div>
      <div className='row-start-6 row-end-8 col-start-1 col-end-5 flex flex-col justify-center items-center'>
      <h2 className='font-bold text-4xl'>Total</h2>
      <h3 className='font-bold text-6xl'>${venta.money}</h3>
      </div>
      <p className='row-start-8 col-start-1 col-end-5 flex items-end justify-center'>{venta.mercadopago ? 'Pagado con Mercadopago' : 'Pagado en efectivo'}</p>
      <button type='button' className='row-start-9 col-start-2 col-end-4 border rounded-lg h-8 flex items-center justify-center mt-4' onClick={() => router.push('/')}>
        Volver
      </button>
    </div>
  )
}

export default VentaRealizada
