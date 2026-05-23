import { ethers } from "ethers";

export const ESCROW_ADDRESS =
  "0x314ED0AEDfe5Be6B62ec603EAeffD7Cbdcfec197";

/*
 BASE USDC CONTRACT
*/
export const USDC_ADDRESS =
  "0x833589fCD6EDB6E08f4c7C32D4f71b54bdA02913";

/*
 ESCROW CONTRACT ABI
*/
export const ESCROW_ABI = [
  "function createEscrow(address seller, uint256 amount) external",

  "function releaseFunds(uint256 escrowId) external",

  "function escrowCount() view returns (uint256)",

  "function escrows(uint256) view returns (uint256 id,address buyer,address seller,uint256 amount,uint8 state)"
];

/*
 ERC20 / USDC ABI
*/
export const ERC20_ABI = [
  "function approve(address spender, uint256 amount) external returns (bool)",

  "function allowance(address owner, address spender) view returns (uint256)",

  "function balanceOf(address account) view returns (uint256)",

  "function decimals() view returns (uint8)"
];

/*
 CONNECT WALLET
*/
export async function connectWallet() {

  if (!window.ethereum) {
    alert("Please install MetaMask");
    return null;
  }

  const provider =
    new ethers.BrowserProvider(
      window.ethereum
    );

  await provider.send(
    "eth_requestAccounts",
    []
  );

  const signer =
    await provider.getSigner();

  const address =
    await signer.getAddress();

  console.log(
    "CONNECTED:",
    address
  );

  return {
    provider,
    signer,
    address
  };
}

/*
 GET ESCROW CONTRACT
*/
export async function getEscrowContract() {

  const { signer } =
    await connectWallet();

  return new ethers.Contract(
    ESCROW_ADDRESS,
    ESCROW_ABI,
    signer
  );
}

/*
 GET USDC CONTRACT
*/
export async function getUSDCContract() {

  const { signer } =
    await connectWallet();

  return new ethers.Contract(
    USDC_ADDRESS,
    ERC20_ABI,
    signer
  );
}

/*
 APPROVE USDC
*/
export async function approveUSDC(
  amount
) {

  try {

    const usdc =
      await getUSDCContract();

    const parsedAmount =
      ethers.parseUnits(
        amount.toString(),
        6
      );

    const tx =
      await usdc.approve(
        ESCROW_ADDRESS,
        parsedAmount
      );

    await tx.wait();

    console.log(
      "USDC APPROVED"
    );

    return tx;

  } catch (error) {

    console.error(error);

    throw error;
  }
}

/*
 CREATE ESCROW
*/
export async function createEscrow(
  seller,
  amount
) {

  try {

    const escrow =
      await getEscrowContract();

    const parsedAmount =
      ethers.parseUnits(
        amount.toString(),
        6
      );

    const tx =
      await escrow.createEscrow(
        seller,
        parsedAmount
      );

    await tx.wait();

    console.log(
      "ESCROW CREATED"
    );

    return tx;

  } catch (error) {

    console.error(error);

    throw error;
  }
}

/*
 RELEASE FUNDS
*/
export async function releaseFunds(
  escrowId
) {

  try {

    const escrow =
      await getEscrowContract();

    const tx =
      await escrow.releaseFunds(
        escrowId
      );

    await tx.wait();

    console.log(
      "FUNDS RELEASED"
    );

    return tx;

  } catch (error) {

    console.error(error);

    throw error;
  }
}
