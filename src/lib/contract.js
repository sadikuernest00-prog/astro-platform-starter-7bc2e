import { ethers } from "ethers";

export const CONTRACT_ADDRESS =
  "0xABD89d64ece71a87C6F3d20DE038930D8f99B02E";

export const CONTRACT_ABI = [
  "function createEscrow(address seller,uint256 amount)",
  "function deposit(uint256 escrowId)",
  "function releaseFunds(uint256 escrowId)",
  "function refundBuyer(uint256 escrowId)",
  "function openDispute(uint256 escrowId)",
  "function getEscrow(uint256 escrowId) view returns(tuple(uint256 id,address buyer,address seller,uint256 amount,uint8 state,bool exists))"
];

export async function getContract() {

  if (!window.ethereum) {
    alert("Install MetaMask");
    return;
  }

  await window.ethereum.request({
    method: "eth_requestAccounts",
  });

  const provider =
    new ethers.providers.Web3Provider(
      window.ethereum
    );

  const signer = provider.getSigner();

  return new ethers.Contract(
    CONTRACT_ADDRESS,
    CONTRACT_ABI,
    signer
  );
}
