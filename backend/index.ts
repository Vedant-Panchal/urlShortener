import express, { Express } from "express";
import dotenv from "dotenv";
import router from "./routes/url";
import connectMongo from "./connect";
import urlModel from "./models/url";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
const URL = process.env.URL;
console.log(URL);
if (!URL) {
    throw new Error("URL is not defined in the environment variables");
}
connectMongo(URL).then(() => console.log(`Mongo connected !!`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/url", router);

// app.get('/:shortId', async (req, res) => {
//   const shortId = req.params.shortId;
//   const data:any = await urlModel.findOneAndUpdate(
//     {
//       shortId
//     },
//     {
//       $push: {
//         visitHistory: {
//           timestamp: Date.now(),
//         }
//       }
//     })

//     res.redirect(data.originalUrl);
// })

app.listen(port, () =>
    console.log(`Server is running on http://localhost:${port}/api/v1/url`)
);
