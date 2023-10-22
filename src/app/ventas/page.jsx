'use client'
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Ventas = () => {

  const [today, setToday] = useState(false)
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  const [ventas, setVentas] = useState([])

  useEffect(() => {
    return async () => {
      if(!ventas.length) {
        const dbVentas = await axios.get('/api/ventas')
        setVentas(dbVentas.data.response)
      }
    }
  }, [ventas])
  
  const handleToDateChange = (e) => {
    setToDate(e.target.value)
    console.log(toDate)
  }

  return (
    <div className='h-full w-full overflow-scroll bg-yellow-1'>
      <h1>Ventas</h1>
      <div className='flex'>
        <div className='flex flex-col-reverse items-center'>
          <input type="checkbox" />
          <label>Hoy</label>
        </div>
        <div className='flex flex-col-reverse items-center'>
          <input type="date" />
          <label>Desde</label>
        </div>
        <div className='flex flex-col-reverse items-center'>
          <input type="date" value={toDate} onChange={handleToDateChange} />
          <label>hasta</label>
        </div>
        <button>
          Aplicar
        </button>
      </div>
      <table className='min-w-full'>
        <thead>
          <tr>
            <th>Id</th>
            <th>Clásicos</th>
            <th>Rellenos</th>
            <th>Método de pago</th>
            <th>Monto</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {
            ventas.map((venta, index) => {
              return (
                <tr key={index}>
                  <td className='whitespace-nowrap py-4 px-6'>{venta._id}</td>
                  <td className='whitespace-nowrap py-4 px-6'>{venta.classic}</td>
                  <td className='whitespace-nowrap py-4 px-6'>{venta.special}</td>
                  <td className='whitespace-nowrap py-4 px-6'>{venta.mercadopago ? 'Mercadopago' : 'Efectivo'}</td>
                  <td className='whitespace-nowrap py-4 px-6'>{venta.money}</td>
                  <td className='whitespace-nowrap py-4 px-6'>{new Date(venta.createdAt).toLocaleDateString('es-ES', { year: 'numeric', month: 'short', day: 'numeric'})}</td>
              </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}



export default Ventas
