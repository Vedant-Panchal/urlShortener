import { Request, Response } from 'express';
import urlModel from '../models/url';
import { nanoid } from 'nanoid';


export async function handleGenerateNewShortUrl(req: Request, res: Response) {
    const body = req.body;
    if (!body.originalUrl) return res.status(400).json({ message: 'URL is required' });
    const shortId: string = nanoid(10);
    await urlModel.create({
        shortId: shortId,
        originalUrl: req.body.originalUrl,
        visitHistory: [],
    })

    return res.json({ id: shortId });
}
export function running(req: Request, res: Response){
    res.send("Server is running");
}

