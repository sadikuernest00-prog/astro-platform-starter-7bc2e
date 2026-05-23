
export default function EscrowCard({
  buyer,
  seller,
  amount,
  status,
}) {
  return (
    <div className="bg-zinc-900 text-white p-6 rounded-2xl">
      <h2 className="text-xl font-bold mb-4">
        Escrow Contract
      </h2>

      <div>Buyer: {buyer}</div>
      <div>Seller: {seller}</div>
      <div>Amount: ${amount}</div>

      <div className="mt-4">
        Status:
        <span className="text-green-400 ml-2">
          {status}
        </span>
      </div>
    </div>
  );
}
