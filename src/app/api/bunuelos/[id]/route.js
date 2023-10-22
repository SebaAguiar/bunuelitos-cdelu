import { NextResponse } from 'next/server'
import { dbConnect } from '@/utils/mongoose'
import { httpErrorCase, postVerification } from '@/utils/extraFunctions'
import BunueloSchema from '../../schemas/BunueloSchema';
import { Types } from 'mongoose';

dbConnect()


export const GET = async (_req, { params }) => {
  try {
    const bunuelo = await BunueloSchema.findById(params.id)
    return NextResponse.json({
      response: bunuelo
    })
  } catch (err) {
    return NextResponse.error(httpErrorCase(err))
  }
}

export const PUT = async (req, { params }) => {
  const body = await req.json()
  try {
    const bunuelo = await BunueloSchema.findByIdAndUpdate(params.id, body, { new: true })
    return postVerification(bunuelo)
  } catch (err) {
    return NextResponse.error(httpErrorCase(err))
  }
}
