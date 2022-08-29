import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if(req.method === "POST") {
        return await createInquiry(req, res);
    } else if(req.method === 'GET'){
        return await getInquiry(req, res);
    } else {
        return res.status(405).json({ message: 'Method not allowed', success: false});
    }
}

async function getInquiry(req, res){
    try {
        const notes = await prisma.Note.findMany();
        return res.status(200).json(notes, {success: true})
    } catch(err) {
        console.error(err);
        return res.status(500).json({error: "error reading from database", success: false});
    }
}

async function createInquiry(req, res) {
    const body = req.body;
    try{
        const newEntry = await prisma.Note.create({
            data: {
                user: body.userId,
                mbid: body.mbid,
                description: body.description
            }
        });
        return res.status(200).json(newEntry, {success: true});
    } catch(err) {
        console.error("Request error", error);
        res.status(500).json({ error: "Error creating question", success: false});
    }
}