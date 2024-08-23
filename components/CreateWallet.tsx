'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { generateMnemonic, validateMnemonic } from 'bip39';
import useLocalStorage from 'use-local-storage';
import { useState } from 'react';
import DisplayMnemonic from './DisplayMnemonic';
import { Info, Shield, Zap } from 'lucide-react';

function CreateWallet() {
    const [mnemonic, setMnemonic] = useLocalStorage<string>('mnemonic', '');
    const [tempMnemonic, setTempMnemonic] = useState<string>('');
    const [importedMnemonic, setImportedMnemonic] = useState<string>('');
    const [walletCreated, setWalletCreated] = useState<boolean>(false);
    const [walletImported, setWalletImported] = useState<boolean>(false);

    const generateNewWallet = () => {
        const newMnemonic = generateMnemonic();
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
        <div className="flex flex-col items-center justify-center min-h-screen bg-black my-5">
            <div className="p-8 rounded-lg w-full max-w-5xl bg-neutral-950 shadow-2xl">
                <h1 className="text-4xl font-bold mb-6 text-center text-gray-100">Welcome to Your Crypto Wallet</h1>
                <p className="text-center text-gray-400 mb-8">Secure, fast, and easy-to-use. Start your crypto journey today!</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    <div className="flex flex-col items-center p-4 bg-gray-800 rounded-lg">
                        <Shield className="w-12 h-12 text-blue-400 mb-2" />
                        <h3 className="text-xl font-semibold mb-2 text-gray-100">Secure</h3>
                        <p className="text-center text-gray-400">Your keys, your crypto. We never store your private information.</p>
                    </div>
                    <div className="flex flex-col items-center p-4 bg-gray-800 rounded-lg">
                        <Zap className="w-12 h-12 text-green-400 mb-2" />
                        <h3 className="text-xl font-semibold mb-2 text-gray-100">Fast</h3>
                        <p className="text-center text-gray-400">Lightning-fast transactions across multiple blockchains.</p>
                    </div>
                    <div className="flex flex-col items-center p-4 bg-gray-800 rounded-lg">
                        <Info className="w-12 h-12 text-yellow-400 mb-2" />
                        <h3 className="text-xl font-semibold mb-2 text-gray-100">User-Friendly</h3>
                        <p className="text-center text-gray-400">Intuitive interface designed for both beginners and experts.</p>
                    </div>
                </div>

                <div className="space-y-6">
                    {!walletCreated && (
                        <div>
                            <Button
                                onClick={generateNewWallet}
                                className={`w-full font-bold py-3 px-4 rounded-lg text-lg bg-gradient-to-r from-blue-800 to-purple-900 hover:from-blue-900 hover:to-purple-950 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 ${walletCreated && 'cursor-not-allowed'}`}
                                disabled={walletCreated}
                            >
                                Create New Wallet
                            </Button>
                        </div>
                    )}
                    {walletCreated && <DisplayMnemonic handleCancel={handleCancel} tempMnemonic={tempMnemonic.split(" ")} />}
                    <div className="flex items-center">
                        <div className="flex-grow border-t border-gray-700"></div>
                        <span className="flex-shrink mx-4 text-gray-500">or</span>
                        <div className="flex-grow border-t border-gray-700"></div>
                    </div>
                    <div className="space-y-4">
                        <Input
                            type="text"
                            placeholder="Enter your mnemonic phrase"
                            value={importedMnemonic}
                            onChange={(e) => setImportedMnemonic(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-lg bg-gray-800 text-gray-100"
                        />
                        <Button
                            onClick={importWallet}
                            variant={'default'}
                            className="w-full font-bold py-3 px-4 rounded-lg text-lg bg-gradient-to-r from-green-800 to-blue-800 hover:from-green-900 hover:to-blue-900 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
                        >
                            Import Existing Wallet
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateWallet
