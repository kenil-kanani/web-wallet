import { useState, useEffect } from 'react';
import axios from 'axios';

export function useCryptoPrices() {
    const [solanaPrice, setSolanaPrice] = useState(0);
    const [ethereumPrice, setEthereumPrice] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPrices = async () => {
            try {
                const response = await axios.get(
                    'https://api.coingecko.com/api/v3/simple/price?ids=solana,ethereum&vs_currencies=usd'
                );
                setSolanaPrice(response.data.solana.usd);
                setEthereumPrice(response.data.ethereum.usd);
            } catch (error) {
                console.error('Error fetching cryptocurrency prices:', error);
            }
        };

        fetchPrices().finally(() => setLoading(false));
        const intervalId = setInterval(fetchPrices, 600000);
        return () => clearInterval(intervalId);
    }, []);

    return { solanaPrice, ethereumPrice, loading };
}