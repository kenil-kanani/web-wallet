import { useState, useEffect } from 'react';
import { Account } from '@/types';
import { getSolanaBalance, getEthereumBalance } from '@/utils/getBalance';

export function useBalances(account: Account) {
    const [solanaBalance, setSolanaBalance] = useState(0);
    const [ethereumBalance, setEthereumBalance] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        Promise.all([
            getSolanaBalance(account.solana.publicKey)
                .then(balance => setSolanaBalance(balance))
                .catch(error => console.error('Failed to get Solana balance:', error)),
            getEthereumBalance(account.ethereum.address)
                .then(balance => setEthereumBalance(balance))
                .catch(error => console.error('Failed to get Ethereum balance:', error))
        ]).finally(() => setLoading(false));
    }, [account]);

    return { solanaBalance, ethereumBalance, loading };
}