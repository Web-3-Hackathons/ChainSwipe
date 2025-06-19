export interface CircleWallet {
  id: string;
  userId: string;
  address: string;
  balances: WalletBalance[];
  createdAt: string;
  updatedAt: string;
}

export interface WalletBalance {
  currency: string;
  amount: string;
  updateDate: string;
}

export interface WalletSet {
  id: string;
  entitySecretCiphertext: string;
  createdAt: string;
  updatedAt: string;
}

export interface OnRampResponse {
  id: string;
  walletId: string;
  status: string;
  redirectUrl?: string;
  createdAt: string;
  updatedAt: string;
}
