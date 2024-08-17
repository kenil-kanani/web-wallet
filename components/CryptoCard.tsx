import React from 'react';
import Image from 'next/image';
import { CopyIcon } from 'lucide-react';
import SolanaLogo from '@/public/assets/solana-sol-logo.png';
import EthereumLogo from '@/public/assets/ethereum-original.svg';

interface CryptoCardProps {
    type: 'ethereum' | 'solana';
    balance: number;
    price: number;
    address: string;
    toast: any;
}

const CryptoCard: React.FC<CryptoCardProps> = ({ type, balance, price, address, toast }) => {
    const logo = type === 'ethereum' ? EthereumLogo : SolanaLogo;
    const name = type === 'ethereum' ? 'Ethereum' : 'Solana';
    const symbol = type === 'ethereum' ? 'ETH' : 'SOL';

    const copyToClipboardHandler = (text: string) => {
        navigator.clipboard.writeText(text);
        toast({
            title: "Copied to clipboard",
            description: "Address copied to clipboard",
            variant: "default",
        });
    }

    return (
        <div className="bg-neutral-950 rounded-lg p-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <Image src={logo} alt={`${name} Logo`} className="w-8 h-8 mr-4" />
                    <h3 className="text-xl font-semibold">{name}</h3>
                </div>
                <div className="flex items-center gap-2">
                    <p className="text-gray-300 break-all">{address}</p>
                    <button onClick={() => copyToClipboardHandler(address)} className="text-gray-400 hover:text-white">
                        <CopyIcon className="h-5 w-5" />
                    </button>
                </div>
            </div>
            <div className="flex items-center justify-between mt-4">
                <p className="text-gray-400">{balance} {symbol}</p>
                <p className="text-gray-400">{price * balance} USD</p>
            </div>
        </div>
    );
};

export default CryptoCard;