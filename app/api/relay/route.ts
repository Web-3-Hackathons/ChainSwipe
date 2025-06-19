import { NextRequest, NextResponse } from 'next/server';
import { ethers } from 'ethers';

// TODO: Load these from environment variables
const RELAYER_PRIVATE_KEY = process.env.RELAYER_PRIVATE_KEY || '';
const RPC_URLS = {
  1: process.env.ETH_RPC_URL || 'https://eth.llamarpc.com',
  137: process.env.POLYGON_RPC_URL || 'https://polygon-rpc.com',
} as const;

export async function POST(req: NextRequest) {
  try {
    const { transaction, delegation, permit } = await req.json();

    // Validate the delegation signature
    // TODO: Implement signature validation

    // Get the appropriate provider based on the chain
    const chainId = delegation.chainId;
    const provider = new ethers.JsonRpcProvider(RPC_URLS[chainId as keyof typeof RPC_URLS]);
    
    // Initialize the relayer wallet
    const relayer = new ethers.Wallet(RELAYER_PRIVATE_KEY, provider);

    // Prepare the transaction
    const feeData = await provider.getFeeData();
    
    const tx = {
      to: transaction.to,
      data: transaction.data,
      value: ethers.parseUnits(transaction.value || '0', 'wei'),
      maxFeePerGas: feeData.maxFeePerGas,
      maxPriorityFeePerGas: feeData.maxPriorityFeePerGas,
      // We'll let the provider estimate the gas limit
    };

    // Send the transaction
    const txResponse = await relayer.sendTransaction(tx);
    
    // Wait for one confirmation
    const receipt = await txResponse.wait(1);
    
    if (!receipt) {
      throw new Error('Transaction failed');
    }

    return NextResponse.json({
      success: true,
      hash: receipt.hash,
      blockNumber: receipt.blockNumber,
      blockHash: receipt.blockHash,
    });
  } catch (error) {
    console.error('Error processing delegated transaction:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}
