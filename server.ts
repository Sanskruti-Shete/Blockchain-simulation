import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { mempool } from "./scripts/mempool";
import { blockchain, createBlock, mineBlock } from "./scripts/mine-block";

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Get mempool
app.get("/mempool", (req: Request, res: Response) => {
  res.json(mempool);
});

// Get blockchain
app.get("/blocks", (req: Request, res: Response) => {
  res.json(blockchain);
});

// Mine a block
app.post("/mine", (req: Request, res: Response) => {
  const block = createBlock();
  mineBlock(block);
  res.json({ message: "Block mined successfully!", block });
});

app.listen(4000, () => console.log("Blockchain API running on http://localhost:4000"));
