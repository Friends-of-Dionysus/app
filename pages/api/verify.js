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
        methods: ['POST', 'OPTIONS'],
        origin: ['http:localhost:3000', 'https://app.friendsofdionysus.com' ],

    })
)


export default async function verify(req, res) {

    await cors(req, res)

    if (req.method === 'POST') {
        console.log(`Received new request: ${JSON.stringify(req.body)}`)
        
        if (!req.body.contact_permission || !req.body.username || !req.body.username.length || !req.body.address || !req.body.address.length) {
            return res.status(500).json({ error: 'Internal Server Error', code: 500 })
        }

        let twitterUsername = req.body.username

        if (twitterUsername[0] === '@') {
            twitterUsername = req.body.username.substring(1);
        }

        try {
            await prisma.raffle.create({
                data: {
                    solAddress: req.body.address,
                    twitterHandle: twitterUsername,
                    contactPermission: req.body.contact_permission, 
                    email: req.body.email ?? ""
                }
            });
            return res.status(200).json({ msg: 'Successful application.', code: 200 })
        } catch (err) {
            console.log(err)
            return res.status(400).json({ error: 'You already applied.', code: 400 })
        }

    } else {
        return res.status(500).json({ error: 'Internal Server Error', code: 500 })
    }


}