import React, { useEffect, useState } from "react";
import axios from "axios";

interface Transaction {
  from: string;
  to: string;
  value: string;
  signature: string;
}

interface Block {
  index: number;
  timestamp: string;
  transactions: Transaction[];
  previousHash: string;
  hash: string;
}

export default function BlockchainViewer() {
  const [mempool, setMempool] = useState<Transaction[]>([]);
  const [blocks, setBlocks] = useState<Block[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const mem = await axios.get("http://localhost:4000/mempool");
      const blk = await axios.get("http://localhost:4000/blocks");
      setMempool(mem.data);
      setBlocks(blk.data);
    };
    fetchData();
    const interval = setInterval(fetchData, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>🧱 Blockchain Simulation</h1>

      <h2>Mempool</h2>
      <pre>{JSON.stringify(mempool, null, 2)}</pre>

      <h2>Mined Blocks</h2>
      {blocks.map((block, i) => (
        <div
          key={i}
          style={{
            background: "#f0f0f0",
            padding: "10px",
            margin: "10px 0",
            borderRadius: "10px",
          }}
        >
          <h3>Block #{block.index}</h3>
          <p><b>Hash:</b> {block.hash}</p>
          <p><b>Prev:</b> {block.previousHash}</p>
          <pre>{JSON.stringify(block.transactions, null, 2)}</pre>
        </div>
      ))}
    </div>
  );
}
