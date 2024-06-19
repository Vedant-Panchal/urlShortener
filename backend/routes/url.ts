import express, { Request, Response } from "express";
import { handleGenerateNewShortUrl, running } from "../controllers/url";
const router = express.Router();

router.get("/", running).post("/new", handleGenerateNewShortUrl);

export default router;
