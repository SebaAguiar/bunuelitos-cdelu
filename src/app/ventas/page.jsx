'use client'
import { funcSuma } from '@/utils/extraFunctions';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Ventas = () => {

  const [today, setToday] = useState(true)
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  const [ventas, setVentas] = useState([])
  const [ventasCopy, setVentasCopy] = useState([])
  const [totalGranancia, setTotalGanancia] = useState(0)
  const [totalClassicBunuelos, setTotalClassicBunuelos] = useState(0)
  const [totalSpecialBunuelo, setTotalSpecialBunuelo] = useState(0)

  useEffect(() => {
    return async () => {
      if(!ventas.length && !ventasCopy.length) {
        const dbVentas = await axios.get('/api/ventas')
        setVentas(dbVentas.data.response)
        setVentasCopy(dbVentas.data.response)
      }
      const totalSuma = funcSuma(ventas)
      setTotalClassicBunuelos(totalSuma.classic / 12)
      setTotalSpecialBunuelo(totalSuma.special / 12)
      setTotalGanancia(totalSuma.money)
    }
  }, [ventas, ventasCopy, totalClassicBunuelos, totalGranancia, totalSpecialBunuelo])

  
  const handleToDateChange = (e) => {
    setToDate(e.target.value)
    console.log(toDate)
  }

  const handleToDayChange = (e) => {
    setToday(!today)
    if(!today) {
      let valuesToChange = funcSuma(ventasCopy)
      setTotalGanancia(valuesToChange.money)
      setTotalClassicBunuelos(valuesToChange.classic / 12)
      setTotalSpecialBunuelo(valuesToChange.special / 12)
      setVentas(ventasCopy)
    } else {
      let fechaHoy = new Date()
      let filtered = ventas.filter(bun => {
        const date = new Date(bun.createdAt)
        return (
          date.getDate() === fechaHoy.getDate() &&
          date.getMonth() === fechaHoy.getMonth() &&
          date.getFullYear() === fechaHoy.getFullYear()
        )
      })
      const valuesToChange = funcSuma(filtered)
      setVentas(filtered)
      setTotalGanancia(valuesToChange.money)
      setTotalClassicBunuelos(valuesToChange.classic / 12)
      setTotalSpecialBunuelo(valuesToChange.special / 12)
    }
  }

  return (
    <div className='h-full w-full overflow-scroll bg-yellow-1'>
      <h1>Ventas</h1>
      <div className='flex'>
        <div className='flex flex-col-reverse items-center'>
          <input onChange={handleToDayChange} value={today} type="checkbox" />
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
      <table>
        <thead>
          <tr>
            <th>Clásicos</th>
            <th>Rellenos</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className='whitespace-nowrap py-4 px-6'>{totalClassicBunuelos}</td>
            <td className='whitespace-nowrap py-4 px-6'>{totalSpecialBunuelo}</td>
            <td className='whitespace-nowrap py-4 px-6'>$ {totalGranancia}</td>
          </tr>
        </tbody>
      </table>
      <table className='min-w-full'>
        <thead>
          <tr>
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
                  <td className='whitespace-nowrap py-4 px-6'>{venta.classic}</td>
                  <td className='whitespace-nowrap py-4 px-6'>{venta.special}</td>
                  <td className='whitespace-nowrap py-4 px-6'>{venta.mercadopago ? 'Mercadopago' : 'Efectivo'}</td>
                  <td className='whitespace-nowrap py-4 px-6'>$ {venta.money}</td>
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
