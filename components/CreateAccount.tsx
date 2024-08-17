import React, { useState } from 'react';
import nacl from "tweetnacl";
import * as bip39 from 'bip39';
import { Keypair } from '@solana/web3.js';
import { derivePath } from 'ed25519-hd-key';
import useLocalStorage from 'use-local-storage';

interface Account {
    // ethereum: string;
    solana: string;
}

function CreateAccount() {
    const [seed, setSeed] = useLocalStorage<string>('seed', '');
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [accountIndex, setAccountIndex] = useState(0);

    const generateAccount = () => {
        try {
            const mnemonic = bip39.entropyToMnemonic(seed);

            // Generate Ethereum address
            const ethPath = `m/44'/60'/0'/0/${accountIndex}`;
            const ethSeed = derivePath(ethPath, bip39.mnemonicToSeedSync(mnemonic).toString('hex'));
            const ethKeyPair = nacl.sign.keyPair.fromSeed(ethSeed.key.slice(0, 32));
            const ethPublicKey = Buffer.from(ethKeyPair.publicKey).slice(1);
            // const ethAddress = '0x' + keccak256(ethPublicKey).slice(-40);

            // Generate Solana address
            const solPath = `m/44'/501'/${accountIndex}'/0'`;
            const solSeed = derivePath(solPath, seed).key;
            const solKeypair = Keypair.fromSeed(solSeed);

            console.log('solKeypair : ', solKeypair);

            // const newAccount: Account = {
            // ethereum: ethAddress,
            // solana: solKeypair.publicKey.toString(),
            // };

            // setAccounts([...accounts, newAccount]);
            // setAccountIndex(accountIndex + 1);
        } catch (error) {
            console.error('Error generating account:', error);
            // Handle error (e.g., show error message to user)
        }
    };

    return (
        <div>
            <h2>Create Accounts for Ethereum and Solana</h2>
            <input
                type="text"
                placeholder="Enter seed (hex format)"
                value={seed}
                onChange={(e) => setSeed(e.target.value)}
            />
            <button onClick={generateAccount}>Generate New Account</button>
            {accounts.length > 0 && (
                <div>
                    <h3>Generated Accounts</h3>
                    {accounts.map((account, index) => (
                        <div key={index}>
                            <h4>Account {index + 1}</h4>
                            {/* <p>Ethereum: {account.ethereum}</p> */}
                            <p>Solana: {account.solana}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default CreateAccount;