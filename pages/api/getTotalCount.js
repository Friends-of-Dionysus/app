import { PrismaClient } from '@prisma/client'
import Cors from 'cors'

const prisma = new PrismaClient()

function initMiddleware(middleware) {
    return (req, res) =>
        new Promise((resolve, reject) => {
            middleware(req, res, (result) => {
                if (result instanceof Error) {
                    return reject(result)
                }
                return resolve(result)
            })
        })
}


// Initialize the cors middleware
const cors = initMiddleware(
    Cors({
        methods: ['GET', 'OPTIONS'],
        origin: ['http:localhost:3000', 'https://app.friendsofdionysus.com'],

    })
)


export default async function getTotalCount(req, res) {

    await cors(req, res)

    if (req.method === 'GET') {

        try {
            const totalCount = await prisma.raffle.count()

            return res.status(200).json({ totalCount, code: 200 })
        } catch (err) {
            console.log(err)
            return res.status(400).json({ error: 'You already applied.', code: 400 })
        }

    } else {
        return res.status(500).json({ error: 'Internal Server Error', code: 500 })
    }


}