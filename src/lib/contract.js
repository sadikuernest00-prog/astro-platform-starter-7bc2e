import { ethers } from "ethers";

const CONTRACT_ADDRESS =
  "0xA8B54F5D962c3F7857e77F969873a14eDe5f2191";

const USDC_ADDRESS =
  "0x833589fcd6edb6e08f4c7c32d4f71b54bda02913";

const ABI = [

  "function createEscrow(address seller,uint256 amount)",

  "function depositUSDC(uint256 escrowId)",

  "function releaseFunds(uint256 escrowId)",

  "function openDispute(uint256 escrowId)",

  "function getEscrow(uint256 escrowId) view returns(uint256,address,address,uint256,uint8,uint256)"
];

const USDC_ABI = [

  "function approve(address spender,uint256 amount) returns(bool)"
];

export async function connectWallet() {

  if (!window.ethereum) {
    alert("Please install MetaMask");
    return;
  }

  await window.ethereum.request({
    method: "eth_requestAccounts",
  });

  const provider =
    new ethers.BrowserProvider(
      window.ethereum
    );

  const signer =
    await provider.getSigner();

  const address =
    await signer.getAddress();

  return address;
}

async function getContract() {

  const provider =
    new ethers.BrowserProvider(
      window.ethereum
    );

  const signer =
    await provider.getSigner();

  return new ethers.Contract(
    CONTRACT_ADDRESS,
    ABI,
    signer
  );
}

export async function createEscrow(
  seller,
  amount
) {

  try {

    const contract =
      await getContract();

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

    alert(
      "Escrow created successfully!"
    );

  } catch (error) {

    console.error(error);

    alert(
      "Create escrow failed"
    );
  }
}

export async function approveUSDC(
  amount
) {

  try {

    const provider =
      new ethers.BrowserProvider(
        window.ethereum
      );

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
        ethers.parseUnits(
          amount,
          6
        )
      );

    await tx.wait();

    alert(
      "USDC approved!"
    );

  } catch (error) {

    console.error(error);

    alert(
      "USDC approval failed"
    );
  }
}

export async function depositUSDC(
  escrowId
) {

  try {

    const contract =
      await getContract();

    const tx =
      await contract.depositUSDC(
        escrowId
      );

    await tx.wait();

    alert(
      "USDC deposited into escrow!"
    );

  } catch (error) {

    console.error(error);

    alert(
      "Deposit failed"
    );
  }
}

export async function releaseFunds(
  escrowId
) {

  try {

    const contract =
      await getContract();

    const tx =
      await contract.releaseFunds(
        escrowId
      );

    await tx.wait();

    alert(
      "Funds released!"
    );

  } catch (error) {

    console.error(error);

    alert(
      "Release failed"
    );
  }
}

export async function openDispute(
  escrowId
) {

  try {

    const contract =
      await getContract();

    const tx =
      await contract.openDispute(
        escrowId
      );

    await tx.wait();

    alert(
      "Dispute opened!"
    );

  } catch (error) {

    console.error(error);

    alert(
      "Dispute failed"
    );
  }
}
