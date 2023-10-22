import { NextResponse } from 'next/server'
import { dbConnect } from '@/utils/mongoose'
import BunueloSchema from '@/schemas/BunueloSchema';
import SoldProds from '@/schemas/SoldSchema';
import { Types, now } from 'mongoose';

dbConnect()

export const GET = async () => {
  try {
    const ventas = await SoldProds.find()
    return NextResponse.json({
      response: ventas
    })
  } catch (err) {
    return NextResponse.error(err)
  }
}

export const POST = async (req) => {
  try {
    const data = await req.json()
    let cost = 0
    let classicAmount = 0
    let specialAmount = 0
    const mercadopago = data.mercadopago
    const bunuelos = await BunueloSchema.find({})
    const classicBunuelo = bunuelos.find(bunuelo => bunuelo.type === 'classic')
    const specialBunuelo = bunuelos.find(bunuelo => bunuelo.type === 'special')
    if (data.clasico) {
      const amountC = data.clasico * 12
      const costClasicDozen = data.clasico * classicBunuelo.cost_per_dozen
      cost = cost + costClasicDozen
      classicAmount = classicAmount + amountC
    }
    if (data.special) {
      const amountS = data.special * 12
      const costSpecialDozen = data.special * specialBunuelo.cost_per_dozen
      cost = cost + costSpecialDozen
      specialAmount = specialAmount + amountS
    }
    if (data.individual) {
      const costIC = data.individual * classicBunuelo.cost_per_unit 
      cost = cost + costIC
      classicAmount = classicAmount + data.individual
    }
    if (data.individualSpecial) {
      const costIs = data.individualSpecial * specialBunuelo.cost_per_unit 
      cost = cost + costIs 
      specialAmount = specialAmount + data.individualSpecial
    }
    if (data.mediaDocenaClasico) {
      cost = cost + classicBunuelo.cost_per_half_dozen
      classicAmount = classicAmount + 6
    }
    if (data.mediaDocenaSpecial) {
      cost = cost + specialBunuelo.cost_per_half_dozen
      specialAmount = specialAmount + 6
    }
    if(cost === 0) {
      NextResponse.json({
        response: 'Es necesario vender productos'
      })
    }
    if(cost !== 0) {
      const soldBun = await SoldProds.create({
        _id: new Types.ObjectId(),
        classic: classicAmount,
        special: specialAmount,
        mercadopago: data.mercadopago,
        money: cost,
      })
      return NextResponse.json({
        response: soldBun
      })
    }
  } catch (error) {
    console.log(error)
    return NextResponse.error({
      response: 'lo sentimos ha ocurrido un error'
    })
  }
}
