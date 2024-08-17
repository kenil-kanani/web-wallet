import { Account } from '@/types';
import React from 'react'
import useLocalStorage from 'use-local-storage';
import { Button } from './ui/button';
import { useToast } from './ui/use-toast';
import SolanaLogo from '@/public/assets/solana-sol-logo.png';
import EthereumLogo from '@/public/assets/ethereum-original.svg';
import Image from 'next/image';

interface AccountInfoProps {
    selectedAccountIndex: number;
}

function AccountInfo({ selectedAccountIndex }: AccountInfoProps) {

    const [accounts, setAccounts] = useLocalStorage<Account[]>('accounts', []);
    const { toast } = useToast();

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
                    <div className="flex items-center">
                        <Image src={EthereumLogo} alt="Ethereum Logo" className="w-8 h-8 mr-4" />
                        <h3 className="text-xl font-semibold">Ethereum</h3>
                    </div>
                    <button onClick={() => copyToClipboardHandler(accounts[selectedAccountIndex].ethereum.address)} className="text-gray-400 hover:text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                    </button>
                </div>
                <p className="text-gray-300 break-all mt-4">
                    {accounts[selectedAccountIndex].ethereum.address}
                </p>
            </div>
            <div className="bg-neutral-900 rounded-lg p-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <Image src={SolanaLogo} alt="Solana Logo" className="w-8 h-8 mr-4" />
                        <h3 className="text-xl font-semibold">Solana</h3>
                    </div>
                    <button onClick={() => copyToClipboardHandler(accounts[selectedAccountIndex].solana.publicKey)} className="text-gray-400 hover:text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                    </button>
                </div>
                <p className="text-gray-300 break-all mt-4">
                    {accounts[selectedAccountIndex].solana.publicKey}
                </p>
            </div>
        </div>
    )
}

export default AccountInfo
