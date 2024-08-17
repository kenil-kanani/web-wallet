import React, { useState } from 'react';
import nacl from "tweetnacl";
import { Keypair, PublicKey } from '@solana/web3.js';
import { derivePath } from 'ed25519-hd-key';
import useLocalStorage from 'use-local-storage';
import { keccak256 } from 'js-sha3';
import HDKey from 'hdkey';
import bs58 from 'bs58';
import { Button } from './ui/button';

interface Account {
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

function Sidebar() {
    const [seed, setSeed] = useLocalStorage<string>('seed', '');
    const [accounts, setAccounts] = useLocalStorage<Account[]>('accounts', []);
    const [accountIndex, setAccountIndex] = useState(accounts.length);



    const generateAccount = () => {
        try {
            // Generate Ethereum address and keys
            const seedBuffer = Buffer.from(seed, 'hex');
            const hdkey = HDKey.fromMasterSeed(seedBuffer);
            const ethPath = `m/44'/60'/0'/0/${accountIndex}`;
            const ethWallet = hdkey.derive(ethPath);
            const ethPublicKey = ethWallet.publicKey;
            const ethPrivateKey = ethWallet.privateKey;
            const ethAddress = '0x' + keccak256(ethPublicKey.slice(1)).slice(-40);

            // Generate Solana address and keys
            const solPath = `m/44'/501'/${accountIndex}'/0'`;
            const solSeed = derivePath(solPath, seed).key;
            const solKeypair = Keypair.fromSeed(solSeed);

            const newAccount: Account = {
                ethereum: {
                    address: ethAddress,
                    publicKey: '0x' + ethPublicKey.toString('hex'),
                    privateKey: '0x' + ethPrivateKey.toString('hex'),
                },
                solana: {
                    publicKey: new PublicKey(solKeypair.publicKey).toString(),
                    privateKey: bs58.encode(solKeypair.secretKey),
                },
            };

            setAccounts([...accounts, newAccount]);
            setAccountIndex(accountIndex + 1);
        } catch (error) {
            console.error('Error generating account:', error);
            // Handle error (e.g., show error message to user)
        }
    };
    return (
        <div className="flex flex-col justify-between sticky h-screen w-64 border-r border-gray-700 text-white">
            <div>
                <div className="p-4 w-full flex justify-center">
                    <h1 className="text-2xl font-bold mb-4">Crypto Wallet</h1>
                </div>
                <div className="flex flex-col max-h-screen/2 overflow-y-auto">
                    {
                        accounts.length > 0 && accounts.map((account, index) => (
                            <Button
                                variant="outline"
                                className=" bg-gray-700 font-bold py-2 px-4 mx-4 rounded"
                                key={index}
                            >
                                Account {index + 1}
                            </Button>
                        ))
                    }
                </div>
            </div>
            <div className="p-4 mt-10">
                <Button
                    variant="default"
                    onClick={generateAccount}
                    className="w-full font-bold py-2 px-4 rounded"
                >
                    {accounts.length > 0 ? "Generate One More Account" : "Generate New Account"}
                </Button>
            </div>
        </div>
    )
}

export default Sidebar
