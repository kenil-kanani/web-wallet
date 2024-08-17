import axios from 'axios';

export async function getSolanaBalance(address: string): Promise<number> {
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

export async function getEthereumBalance(address: string): Promise<number> {
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