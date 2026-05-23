import { ethers } from "ethers";

export async function createEscrow(
  buyer,
  seller,
  amount
) {
  return {
    id: crypto.randomUUID(),
    buyer,
    seller,
    amount,
    status: "pending",
    createdAt: new Date(),
  };
}

export async function releaseEscrow(id) {
  return {
    success: true,
    escrowId: id,
  };
}
