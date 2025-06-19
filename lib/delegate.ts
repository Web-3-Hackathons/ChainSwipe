import { ethers } from 'ethers';

// Define EIP-712 domain type
const DOMAIN_TYPE = [
  { name: 'name', type: 'string' },
  { name: 'version', type: 'string' },
  { name: 'chainId', type: 'uint256' },
  { name: 'verifyingContract', type: 'address' },
];

// Define Permit type for token approvals
const PERMIT_TYPE = [
  { name: 'owner', type: 'address' },
  { name: 'spender', type: 'address' },
  { name: 'value', type: 'uint256' },
  { name: 'nonce', type: 'uint256' },
  { name: 'deadline', type: 'uint256' },
];

// Define Delegation type for gasless transactions
const DELEGATION_TYPE = [
  { name: 'delegator', type: 'address' },
  { name: 'delegatee', type: 'address' },
  { name: 'value', type: 'uint256' },
  { name: 'nonce', type: 'uint256' },
  { name: 'expiry', type: 'uint256' },
];

export interface DelegationConfig {
  chainId: number;
  contractAddress: string;
  delegatee: string;
}

export class DelegationManager {
  private domain: {
    name: string;
    version: string;
    chainId: number;
    verifyingContract: string;
  };

  constructor(config: DelegationConfig) {
    this.domain = {
      name: 'ChainSwipe Delegation',
      version: '1',
      chainId: config.chainId,
      verifyingContract: config.contractAddress,
    };
  }

  async createDelegation(
    signer: ethers.Signer,
    value: string,
    expiry: number = Math.floor(Date.now() / 1000) + 3600 // 1 hour from now
  ) {
    const delegator = await signer.getAddress();
    const nonce = await this.getNonce(delegator);

    const message = {
      delegator,
      delegatee: this.domain.verifyingContract,
      value,
      nonce,
      expiry,
    };

    const signature = await signer._signTypedData(
      this.domain,
      { Delegation: DELEGATION_TYPE },
      message
    );

    return {
      ...message,
      signature,
    };
  }

  async createPermit(
    signer: ethers.Signer,
    spender: string,
    value: string,
    deadline: number = Math.floor(Date.now() / 1000) + 3600 // 1 hour from now
  ) {
    const owner = await signer.getAddress();
    const nonce = await this.getNonce(owner);

    const message = {
      owner,
      spender,
      value,
      nonce,
      deadline,
    };

    const signature = await signer._signTypedData(
      this.domain,
      { Permit: PERMIT_TYPE },
      message
    );

    return {
      ...message,
      signature,
    };
  }

  private async getNonce(address: string): Promise<number> {
    // TODO: Implement nonce retrieval from smart contract
    return 0;
  }
}
