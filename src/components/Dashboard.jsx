
import WalletConnect from "./WalletConnect";
import EscrowCard from "./EscrowCard";
import TransactionTable from "./TransactionTable";

export default function Dashboard() {
  const transactions = [
    {
      id: "1",
      amount: 5000,
      status: "locked",
    },
    {
      id: "2",
      amount: 12000,
      status: "released",
    },
  ];

  return (
    <div className="min-h-screen bg-black p-10">
      <h1 className="text-4xl text-white font-bold mb-8">
        Escrow Dashboard
      </h1>

      <WalletConnect />

      <div className="mt-8">
        <EscrowCard
          buyer="0xBuyer"
          seller="0xSeller"
          amount={5000}
          status="locked"
        />
      </div>

      <div className="mt-8">
        <TransactionTable
          transactions={transactions}
        />
      </div>
    </div>
  );
}
