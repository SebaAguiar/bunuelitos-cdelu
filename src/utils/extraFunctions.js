import axios from 'axios';

export const postController = async (postData, classicBunuelo, specialBunuelo) => {

  let data = {
    cost,
    classicAmount,
    specialAmount,
    mercadopago: postData.mercadopago
  }
  console.log(data)
  // return data
}


export const bunuelosToContext = async () => {
  const bun =  await axios.get('/api/bunuelos')
  return bun.data.response
}

export const getVentas = async () => {
  const ventas = await axios.get('/api/ventas')
  return ventas.data.response
}

export const funcSuma = (buns) => {
  let totalGanancia = buns.reduce((acc, bun) => acc + bun.money, 0)
  let totalRellenos = buns.reduce((acc, bun) => acc + bun.special, 0)
  let totalClasicos = buns.reduce((acc, bun) => acc + bun.classic, 0)
  return {
    money: totalGanancia,
    classic: totalClasicos,
    special: totalRellenos
  }
}
