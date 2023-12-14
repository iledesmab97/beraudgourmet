import { NextResponse } from "next/server"
// const {Sequelize} = requiere('sequelize')
import {Sequelize} from 'sequelize'

console.log('estoy leyendo el archivo de la ruta api/users')

const user = 'postgres'
const pass = 'postgres'
const host = 'localhost'
const port = '5432'
const dbname = 'beraudgourmet'

const db = new Sequelize(`postgres://${user}:${pass}@${host}:${port}/${dbname}`)

export async function GET() {
    try {
        // await db.authenticate()
        // return NextResponse.json({message: "Connection has been established successfully."})
        return NextResponse.json({message: "hola mundo"})
    } catch (error) {
        // return NextResponse.json({message: `Unable to connect to the database: ${error}`})
        return NextResponse.json({message: 'entre en el catch'})
    }
}