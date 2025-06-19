import { CIRCLE_CONFIG } from '@/config/circle';
import type { CircleWallet, WalletSet, WalletBalance, OnRampResponse } from '@/types/circle';

const CIRCLE_API_BASE = CIRCLE_CONFIG.env === 'sandbox' 
  ? 'https://api-sandbox.circle.com' 
  : 'https://api.circle.com';

class CircleService {
  private static instance: CircleService;
  private accessToken: string | null = null;

  private constructor() {}

  public static getInstance(): CircleService {
    if (!CircleService.instance) {
      CircleService.instance = new CircleService();
    }
    return CircleService.instance;
  }

  private async fetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const headers = {
      'Authorization': `Bearer ${CIRCLE_CONFIG.apiKey}`,
      'Content-Type': 'application/json',
      ...options.headers,
    };

    const response = await fetch(`${CIRCLE_API_BASE}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || 'Circle API request failed');
    }

    return response.json();
  }

  async createWalletSet(): Promise<WalletSet> {
    return this.fetch<WalletSet>('/v1/w3s/developer/walletSets', {
      method: 'POST',
      body: JSON.stringify({
        entitySecretCiphertext: CIRCLE_CONFIG.secretKey,
        blockchains: ['ETH', 'MATIC', 'AVAX'],
      }),
    });
  }

  async createUserWallet(userId: string, walletSetId: string): Promise<CircleWallet> {
    return this.fetch<CircleWallet>('/v1/w3s/user/wallets', {
      method: 'POST',
      body: JSON.stringify({
        userId,
        walletSetId,
        blockchains: ['ETH', 'MATIC', 'AVAX'],
        metadata: {
          application: 'ChainSwipe',
          environment: CIRCLE_CONFIG.env,
        },
      }),
    });
  }

  async getWalletBalance(walletId: string): Promise<WalletBalance[]> {
    const response = await this.fetch<{ data: { balances: WalletBalance[] } }>(
      `/v1/w3s/wallets/${walletId}/balances`
    );
    return response.data.balances;
  }

  async createOnRamp(
    walletId: string,
    amount: string,
    currency: string = 'USD'
  ): Promise<OnRampResponse> {
    return this.fetch<OnRampResponse>('/v1/w3s/user/onramps', {
      method: 'POST',
      body: JSON.stringify({
        walletId,
        amount: {
          amount,
          currency,
        },
        metadata: {
          application: 'ChainSwipe',
          environment: CIRCLE_CONFIG.env,
        },
      }),
    });
  }

  async transferToExternalWallet(
    sourceWalletId: string,
    destinationAddress: string,
    amount: string,
    tokenId: string
  ) {
    return this.fetch<{ id: string; status: string }>('/v1/w3s/user/transactions', {
      method: 'POST',
      body: JSON.stringify({
        sourceWalletId,
        destination: {
          address: destinationAddress,
          chain: tokenId.startsWith('ETH') ? 'ETH' : 'MATIC',
        },
        amounts: [{
          amount,
          currency: tokenId,
        }],
        metadata: {
          application: 'ChainSwipe',
          environment: CIRCLE_CONFIG.env,
        },
      }),
    });
  }

  async getUserToken(userId: string): Promise<string> {
    try {
      if (!this.accessToken) {
        const response = await this.fetch<{ token: string }>('/v1/w3s/users/token', {
          method: 'POST',
          body: JSON.stringify({ userId }),
        });
        this.accessToken = response.token;
      }

      if (!this.accessToken) {
        throw new Error('Failed to get access token');
      }

      return this.accessToken;
    } catch (error) {
      console.error('Error getting access token:', error);
      throw error;
    }
  }
}

export const circleService = CircleService.getInstance();
