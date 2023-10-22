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
