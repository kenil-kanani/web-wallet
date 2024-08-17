'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { generateMnemonic, mnemonicToSeedSync, validateMnemonic } from 'bip39';
import useLocalStorage from 'use-local-storage';
import { useState } from 'react';
import DisplayMnemonic from './DisplayMnemonic';


function CreateWallet() {

    const [mnemonic, setMnemonic] = useLocalStorage<string>('mnemonic', '');
    const [tempMnemonic, setTempMnemonic] = useState<string>('');
    const [importedMnemonic, setImportedMnemonic] = useState<string>('');
    const [walletCreated, setWalletCreated] = useState<boolean>(false);
    const [walletImported, setWalletImported] = useState<boolean>(false);

    const generateNewWallet = () => {
        const newMnemonic = generateMnemonic();
        // setMnemonic(newMnemonic);
        setTempMnemonic(newMnemonic);
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

    const handleCancel = () => {
        setWalletCreated(false);
        setWalletImported(false);
        setImportedMnemonic('');
        setTempMnemonic('');
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen ">
            <div className="p-8 rounded-lg w-full max-w-5xl">
                <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Wallet Manager</h1>
                <div className="space-y-6">
                    {
                        !walletCreated && <div>
                            <Button
                                onClick={generateNewWallet}
                                className={`w-full font-bold py-2 px-4 rounded ${walletCreated && 'cursor-not-allowed'}`}
                                disabled={walletCreated}
                            >
                                Create New Wallet
                            </Button>
                        </div>
                    }
                    {
                        walletCreated && <DisplayMnemonic handleCancel={handleCancel} tempMnemonic={tempMnemonic.split(" ")} />
                    }
                    <div className="flex items-center">
                        <div className="flex-grow border-t border-gray-300"></div>
                        <span className="flex-shrink mx-4 text-gray-600">or</span>
                        <div className="flex-grow border-t border-gray-300"></div>
                    </div>
                    <div className="space-y-4">
                        <Input
                            type="text"
                            placeholder="Enter your mnemonic phrase"
                            value={importedMnemonic}
                            onChange={(e) => setImportedMnemonic(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <Button
                            onClick={importWallet}
                            variant={'default'}
                            className="w-full font-bold py-2 px-4 rounded"
                        >
                            Import Wallet
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateWallet
