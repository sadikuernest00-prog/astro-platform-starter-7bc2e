
export default function TransactionTable({
  transactions,
}) {
  return (
    <table className="w-full text-white">
      <thead>
        <tr>
          <th>ID</th>
          <th>Amount</th>
          <th>Status</th>
        </tr>
      </thead>

      <tbody>
        {transactions.map((tx) => (
          <tr key={tx.id}>
            <td>{tx.id}</td>
            <td>${tx.amount}</td>
            <td>{tx.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
