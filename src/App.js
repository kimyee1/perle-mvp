import React, { useState } from "react";
import { contributors } from "./contributors";

const getTier = (score) => {
  if (score > 80) return { label: "Elite Expert", color: "bg-yellow-400" };
  if (score > 50) return { label: "Trusted Contributor", color: "bg-green-400" };
  return { label: "Rising Talent", color: "bg-blue-400" };
};

function ContributorCard({ contributor }) {
  const tier = getTier(contributor.score);

  return (
    <div className="p-4 m-2 bg-white shadow-lg rounded-xl hover:shadow-2xl transition-shadow duration-300">
      <div className="flex justify-between items-center mb-2">
        <h2 className="font-bold text-lg">{contributor.name}</h2>
        <span className={`px-3 py-1 rounded-full text-white font-semibold ${tier.color}`}>
          {tier.label}
        </span>
      </div>
      <p className="text-gray-600">Wallet: {contributor.wallet}</p>
      <p className="text-gray-600">Tasks: {contributor.tasks}</p>
      <p className="text-gray-600">Score: {contributor.score}</p>
      <div className="mt-2 w-full bg-gray-200 h-2 rounded-full">
        <div
          className={`h-2 rounded-full ${tier.color}`}
          style={{ width: `${Math.min(contributor.score, 100)}%` }}
        />
      </div>
    </div>
  );
}

function WalletInput() {
  const [wallet, setWallet] = useState("");
  const [info, setInfo] = useState(null);

  const handleSubmit = () => {
    const random = contributors[Math.floor(Math.random() * contributors.length)];
    setInfo(random);
  };

  return (
    <div className="p-4 mb-6">
      <input
        type="text"
        placeholder="Enter wallet"
        className="p-2 border rounded-l w-64 focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={wallet}
        onChange={(e) => setWallet(e.target.value)}
      />
      <button
        className="p-2 bg-blue-500 text-white rounded-r hover:bg-blue-600 transition-colors"
        onClick={handleSubmit}
      >
        Check Reputation
      </button>
      {info && <ContributorCard contributor={info} />}
    </div>
  );
}

function Leaderboard() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Top Contributors</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {contributors.map((c) => (
          <ContributorCard key={c.wallet} contributor={c} />
        ))}
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-purple-700">
        Perle Reputation Explorer
      </h1>
      <WalletInput />
      <Leaderboard />
    </div>
  );
}

export default App;