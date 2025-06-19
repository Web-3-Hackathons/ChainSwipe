"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { MetaMaskSDK } from '@metamask/sdk';
import { CHAIN_IDS, SUPPORTED_CHAINS, SUPPORTED_TOKENS } from "@/config/wallet";
import { circleService } from "@/lib/circle";
import { ethers } from "ethers";
import type { CircleWallet } from "@/types/circle";

type ChainId = typeof CHAIN_IDS[number];
type WalletType = 'metamask' | 'circle' | 'none';

interface WalletContextType {
  isConnected: boolean;
  address: string | null;
  chainId: ChainId | null;
  balance: string;
  walletType: WalletType;
  circleWallet: CircleWallet | null;
  connect: (type: Exclude<WalletType, 'none'>) => Promise<void>;
  disconnect: () => void;
  switchNetwork: (chainId: ChainId) => Promise<void>;
  getTokenBalance: (tokenAddress: string) => Promise<string>;
  sendTransaction: (transaction: {
    to: string;
    value?: string;
    data?: string;
  }, options?: {
    gasless?: boolean;
  }) => Promise<{ hash: string }>;
  onRamp: (amount: string, currency?: string) => Promise<void>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

// Initialize MetaMask SDK
let MMSDK: MetaMaskSDK | null = null;

async function initializeMetaMask() {
  if (typeof window === 'undefined') return null;
  
  if (!MMSDK) {
    MMSDK = new MetaMaskSDK({
      dappMetadata: {
        name: "ChainSwipe",
        url: window.location.origin,
        iconUrl: `${window.location.origin}/placeholder-logo.svg`,
      },
      checkInstallationImmediately: false,
      useDeeplink: false,
      preferDesktop: true,
      injectProvider: true
    });
    
    // Wait for SDK to be ready
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  
  return MMSDK;
}

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [chainId, setChainId] = useState<ChainId | null>(null);
  const [balance, setBalance] = useState("0.00");
  const [walletType, setWalletType] = useState<WalletType>('none');
  const [circleWallet, setCircleWallet] = useState<CircleWallet | null>(null);

  const updateBalance = async (addr: string) => {
    if (!addr) return;
    const sdk = await initializeMetaMask();
    if (!sdk) return;
    const ethereum = sdk.getProvider();
    if (!ethereum) return;

    try {
      const balance = await ethereum.request<string>({
        method: 'eth_getBalance',
        params: [addr, 'latest']
      });

      if (balance) {
        const balanceInWei = BigInt(balance);
        const balanceInEth = Number(balanceInWei) / 1e18;
        setBalance(balanceInEth.toFixed(4));
      }
    } catch (error) {
      console.error('Error fetching balance:', error);
    }
  };

  const updateChainId = async () => {
    const sdk = await initializeMetaMask();
    if (!sdk) return;
    const ethereum = sdk.getProvider();
    if (!ethereum) return;

    try {
      const chainId = await ethereum.request<string>({
        method: 'eth_chainId'
      });

      if (chainId) {
        const chainIdNumber = parseInt(chainId, 16);
        if (CHAIN_IDS.includes(chainIdNumber as ChainId)) {
          setChainId(chainIdNumber as ChainId);
        }
      }
    } catch (error) {
      console.error('Error fetching chainId:', error);
    }
  };

  const connect = async (type: Exclude<WalletType, 'none'>) => {
    // Clear any previous disconnect state
    localStorage.removeItem('wallet_disconnected');

    if (type === 'metamask') {
      try {
        const sdk = await initializeMetaMask();
        if (!sdk) {
          console.error('MetaMask SDK not initialized');
          throw new Error('MetaMask SDK not initialized. This app requires a web browser.');
        }
        
        const ethereum = sdk.getProvider();
        if (!ethereum) {
          console.error('MetaMask provider not found');
          throw new Error('Please install MetaMask to continue');
        }

        // Make sure to wait for the provider to be ready
        await new Promise((resolve) => setTimeout(resolve, 100));

        // Request accounts and handle the promise properly
        const accounts = await ethereum.request<string[]>({
          method: 'eth_requestAccounts'
        }).catch((err) => {
          console.error('User rejected the connection:', err);
          throw new Error('Please connect your MetaMask wallet');
        });
        
        if (accounts && accounts[0]) {
          setAddress(accounts[0]);
          setIsConnected(true);
          setWalletType('metamask');
          await updateChainId();
          await updateBalance(accounts[0]);
        }
      } catch (error) {
        console.error('Error connecting to MetaMask:', error);
        throw error;
      }
    } else if (type === 'circle') {
      try {
        // Generate a unique user ID (in production, this should come from your auth system)
        const userId = `user_${Date.now()}`;
        
        // Create a wallet set
        const walletSet = await circleService.createWalletSet();
        
        // Create a user wallet
        const wallet = await circleService.createUserWallet(userId, walletSet.id);
        
        setCircleWallet(wallet);
        setAddress(wallet.address);
        setIsConnected(true);
        setWalletType('circle');
        
        // Set initial chain ID (Circle wallet starts on Ethereum)
        setChainId(1);

        // Get initial balance
        const balances = await circleService.getWalletBalance(wallet.id);
        const ethBalance = balances.find(b => b.currency === 'ETH')?.amount || '0';
        setBalance(ethers.formatEther(ethBalance));
      } catch (error) {
        console.error('Error connecting Circle wallet:', error);
        throw error;
      }
    }
  };

  const disconnect = async () => {
    if (walletType === 'metamask') {
      try {
        const sdk = await initializeMetaMask();
        if (sdk) {
          const ethereum = sdk.getProvider();
          if (ethereum) {
            // Force disconnect by clearing permissions
            await ethereum.request({
              method: 'wallet_revokePermissions',
              params: [{ eth_accounts: {} }]
            }).catch(console.error);

            // Clear auto-reconnect state in MetaMask
            if (ethereum.removeAllListeners) {
              ethereum.removeAllListeners('accountsChanged');
              ethereum.removeAllListeners('chainChanged');
              ethereum.removeAllListeners('connect');
              ethereum.removeAllListeners('disconnect');
            }
          }
        }
      } catch (error) {
        console.error('Error disconnecting from MetaMask:', error);
      }
    }

    // Clear all local state
    MMSDK = null; // Reset SDK instance
    setIsConnected(false);
    setAddress(null);
    setChainId(null);
    setBalance("0.00");
    setWalletType('none');
    setCircleWallet(null);

    // Remove any stored connection data and set disconnect flag
    try {
      localStorage.setItem('wallet_disconnected', 'true');
      localStorage.removeItem('walletconnect');
      localStorage.removeItem('metamask.connected');
      localStorage.removeItem('MMSDK:connected');
    } catch (e) {
      console.error('Error updating local storage:', e);
    }
    
    if (walletType === 'circle') {
      setIsConnected(false);
      setAddress(null);
      setChainId(null);
      setBalance("0.00");
      setWalletType('none');
      setCircleWallet(null);
    }
  };

  const switchNetwork = async (targetChainId: ChainId) => {
    const sdk = await initializeMetaMask();
    if (!sdk) throw new Error('MetaMask not initialized');
    const ethereum = sdk.getProvider();
    if (!ethereum) throw new Error('MetaMask not available');

    try {
      await ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${targetChainId.toString(16)}` }],
      });
      await updateChainId();
      if (address) {
        await updateBalance(address);
      }
    } catch (switchError: any) {
      // This error code indicates that the chain has not been added to MetaMask.
      if (switchError.code === 4902) {
        const chain = Object.values(SUPPORTED_CHAINS).find(c => c.id === targetChainId);
        if (!chain) throw new Error('Unsupported chain');

        try {
          await ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: `0x${targetChainId.toString(16)}`,
                chainName: chain.name,
                nativeCurrency: chain.nativeCurrency,
                rpcUrls: chain.rpcUrls,
                blockExplorerUrls: [chain.blockExplorers.default.url],
              },
            ],
          });
          await updateChainId();
          if (address) {
            await updateBalance(address);
          }
        } catch (addError) {
          console.error('Error adding chain:', addError);
          throw addError;
        }
      }
      console.error('Error switching chain:', switchError);
      throw switchError;
    }
  };

  const getTokenBalance = async (tokenAddress: string): Promise<string> => {
    const sdk = await initializeMetaMask();
    if (!sdk) return "0";
    const ethereum = sdk.getProvider();
    if (!ethereum || !address) return "0";

    try {
      // ERC20 balanceOf function signature
      const data = `0x70a08231000000000000000000000000${address.slice(2)}`;
      
      const balance = await ethereum.request<string>({
        method: 'eth_call',
        params: [
          {
            to: tokenAddress,
            data,
          },
          'latest',
        ],
      });

      if (balance) {
        const tokenDecimals = Object.values(SUPPORTED_TOKENS.USDC).find(
          token => token.address.toLowerCase() === tokenAddress.toLowerCase()
        )?.decimals || 18;

        const balanceInWei = BigInt(balance);
        const balanceFormatted = Number(balanceInWei) / Math.pow(10, tokenDecimals);
        return balanceFormatted.toFixed(tokenDecimals);
      }
      return "0";
    } catch (error) {
      console.error('Error fetching token balance:', error);
      return "0";
    }
  };

  const sendTransaction = async (
    transaction: {
      to: string;
      value?: string;
      data?: string;
    },
    options?: {
      gasless?: boolean;
    }
  ): Promise<{ hash: string }> => {
    if (!address) throw new Error('Wallet not connected');

    if (walletType === 'circle' && circleWallet) {
      // Use Circle's transaction API
      const response = await circleService.transferToExternalWallet(
        circleWallet.id,
        transaction.to,
        transaction.value || '0',
        'ETH' // TODO: Support other tokens
      );
      return { hash: response.id };
    } else {
      // Use MetaMask for transaction
      const ethereum = MMSDK.getProvider();
      if (!ethereum) throw new Error('MetaMask not available');

      try {
        const txHash = await ethereum.request<string>({
          method: 'eth_sendTransaction',
          params: [{
            from: address,
            to: transaction.to,
            value: transaction.value ? `0x${BigInt(transaction.value).toString(16)}` : undefined,
            data: transaction.data,
          }],
        });

        if (!txHash) {
          throw new Error('Transaction failed');
        }

        return { hash: txHash };
      } catch (error) {
        console.error('Error sending transaction:', error);
        throw error;
      }
    }
  };

  const onRamp = async (amount: string, currency: string = 'USD') => {
    if (!address) throw new Error('Wallet not connected');

    if (walletType === 'circle' && circleWallet) {
      try {
        const response = await circleService.createOnRamp(
          circleWallet.id,
          amount,
          currency
        );
        
        if (response.redirectUrl) {
          window.location.href = response.redirectUrl;
        }
      } catch (error) {
        console.error('Error creating on-ramp:', error);
        throw error;
      }
    } else {
      // For MetaMask users, we can integrate with other on-ramp providers
      // or suggest using Circle Wallet
      throw new Error('On-ramp is only available with Circle Wallet');
    }
  };

  // Listen for account changes
  useEffect(() => {
    let isSubscribed = true;

    // Check if user has explicitly disconnected
    const hasDisconnected = localStorage.getItem('wallet_disconnected') === 'true';
    if (hasDisconnected) {
      return;
    }

    async function setupListeners() {
      const sdk = await initializeMetaMask();
      if (!sdk || !isSubscribed) return;
      const ethereum = sdk.getProvider();
      if (!ethereum) return;

      const handleAccountsChanged = (accounts: unknown) => {
        const addressList = accounts as string[];
        if (!Array.isArray(addressList) || addressList.length === 0) {
          // User disconnected their wallet
          disconnect();
        } else if (addressList[0] !== address) {
          // Account changed
          setAddress(addressList[0]);
          updateBalance(addressList[0]);
        }
      };

      const handleChainChanged = (chainId: unknown) => {
        const chainIdHex = chainId as string;
        const chainIdNumber = parseInt(chainIdHex, 16);
        if (CHAIN_IDS.includes(chainIdNumber as ChainId)) {
          setChainId(chainIdNumber as ChainId);
        }
      };

      const handleConnect = () => {
        console.log('MetaMask connected');
      };

      const handleDisconnect = () => {
        disconnect();
      };

      ethereum.on('accountsChanged', handleAccountsChanged);
      ethereum.on('chainChanged', handleChainChanged);
      ethereum.on('connect', handleConnect);
      ethereum.on('disconnect', handleDisconnect);

      // Check if already connected
      try {
        const accounts = await ethereum.request<string[]>({ method: 'eth_accounts' });
        if (accounts && accounts.length > 0 && accounts[0]) {
          const currentAddress = accounts[0];
          setAddress(currentAddress);
          setIsConnected(true);
          setWalletType('metamask');
          await updateChainId();
          await updateBalance(currentAddress);
        }
      } catch (error) {
        console.error('Error checking accounts:', error);
      }

      return () => {
        if (ethereum) {
          ethereum.removeListener('accountsChanged', handleAccountsChanged);
          ethereum.removeListener('chainChanged', handleChainChanged);
          ethereum.removeListener('connect', handleConnect);
          ethereum.removeListener('disconnect', handleDisconnect);
        }
      };
    }

    setupListeners();

    return () => {
      isSubscribed = false;
    };
  }, [address]);

  return (
    <WalletContext.Provider 
      value={{ 
        isConnected, 
        address, 
        chainId,
        balance, 
        walletType,
        circleWallet,
        connect, 
        disconnect,
        switchNetwork,
        getTokenBalance,
        sendTransaction,
        onRamp,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
}
