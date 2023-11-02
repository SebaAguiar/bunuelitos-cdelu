'use client'
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Ventas = () => {

  const [today, setToday] = useState(false)
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
    }
  }, [ventas.length, ventasCopy.length])

  useEffect(() => {
    if(!totalGranancia) {
      let ganancia = 0
      for (let i = 0; i < ventas.length; i++) {
        ganancia += ventas[i].money;
      }
      setTotalGanancia(ganancia)
    }
    if(!totalClassicBunuelos) {
      let classic = 0
      for (let i = 0; i < ventas.length; i++) {
        classic += ventas[i].classic;
      }
      classic = classic / 12
      setTotalClassicBunuelos(classic)
    }
    if(!totalSpecialBunuelo) {
      let special = 0
      for(let i = 0; i < ventas.length; i++) {
        special += ventas[i].special
      }
      special = special / 12
      setTotalSpecialBunuelo(special)
    }
  }, [totalGranancia, totalClassicBunuelos, totalSpecialBunuelo, ventas])
  
  const handleToDateChange = (e) => {
    setToDate(e.target.value)
    console.log(toDate)
  }

  const handleToDayChange = (e) => {
    if(!today) {
      setVentas(ventasCopy)
    } else {
      let fechaHoy = new Date()
      let filtered = ventas.filter((bun) => {
        return (    
          bun.createdAt.getDate() === fechaHoy.getDate() &&
          bun.createdAt.getMonth() === fechaHoy.getMonth() &&
          bun.createdAt.getFullYear() === fechaHoy.getFullYear())
      })
      setVentas(filtered)
    }
  }

  console.log({
    totalGranancia, 
    totalClassicBunuelos, 
    totalSpecialBunuelo, 
    ventas,
    ventasCopy
  })

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
