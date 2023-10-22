import { NextResponse } from 'next/server'
import { dbConnect } from '@/utils/mongoose'
// import { httpErrorCase, postVerification } from '@/utils/extraFunctions'
import BunueloSchema from '@/schemas/BunueloSchema';
import { Types } from 'mongoose';

dbConnect()

export const GET = async () => {
  try {
    const bunuelos = await BunueloSchema.find()
    return NextResponse.json({
      response: bunuelos
    })
  } catch (err) {
    return NextResponse.error(httpErrorCase(err))
  }
}

export const POST = async (req) => {
  const body = await req.json()
  try {
    const bunuelo = await BunueloSchema.create({
      _id: new Types.ObjectId(),
      name: body.name,
      type: body.type,
      cost_per_unit: body.cost_per_unit,
      cost_per_dozen: body.cost_per_dozen,
      cost_per_half_dozen: body.cost_per_half_dozen
    })
    if (bunuelo) {
      return NextResponse.json({
        response: 'Bunuelo created successfully',
      })
    } else {
      return NextResponse.json({
        response: 'No se ha podido crear el buñuelo',
        status: 400
      })
    }
  } catch (err) {
    console.log(err)
    return NextResponse.error({
      response: 'Un error ha ocurrido'
    })
  }
}
