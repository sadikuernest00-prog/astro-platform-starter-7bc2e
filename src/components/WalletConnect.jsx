import { useState } from "react";

export default function WalletConnect() {
  const [wallet, setWallet] = useState("");

  async function connectWallet() {
    if (!window.ethereum) {
      alert("Install MetaMask");
      return;
    }

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    setWallet(accounts[0]);
  }

  return (
    <div className="p-4 bg-black text-white rounded-xl">
      {wallet ? (
        <div>
          Connected:
          <br />
          {wallet}
        </div>
      ) : (
        <button
          onClick={connectWallet}
          className="bg-green-500 px-4 py-2 rounded-lg"
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
}
