import { connect, connection } from 'mongoose'

const conn = {
  isConnected: false
}

export const dbConnect = async () => {
  if (conn.isConnected) {
    return
  }
  const db = await connect(process.env.DB_URI)
  conn.isConnected = db.connections[0].db.databaseName
}

connection.on('connected', () => console.log('MongoDB connected successfully'))
connection.on('error', (err) => console.error('MongoDB error: ', err.message))
