export const CIRCLE_CONFIG = {
  appId: process.env.NEXT_PUBLIC_CIRCLE_APP_ID || '',
  apiKey: process.env.CIRCLE_API_KEY || '',
  secretKey: process.env.CIRCLE_SECRET_KEY || '',
  env: 'sandbox' as const, // or 'production' for mainnet
};

export const SUPPORTED_FIAT_CURRENCIES = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
] as const;

export type FiatCurrency = typeof SUPPORTED_FIAT_CURRENCIES[number]['code'];

export interface OnRampConfig {
  amount: string;
  currency: FiatCurrency;
  returnUrl: string;
  walletAddress: string;
}

export interface UserKYCData {
  firstName: string;
  lastName: string;
  email: string;
  address1: string;
  city: string;
  district: string;
  postalCode: string;
  country: string;
  dob: string;
}
