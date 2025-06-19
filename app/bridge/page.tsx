"use client"

import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useWallet } from "@/components/wallet-provider"
import { LiFiWidget, type WidgetConfig } from '@lifi/widget';

const SUPPORTED_TOKENS = [
	{
		address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
		chainId: 1,
		symbol: 'USDC',
		decimals: 6,
		name: 'USD Coin',
		priceUSD: '1',
		logoURI: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png'
	},
	{
		address: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
		chainId: 137,
		symbol: 'USDC',
		decimals: 6,
		name: 'USD Coin',
		priceUSD: '1',
		logoURI: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/polygon/assets/0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174/logo.png'
	},
	{
		address: '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8',
		chainId: 42161,
		symbol: 'USDC',
		decimals: 6,
		name: 'USD Coin',
		priceUSD: '1',
		logoURI: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/arbitrum/assets/0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8/logo.png'
	},
	{
		address: '0x7F5c764cBc14f9669B88837ca1490cCa17c31607',
		chainId: 10,
		symbol: 'USDC',
		decimals: 6,
		name: 'USD Coin',
		priceUSD: '1',
		logoURI: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/optimism/assets/0x7F5c764cBc14f9669B88837ca1490cCa17c31607/logo.png'
	}
];

export default function BridgePage() {
	const { address, isConnected } = useWallet();

	const widgetConfig: Partial<WidgetConfig> = {
		containerStyle: {
			border: 'none',
			width: '100%',
			minHeight: '600px',
		},
		appearance: 'dark',
		theme: {
			palette: {
				primary: {
					main: '#0ea5e9',
				},
				secondary: {
					main: '#0284c7',
				},
			},
		},
		chains: {
			allow: [1, 137, 42161, 10], // Ethereum, Polygon, Arbitrum, Optimism
		},
		tokens: {
			featured: SUPPORTED_TOKENS,
			include: SUPPORTED_TOKENS
		},
		bridges: {
			allow: ['cctp'], // Prioritize Circle's CCTP
		},
		requiredUI: ['slippage'],
		walletManagement: {
			connect: false,
			disconnect: false,
		},
		buildUrl: false,
		insurance: false,
	};

	return (
		<SidebarInset>
			<header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
				<SidebarTrigger className="-ml-1" />
				<Separator orientation="vertical" className="mr-2 h-4" />
				<h1 className="text-lg font-semibold">Bridge</h1>
			</header>
			<div className="flex flex-1 flex-col gap-4 p-4">
				<Card>
					<CardHeader>
						<CardTitle>Cross-Chain Bridge</CardTitle>
						<CardDescription>
							Transfer USDC across chains using Circle&apos;s CCTP
						</CardDescription>
					</CardHeader>
					<CardContent>
						{!isConnected ? (
							<div className="text-center py-8">
								Please connect your wallet to use the bridge
							</div>
						) : (
							<LiFiWidget
								integrator="ChainSwipe"
								config={widgetConfig}
							/>
						)}
					</CardContent>
				</Card>
			</div>
		</SidebarInset>
	);
}
