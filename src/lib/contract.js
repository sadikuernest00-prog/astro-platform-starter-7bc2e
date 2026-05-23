import { ethers } from "ethers";

const CONTRACT_ADDRESS =
  "PASTE_NEW_CONTRACT";

const USDC_ADDRESS =
  "0x833589fCD6EDB6E08f4c7C32D4f71b54bdA02913";

const ABI = [
  "function createEscrow(address seller,uint256 amount)",
  "function depositUSDC(uint256 escrowId)",
  "function releaseFunds(uint256 escrowId)",
  "function openDispute(uint256 escrowId)",
  "function getEscrow(uint256 escrowId) view returns(uint256,address,address,uint256,uint8,uint256)"
];

const USDC_ABI = [
  "function approve(address spender,uint256 amount) public returns(bool)"
];

async function getProvider() {

  await window.ethereum.request({
    method: "eth_requestAccounts",
  });

  const provider =
    new ethers.BrowserProvider(
      window.ethereum
    );

  return provider;
}

export async function createEscrow(
  seller,
  amount
) {

  const provider =
    await getProvider();

  const signer =
    await provider.getSigner();

  const contract =
    new ethers.Contract(
      CONTRACT_ADDRESS,
      ABI,
      signer
    );

  const usdcAmount =
    ethers.parseUnits(
      amount,
      6
    );

  const tx =
    await contract.createEscrow(
      seller,
      usdcAmount
    );

  await tx.wait();

  alert("Escrow created");
}

export async function approveUSDC(
  amount
) {

  const provider =
    await getProvider();

  const signer =
    await provider.getSigner();

  const usdc =
    new ethers.Contract(
      USDC_ADDRESS,
      USDC_ABI,
      signer
    );

  const tx =
    await usdc.approve(
      CONTRACT_ADDRESS,
      ethers.parseUnits(amount, 6)
    );

  await tx.wait();

  alert("USDC approved");
}

export async function depositUSDC(
  escrowId
) {

  const provider =
    await getProvider();

  const signer =
    await provider.getSigner();

  const contract =
    new ethers.Contract(
      CONTRACT_ADDRESS,
      ABI,
      signer
    );

  const tx =
    await contract.depositUSDC(
      escrowId
    );

  await tx.wait();

  alert("USDC deposited");
}

export async function releaseFunds(
  escrowId
) {

  const provider =
    await getProvider();

  const signer =
    await provider.getSigner();

  const contract =
    new ethers.Contract(
      CONTRACT_ADDRESS,
      ABI,
      signer
    );

  const tx =
    await contract.releaseFunds(
      escrowId
    );

  await tx.wait();

  alert("Funds released");
}

export async function openDispute(
  escrowId
) {

  const provider =
    await getProvider();

  const signer =
    await provider.getSigner();

  const contract =
    new ethers.Contract(
      CONTRACT_ADDRESS,
      ABI,
      signer
    );

  const tx =
    await contract.openDispute(
      escrowId
    );

  await tx.wait();

  alert("Dispute opened");
}
