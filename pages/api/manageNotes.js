import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if(req.method === "DELETE") {
        return await deleteInquiry(req, res);
    } else if(req.method === 'POST'){
        return await getAllInquiry(req, res);
    } else {
        return res.status(405).json({ message: 'Method not allowed', success: false});
    }
}

async function getAllInquiry(req, res) {
    const body = req.body;
    console.log("api", body)
    try {
        const result = await prisma.Note.findMany({
            where: {
              user: body
            },
        })
        res.status(200).json({ result, success: true});
    } catch(err) {
        console.error("Request error", err);
        res.status(500).json({ error: "Error creating question", success: false});
    }
}

async function deleteInquiry(req, res) {
    const body = req.body;
    // console.log(body.id)
    try{
        const result = await prisma.Note.delete({
            where: {
                id: parseInt(body)
            }
        })
        res.status(200).json({ result, success: true});

    } catch(err) {
        console.error("Request error", err);
        res.status(500).json({ error: "Error creating question", success: false});
    }
}