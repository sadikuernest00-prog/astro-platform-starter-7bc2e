import { useState } from "react";
import { ethers } from "ethers";

const ESCROW_ADDRESS =
  "0x46E3829422A899D61eb63F34A754ea67A06D3928";

const USDC_ADDRESS =
  "0x833589fCD6EDB6E08f4c7C32D4f71b54bdA02913";

const ESCROW_ABI = [

  "function createEscrow(address _seller,uint256 _amount,string memory _escrowReference) external",

  "function depositFunds(uint256 _escrowId) external",

  "function releaseFunds(uint256 _escrowId) external",

  "function refundBuyer(uint256 _escrowId) external"

];

const USDC_ABI = [
  "function approve(address spender,uint256 amount) external returns (bool)"
];

export default function App() {

  const [wallet, setWallet] = useState("");

  const [seller, setSeller] = useState("");

  const [amount, setAmount] = useState("");

  const [escrowId, setEscrowId] = useState("");

  const [escrows, setEscrows] = useState([]);

  async function connectWallet() {

    try {

      if (!window.ethereum) {
        alert("Install MetaMask");
        return;
      }

      const accounts =
        await window.ethereum.request({
          method: "eth_requestAccounts"
        });

      setWallet(accounts[0]);

    } catch (err) {
      console.error(err);
    }
  }

  async function getSigner() {

    const provider =
      new ethers.BrowserProvider(
        window.ethereum
      );

    return await provider.getSigner();
  }

  async function getEscrowContract() {

    const signer =
      await getSigner();

    return new ethers.Contract(
      ESCROW_ADDRESS,
      ESCROW_ABI,
      signer
    );
  }

  async function approveUSDC() {

    try {

      const signer =
        await getSigner();

      const usdc =
        new ethers.Contract(
          USDC_ADDRESS,
          USDC_ABI,
          signer
        );

      const usdcAmount =
        ethers.parseUnits(amount, 6);

      const tx =
        await usdc.approve(
          ESCROW_ADDRESS,
          usdcAmount
        );

      await tx.wait();

      alert("USDC Approved");

    } catch (err) {
      console.error(err);
      alert("Approval failed");
    }
  }

  async function createEscrow() {

    try {

      const contract =
        await getEscrowContract();

      const usdcAmount =
        ethers.parseUnits(amount, 6);

      const tx =
        await contract.createEscrow(
          seller,
          usdcAmount,
          escrowId
        );

      await tx.wait();

      const newEscrow = {
        id: escrowId,
        seller,
        amount,
        status: "AWAITING PAYMENT"
      };

      setEscrows([
        ...escrows,
        newEscrow
      ]);

      alert("Escrow created");

    } catch (err) {
      console.error(err);
      alert("Create escrow failed");
    }
  }

  async function depositFunds() {

    try {

      const contract =
        await getEscrowContract();

      const tx =
        await contract.depositFunds(
          escrowId
        );

      await tx.wait();

      const updated =
        escrows.map((e) =>
          e.id == escrowId
            ? {
                ...e,
                status: "FUNDED"
              }
            : e
        );

      setEscrows(updated);

      alert("Funds deposited");

    } catch (err) {
      console.error(err);
      alert("Deposit failed");
    }
  }

  async function releaseFunds() {

    try {

      const contract =
        await getEscrowContract();

      const tx =
        await contract.releaseFunds(
          escrowId
        );

      await tx.wait();

      const updated =
        escrows.map((e) =>
          e.id == escrowId
            ? {
                ...e,
                status: "RELEASED"
              }
            : e
        );

      setEscrows(updated);

      alert("Funds released");

    } catch (err) {
      console.error(err);
      alert("Release failed");
    }
  }

  async function refundBuyer() {

    try {

      const contract =
        await getEscrowContract();

      const tx =
        await contract.refundBuyer(
          escrowId
        );

      await tx.wait();

      const updated =
        escrows.map((e) =>
          e.id == escrowId
            ? {
                ...e,
                status: "REFUNDED"
              }
            : e
        );

      setEscrows(updated);

      alert("Buyer refunded");

    } catch (err) {
      console.error(err);
      alert("Refund failed");
    }
  }

  return (

    <div className="min-h-screen bg-black text-white flex flex-col items-center p-10">

      <h1 className="text-6xl font-bold text-center mb-6">
        Secure Escrow Infrastructure
      </h1>

      <p className="text-gray-400 mb-10 text-center">
        Blockchain escrow infrastructure powered by USDC
      </p>

      <div className="flex flex-col gap-4 w-full max-w-md">

        <input
          type="text"
          placeholder="Seller wallet address"
          value={seller}
          onChange={(e) =>
            setSeller(e.target.value)
          }
          className="p-4 rounded-xl bg-zinc-900 border border-zinc-700"
        />

        <input
          type="text"
          placeholder="Amount in USDC"
          value={amount}
          onChange={(e) =>
            setAmount(e.target.value)
          }
          className="p-4 rounded-xl bg-zinc-900 border border-zinc-700"
        />

        <input
          type="number"
          placeholder="Escrow ID"
          value={escrowId}
          onChange={(e) =>
            setEscrowId(e.target.value)
          }
          className="p-4 rounded-xl bg-zinc-900 border border-zinc-700"
        />

      </div>

      <div className="grid grid-cols-2 gap-4 mt-10">

        <button
          onClick={connectWallet}
          className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-4 rounded-xl font-bold"
        >
          Connect MetaMask
        </button>

        <button
          onClick={approveUSDC}
          className="bg-purple-600 hover:bg-purple-700 px-6 py-4 rounded-xl"
        >
          Approve USDC
        </button>

        <button
          onClick={createEscrow}
          className="bg-zinc-800 hover:bg-zinc-700 px-6 py-4 rounded-xl"
        >
          Create Escrow
        </button>

        <button
          onClick={depositFunds}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-4 rounded-xl"
        >
          Deposit USDC
        </button>

        <button
          onClick={releaseFunds}
          className="bg-green-600 hover:bg-green-700 px-6 py-4 rounded-xl"
        >
          Release Funds
        </button>

        <button
          onClick={refundBuyer}
          className="bg-red-600 hover:bg-red-700 px-6 py-4 rounded-xl"
        >
          Refund Buyer
        </button>

      </div>

      <div className="mt-16 w-full max-w-2xl">

        <h2 className="text-3xl font-bold mb-6">
          Active Escrows
        </h2>

        <div className="flex flex-col gap-4">

          {escrows.map((escrow, index) => (

            <div
              key={index}
              className="bg-zinc-900 border border-zinc-700 rounded-2xl p-6"
            >

              <div className="mb-2">
                <strong>ID:</strong> {escrow.id}
              </div>

              <div className="mb-2">
                <strong>Seller:</strong> {escrow.seller}
              </div>

              <div className="mb-2">
                <strong>Amount:</strong> {escrow.amount} USDC
              </div>

              <div>
                <strong>Status:</strong> {escrow.status}
              </div>

            </div>

          ))}

        </div>

      </div>

      <div className="mt-10 text-sm text-gray-500">
        Connected Wallet: {wallet}
      </div>

    </div>
  );
}
