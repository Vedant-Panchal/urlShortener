import { Request, Response } from "express";
import urlModel from "../models/url";
import { nanoid } from "nanoid";

export async function handleGenerateNewShortUrl(req: Request, res: Response) {
    const body = req.body;
    if (!body.URL) return res.status(400).json({ message: "URL is required" });
    const shortId: string = nanoid(10);
    await urlModel.create({
        shortId: shortId,
        originalUrl: req.body.URL,
        visitHistory: [],
    });

    return res.json({ id: shortId });
}
export async function running(req: Request, res: Response) {
    try {
        const urls = await urlModel.find({});
        let htmlResponse = '<html><body><ul>';

        urls.forEach(url => {
            htmlResponse += `<li>
            <div>Short Url : <a href="http://localhost:3000/${url.shortId}">http://localhost:3000/${url.shortId}</a></div>
            Original URL: ${url.originalUrl}
            <br>Visit History: ${url.visitHistory.map((visit: any) => visit.timestamp).join(' | ')}
          </li>`;
        });

        htmlResponse += '</ul></body></html>';
        res.send(htmlResponse);
    } catch (error) {
        res.status(500).send('Error fetching URLs: ' + error);
    }

}

export async function handleAnalytics(req: Request, res: Response) {
    try {
        const shortId = req.params.shortId;
        const url = await urlModel.findOne({ shortId });
        let htmlResponse = '';
            htmlResponse += `
            <li>
                <div>Short Url : <a href="http://localhost:3000/${url?.shortId}">http://localhost:3000/${url?.shortId}</a></div>
                <div>Original URL: ${url?.originalUrl}</div>
                <div>Visit History: ${url?.visitHistory.length}</div>
            </li>
            `

        htmlResponse = `<html>
            <body>
                <ul>
                    ${htmlResponse}
                </ul>   
            </body>
        </html>
        `
        res.send(htmlResponse);
    }
    catch (error) {
        res.status(500).send('Error fetching URLs: ' + error);
    }
}