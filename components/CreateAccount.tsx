
import React, { useState } from 'react';
import nacl from "tweetnacl";
import * as bip39 from 'bip39';
import { Keypair, PublicKey } from '@solana/web3.js';
import { derivePath } from 'ed25519-hd-key';
import useLocalStorage from 'use-local-storage';
import { keccak256 } from 'js-sha3';
import HDKey from 'hdkey';
import bs58 from 'bs58';

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

function CreateAccount() {
    const [seed, setSeed] = useLocalStorage<string>('seed', '');
    const [accounts, setAccounts] = useLocalStorage<Account[]>('accounts', []);
    const [accountIndex, setAccountIndex] = useState(0);

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
        <div>
            <button onClick={generateAccount}>Generate New Account</button>
            {accounts.length > 0 && (
                <div>
                    <h3>Generated Accounts</h3>
                    {accounts.map((account, index) => (
                        <div key={index}>
                            <h4>Account {index + 1}</h4>
                            <h5>Ethereum</h5>
                            <p>Address: {account.ethereum.address}</p>
                            <p>Public Key: {account.ethereum.publicKey}</p>
                            <p>Private Key: {account.ethereum.privateKey}</p>
                            <h5>Solana</h5>
                            <p>Public Key: {account.solana.publicKey}</p>
                            <p>Private Key: {account.solana.privateKey}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default CreateAccount;