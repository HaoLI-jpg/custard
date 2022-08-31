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
        const note = await prisma.$queryRawUnsafe(
            `SELECT * FROM Note ORDER BY rand() LIMIT 1;`,
        )
        const query = note[0].mbid

        var cover = await fetch(`http://coverartarchive.org/release-group/${query}`)
        var coverResult = await cover.json()
        await fetch(`http://musicbrainz.org/ws/2/release-group/${query}?inc=artist-credits`, {
            headers: {
            Accept: "application/json",
            },
        })
        .then((res) => res.json())
        .then((data) => {
            return res.status(200).json({data, user: note[0].user, description: note[0].description, image: coverResult.images[0].thumbnails[500]});
        });
        //return res.status(200).json(note, {success: true})
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
        console.error("Request error", err);
        res.status(500).json({ error: "Error creating question", success: false});
    }
}