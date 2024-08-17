export interface Account {
    ethereum: {
        address: string;
        publicKey: string;
        privateKey: string;
    };
    solana: {
        publicKey: string;
        privateKey: string;
    };
}