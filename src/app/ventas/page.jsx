'use client'
import { useExistentContext } from '@/context/AppContext';
import { funcSuma, getVentas } from '@/utils/extraFunctions';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Ventas = () => {

  const [today, setToday] = useState(true)
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  const [ventasCopy, setVentasCopy] = useState([])
  const [totalGranancia, setTotalGanancia] = useState(0)
  const [totalClassicBunuelos, setTotalClassicBunuelos] = useState(0)
  const [totalSpecialBunuelo, setTotalSpecialBunuelo] = useState(0)
  const { ventas, setVentasState } = useExistentContext()

  useEffect(() => {
    return async() => {
      if(!ventas.length) {
        const ventasTotal = await getVentas()
        setVentasState(ventasTotal)
      }
    }
  })


  useEffect(() => {
      const totalSuma = funcSuma(ventas)
      setTotalClassicBunuelos(totalSuma.classic / 12)
      setTotalSpecialBunuelo(totalSuma.special / 12)
      setTotalGanancia(totalSuma.money)
      setVentasCopy(ventas)
  }, [ventas, ventasCopy, totalClassicBunuelos, totalGranancia, totalSpecialBunuelo])

  
  const handleToDateChange = (e) => {
    setToDate(e.target.value)
    console.log(toDate)
  }

  const handleFromDateChange = (e) => {
    setFromDate(e.target.value)
    console.log(fromDate)
  }

  const handleFilterButton = (e) => {
    e.preventDefault()
    const newToDate = new Date(toDate)
    const newFromDate = new Date(fromDate)
    console.log(newToDate);
    let filtered = ventas.filter(bun => {
      return (
        bun.createdAt >= newFromDate && bun.createdAt <= newToDate
      )
    })
    console.log(filtered)
    const valuesToChange = funcSuma(filtered)
    setVentasState(filtered)
    setTotalClassicBunuelos(valuesToChange.classic / 12)
    setTotalSpecialBunuelo(valuesToChange.special / 12)
  }

  const handleToDayChange = (e) => {
    console.log(today)
    if(!today) {
      console.log(ventasCopy.length)
      let valuesToChange = funcSuma(ventasCopy)
      setTotalGanancia(valuesToChange.money)
      setTotalClassicBunuelos(valuesToChange.classic / 12)
      setTotalSpecialBunuelo(valuesToChange.special / 12)
      setVentasState(ventasCopy)
      console.log(ventas)
      setToday(!today)
    } else {
      console.log('else')
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
      console.log(filtered.length)
      setVentasState(filtered)
      console.log(ventas)
      setTotalGanancia(valuesToChange.money)
      setTotalClassicBunuelos(valuesToChange.classic / 12)
      setTotalSpecialBunuelo(valuesToChange.special / 12)
      setToday(!today)
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
          <input type="date" value={fromDate} onChange={handleFromDateChange} />
          <label>Desde</label>
        </div>
        <div className='flex flex-col-reverse items-center'>
          <input type="date" value={toDate} onChange={handleToDateChange} />
          <label>hasta</label>
        </div>
        <button onClick={handleFilterButton}>
          Aplicar
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Clásicos</th>
            <th>Rellenos</th>
            <th>Buñuelos Totales</th>
            <th>Total Ganancia</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className='whitespace-nowrap py-4 px-6'>{totalClassicBunuelos}</td>
            <td className='whitespace-nowrap py-4 px-6'>{totalSpecialBunuelo}</td>
            <td className='whitespace-nowrap py-4 px-6'>{totalSpecialBunuelo + totalClassicBunuelos}</td>
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
