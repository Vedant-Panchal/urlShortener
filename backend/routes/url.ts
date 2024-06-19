import express, { Request, Response } from "express";
import { handleAnalytics, handleGenerateNewShortUrl, running } from "../controllers/url";
const router = express.Router();

router.get("/", running).get("/analytics/:shortId",handleAnalytics).post("/new", handleGenerateNewShortUrl);

export default router;
