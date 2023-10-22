'use client'
import { createContext, useContext, useState } from 'react'

const AppContext = createContext()


export const useExistentContext = () => {
  const context = useContext(AppContext)
  if (context) {
    return context
  } else {
    return false
  }
}


const ContextProvider = ({ children }) => {

  const [bunuelos, setBunuelos] = useState([])
  const [venta, setVenta] = useState({})

  const changeCost = (num) => {
    setTotalCost(num)
  }

  const setBunuelosState = (bun) => {
    if(!bunuelos.length) {
      setBunuelos(bun)
    }
  }

  return (
    <AppContext.Provider
      value={{
        bunuelos,
        setBunuelosState,
        venta,
        setVenta
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default ContextProvider
