'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { generateMnemonic, mnemonicToSeedSync, validateMnemonic } from 'bip39';
import { useState } from 'react';

function CreateWallet() {

    const [mnemonic, setMnemonic] = useState<string>('');
    const [importedMnemonic, setImportedMnemonic] = useState<string>('');
    const [walletCreated, setWalletCreated] = useState<boolean>(false);
    const [walletImported, setWalletImported] = useState<boolean>(false);

    const generateNewWallet = () => {
        const newMnemonic = generateMnemonic();
        setMnemonic(newMnemonic);
        setWalletCreated(true);
        setWalletImported(false);
    };

    const importWallet = () => {
        if (validateMnemonic(importedMnemonic)) {
            setMnemonic(importedMnemonic);
            setWalletImported(true);
            setWalletCreated(false);
        } else {
            alert('Invalid mnemonic phrase. Please check and try again.');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="p-8 bg-white rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Wallet Manager</h1>
                <div className="space-y-6">
                    <div>
                        <Button
                            onClick={generateNewWallet}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Create New Wallet
                        </Button>
                    </div>
                    <div className="flex items-center">
                        <div className="flex-grow border-t border-gray-300"></div>
                        <span className="flex-shrink mx-4 text-gray-600">or</span>
                        <div className="flex-grow border-t border-gray-300"></div>
                    </div>
                    <div className="space-y-2">
                        <Input
                            type="text"
                            placeholder="Enter your mnemonic phrase"
                            value={importedMnemonic}
                            onChange={(e) => setImportedMnemonic(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <Button
                            onClick={importWallet}
                            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Import Wallet
                        </Button>
                    </div>
                </div>
                {(walletCreated || walletImported) && (
                    <div className="mt-6 p-4 bg-gray-100 rounded-md">
                        <h2 className="text-xl font-semibold mb-2 text-gray-800">
                            {walletCreated ? 'New Wallet Created' : 'Wallet Imported'}
                        </h2>
                        <p className="text-sm text-gray-600 break-words">{mnemonic}</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CreateWallet
