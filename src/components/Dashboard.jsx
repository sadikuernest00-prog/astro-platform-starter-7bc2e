import { useState } from "react";

import {
  connectWallet,
  approveUSDC,
  createEscrow,
  releaseFunds
} from "../lib/contract";

export default function Dashboard() {

  const [wallet, setWallet] =
    useState("");

  const [seller, setSeller] =
    useState("");

  const [amount, setAmount] =
    useState("");

  const [escrowId, setEscrowId] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  /*
   CONNECT WALLET
  */
  async function handleConnect() {

    try {

      const data =
        await connectWallet();

      setWallet(data.address);

    } catch (error) {

      console.error(error);

      alert(
        "Wallet connection failed"
      );
    }
  }

  /*
   APPROVE USDC
  */
  async function handleApprove() {

    try {

      setLoading(true);

      await approveUSDC(amount);

      alert(
        "USDC Approved"
      );

    } catch (error) {

      console.error(error);

      alert(
        "Approval Failed"
      );

    } finally {

      setLoading(false);
    }
  }

  /*
   CREATE ESCROW
  */
  async function handleCreateEscrow() {

    try {

      setLoading(true);

      await createEscrow(
        seller,
        amount
      );

      alert(
        "Escrow Created"
      );

    } catch (error) {

      console.error(error);

      alert(
        "Escrow Creation Failed"
      );

    } finally {

      setLoading(false);
    }
  }

  /*
   RELEASE FUNDS
  */
  async function handleRelease() {

    try {

      setLoading(true);

      await releaseFunds(
        escrowId
      );

      alert(
        "Funds Released"
      );

    } catch (error) {

      console.error(error);

      alert(
        "Release Failed"
      );

    } finally {

      setLoading(false);
    }
  }

  return (

    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">

      <h1 className="text-6xl font-bold text-center max-w-5xl leading-tight">

        Secure Escrow Infrastructure For

        <span className="text-yellow-500">
          {" "}International Trade
        </span>

      </h1>

      <p className="text-zinc-400 text-center mt-8 max-w-3xl text-xl">

        AmicBridge provides blockchain escrow
        infrastructure powered by USDC,
        smart contracts and decentralized
        settlement technology.

      </p>

      {/* INPUTS */}

      <div className="mt-16 flex flex-col gap-6 w-full max-w-xl">

        <input
          type="text"
          placeholder="Seller wallet address"
          value={seller}
          onChange={(e) =>
            setSeller(e.target.value)
          }
          className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 text-lg"
        />

        <input
          type="text"
          placeholder="Amount in USDC"
          value={amount}
          onChange={(e) =>
            setAmount(e.target.value)
          }
          className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 text-lg"
        />

        <input
          type="text"
          placeholder="Escrow ID"
          value={escrowId}
          onChange={(e) =>
            setEscrowId(e.target.value)
          }
          className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 text-lg"
        />

      </div>

      {/* BUTTONS */}

      <div className="flex flex-wrap gap-4 mt-12 justify-center">

        <button
          onClick={handleConnect}
          className="bg-yellow-500 text-black px-8 py-4 rounded-2xl text-xl font-bold"
        >
          {wallet
            ? "Wallet Connected"
            : "Connect MetaMask"}
        </button>

        <button
          onClick={handleCreateEscrow}
          className="bg-zinc-900 border border-zinc-700 px-8 py-4 rounded-2xl text-xl"
        >
          Create Escrow
        </button>

        <button
          onClick={handleApprove}
          className="bg-zinc-900 border border-zinc-700 px-8 py-4 rounded-2xl text-xl"
        >
          Approve USDC
        </button>

        <button
          onClick={handleRelease}
          className="bg-zinc-900 border border-zinc-700 px-8 py-4 rounded-2xl text-xl"
        >
          Release Funds
        </button>

      </div>

      {/* STATUS */}

      <div className="mt-12 text-emerald-400 text-2xl">

        {loading
          ? "Processing blockchain transaction..."
          : wallet
          ? `Connected: ${wallet}`
          : "Waiting for wallet connection..."}

      </div>

    </div>
  );
}
