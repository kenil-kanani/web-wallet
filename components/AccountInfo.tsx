import React from 'react'
import { Account } from '@/types';
import useLocalStorage from 'use-local-storage';
import { useToast } from './ui/use-toast';
import NoAccounts from './NoAccounts';
import TotalBalance from './TotalBalance';
import CryptoCard from './CryptoCard';
import { useBalances } from '@/hooks/useBalances';
import { useCryptoPrices } from '@/hooks/useCryptoPrices';
import { Loader2 } from 'lucide-react';
import MakeTransaction from './MakeTransaction';

interface AccountInfoProps {
    selectedAccountIndex: number;
}

function AccountInfo({ selectedAccountIndex }: AccountInfoProps) {
    const [accounts, setAccounts] = useLocalStorage<Account[]>('accounts', []);
    const { solanaBalance, ethereumBalance, loading: balancesLoading } = useBalances(accounts[selectedAccountIndex]);
    const { solanaPrice, ethereumPrice, loading: pricesLoading } = useCryptoPrices();
    const { toast } = useToast();

    if (accounts.length === 0) {
        return <NoAccounts />;
    }

    if (balancesLoading || pricesLoading) {
        return (
            <div className="p-8 w-full flex justify-center items-center">
                <Loader2 className="animate-spin" />
            </div>
        )
    }

    return (
        <div className="p-8 w-full max-h-screen overflow-scroll">
            <h2 className="text-2xl font-bold mb-6">Account Info</h2>

            <TotalBalance
                solanaBalance={solanaBalance}
                ethereumBalance={ethereumBalance}
                solanaPrice={solanaPrice}
                ethereumPrice={ethereumPrice}
            />


            <div className="flex flex-col bg-neutral-900 rounded-lg p-6 gap-4">
                <CryptoCard
                    type="ethereum"
                    balance={ethereumBalance}
                    price={ethereumPrice}
                    address={accounts[selectedAccountIndex].ethereum.address}
                    toast={toast}
                />
                <CryptoCard
                    type="solana"
                    balance={solanaBalance}
                    price={solanaPrice}
                    address={accounts[selectedAccountIndex].solana.publicKey}
                    toast={toast}
                />
            </div>

            <MakeTransaction selectedAccountIndex={selectedAccountIndex} />

        </div>
    )
}

export default AccountInfo
