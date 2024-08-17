import { Account } from '@/types';
import React, { useEffect, useState } from 'react'
import useLocalStorage from 'use-local-storage';
import { Button } from './ui/button';
import { useToast } from './ui/use-toast';
import SolanaLogo from '@/public/assets/solana-sol-logo.png';
import EthereumLogo from '@/public/assets/ethereum-original.svg';
import Image from 'next/image';
import { PublicKey, Connection } from '@solana/web3.js';
import axios from 'axios';
import { CopyCheckIcon, CopyIcon } from 'lucide-react';

interface AccountInfoProps {
    selectedAccountIndex: number;
}

function AccountInfo({ selectedAccountIndex }: AccountInfoProps) {
    const [solanaBalance, setSolanaBalance] = useState(0);
    const [ethereumBalance, setEthereumBalance] = useState(0);
    const [solanaPrice, setSolanaPrice] = useState(0);
    const [ethereumPrice, setEthereumPrice] = useState(0);
    const [accounts, setAccounts] = useLocalStorage<Account[]>('accounts', []);
    const { toast } = useToast();

    useEffect(() => {
        getSolanaBalance(accounts[selectedAccountIndex].solana.publicKey)
            .then(balance => setSolanaBalance(balance))
            .catch(error => console.error('Failed to get balance:', error));
    }, [selectedAccountIndex, accounts]);

    useEffect(() => {
        getEthereumBalance(accounts[selectedAccountIndex].ethereum.address)
            .then(balance => setEthereumBalance(balance))
            .catch(error => console.error('Failed to get Ethereum balance:', error));
    }, [selectedAccountIndex, accounts]);

    useEffect(() => {
        // Fetch cryptocurrency prices
        const fetchPrices = async () => {
            try {
                const response = await axios.get(
                    'https://api.coingecko.com/api/v3/simple/price?ids=solana,ethereum&vs_currencies=usd'
                );
                console.log(response)
                setSolanaPrice(response.data.solana.usd);
                setEthereumPrice(response.data.ethereum.usd);
            } catch (error) {
                console.error('Error fetching cryptocurrency prices:', error);
            }
        };

        fetchPrices();

        const intervalId = setInterval(fetchPrices, 600000);

        return () => clearInterval(intervalId);
    }, []);

    if (accounts.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-screen w-full">
                <div className="text-center p-8 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-4">No Accounts Found</h2>
                    <p className="mb-6">It looks like you haven&apos;t created any accounts yet.</p>
                    <Button
                        variant={'destructive'}
                        className="px-4 py-2 transition duration-300"
                        onClick={() => {
                            toast({
                                title: "No Accounts Found",
                                description: "Side bar se click kr do na bhai... PLz",
                                variant: "destructive",
                            });
                        }}
                    >
                        Create Your First Account
                    </Button>
                </div>
            </div>
        );
    }

    const copyToClipboardHandler = (text: string) => {
        navigator.clipboard.writeText(text);
        toast({
            title: "Copied to clipboard",
            description: "Address copied to clipboard",
            variant: "default",
        });
    }

    return (
        <div className="p-8 w-full">
            <h2 className="text-2xl font-bold mb-6">Account Info</h2>

            <div className="bg-neutral-900 rounded-lg p-6 mb-6">
                <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-white">Total Balance</h3>
                    <p className="text-gray-300 text-2xl font-bold">
                        ${(solanaBalance * solanaPrice + ethereumBalance * ethereumPrice).toFixed(2)}
                    </p>
                </div>
                <div className="flex justify-between mt-4">
                    <p className="text-gray-400">
                        {solanaBalance} SOL
                    </p>
                    <p className="text-gray-400">
                        {ethereumBalance} ETH
                    </p>
                </div>
            </div>

            <div className="flex flex-col bg-neutral-900 rounded-lg p-6 gap-4">
                <div className="bg-neutral-950 rounded-lg p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <Image src={EthereumLogo} alt="Ethereum Logo" className="w-8 h-8 mr-4" />
                            <h3 className="text-xl font-semibold">Ethereum</h3>
                        </div>
                        <div className="flex items-center gap-2">
                            <p className="text-gray-300 break-all">
                                {accounts[selectedAccountIndex].ethereum.address}
                            </p>
                            <button onClick={() => copyToClipboardHandler(accounts[selectedAccountIndex].ethereum.address)} className="text-gray-400 hover:text-white">
                                <CopyIcon className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                        <p className="text-gray-400">
                            {ethereumBalance} ETH
                        </p>
                        <p className="text-gray-400">
                            {ethereumPrice * ethereumBalance} USD
                        </p>
                    </div>
                </div>
                <div className="bg-neutral-950 rounded-lg p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <Image src={SolanaLogo} alt="Solana Logo" className="w-8 h-8 mr-4" />
                            <h3 className="text-xl font-semibold">Solana</h3>
                        </div>
                        <div className="flex items-center gap-2">
                            <p className="text-gray-300 break-all">
                                {accounts[selectedAccountIndex].solana.publicKey}
                            </p>
                            <button onClick={() => copyToClipboardHandler(accounts[selectedAccountIndex].solana.publicKey)} className="text-gray-400 hover:text-white">
                                <CopyIcon className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                        <p className="text-gray-400">
                            {solanaBalance} SOL
                        </p>
                        <p className="text-gray-400">
                            {solanaPrice * solanaBalance} USD
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}



async function getSolanaBalance(address: string): Promise<number> {
    const ALCHEMY_URL = 'https://solana-mainnet.g.alchemy.com/v2/OVmCdnIihXUBy0dBmBaqfL4_v5VjAorc';

    const data = {
        jsonrpc: '2.0',
        id: 1,
        method: 'getBalance',
        params: [address]
    };

    try {
        const response = await axios.post(ALCHEMY_URL, data);
        const balanceInLamports = response.data.result.value;
        return balanceInLamports / 1e9; // Convert lamports to SOL
    } catch (error) {
        console.error('Error fetching Solana balance:', error);
        throw error;
    }
}

async function getEthereumBalance(address: string): Promise<number> {
    const ALCHEMY_URL = 'https://eth-mainnet.g.alchemy.com/v2/OVmCdnIihXUBy0dBmBaqfL4_v5VjAorc';

    const data = {
        jsonrpc: '2.0',
        id: 1,
        method: 'eth_getBalance',
        params: [address, 'latest']
    };

    try {
        const response = await axios.post(ALCHEMY_URL, data);
        const balanceInWei = parseInt(response.data.result, 16);
        return balanceInWei / 1e18; // Convert Wei to ETH
    } catch (error) {
        console.error('Error fetching Ethereum balance:', error);
        throw error;
    }
}

export default AccountInfo
