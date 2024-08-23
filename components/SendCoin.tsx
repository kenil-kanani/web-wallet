import { Send } from 'lucide-react'
import React, { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { PublicKey } from '@solana/web3.js';
import useLocalStorage from 'use-local-storage'
import { Account } from '@/types'

function SendCoin({
    selectedAccountIndex,
    coinName
}: {
    selectedAccountIndex: number,
    coinName: string
}) {

    const [address, setAddress] = useState('');
    const [amount, setAmount] = useState('');
    const [isValidAddress, setIsValidAddress] = useState(true);
    const [accounts, setAccounts] = useLocalStorage<Account[]>('accounts', []);
    const [loading, setLoading] = useState(false);


    const handleSendTransaction = async () => {
        if (!isValidAddress || !amount) {
            alert('Please enter a valid address and amount');
            return;
        }

        let account = accounts[selectedAccountIndex];
        setLoading(true);
        try {
            if (coinName === 'Ethereum') {
                await sendEthereumTransaction(address, amount, account.ethereum.privateKey);
            } else if (coinName === 'Solana') {
                await sendSolanaTransaction();
            }
        } catch (error) {
            console.log(error)
            alert('Transaction failed. Please try again.');
        } finally {
            setLoading(false)
        }
    };

    async function sendEthereumTransaction(recipientAddress: any, amountInEther: any, privateKey: any) {
        alert('Ethereum transactions are not yet implemented')
    }

    const sendSolanaTransaction = async () => {
        alert('Solana transactions are not yet implemented');
    };

    const validateAddress = (inputAddress: string) => {
        if (coinName === 'Ethereum') {
            return /^0x[a-fA-F0-9]{40}$/.test(inputAddress);
        } else if (coinName === 'Solana') {
            return PublicKey.isOnCurve(inputAddress);
        }
        return false;
    };

    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputAddress = e.target.value;
        setAddress(inputAddress);
        setIsValidAddress(validateAddress(inputAddress));
    };

    return (
        <div className='flex flex-col gap-6 justify-center items-center w-full bg-neutral-950 p-8 rounded-lg shadow-lg'>
            <h2 className='text-2xl font-bold text-indigo-300 mb-4'>Send {coinName}</h2>

            <div className='w-full max-w-md'>
                <Label htmlFor='address' className='text-sm font-medium text-gray-300 mb-2'>
                    Recipients Address
                </Label>
                <Input
                    id='address'
                    className='bg-neutral-800 border-neutral-700 text-white'
                    type="text"
                    value={address}
                    placeholder={`Enter ${coinName} address`}
                    onChange={handleAddressChange}
                />
                {!isValidAddress && address !== '' && (
                    <p className="text-red-500 text-sm mt-2">
                        Please enter a valid {coinName} address
                    </p>
                )}
            </div>

            <div className='w-full max-w-md'>
                <Label htmlFor='amount' className='text-sm font-medium text-gray-300 mb-2'>
                    Amount
                </Label>
                <Input
                    id='amount'
                    className='bg-neutral-800 border-neutral-700 text-white'
                    type="text"
                    value={amount}
                    placeholder={`0.0 ${coinName}`}
                    onChange={e => setAmount(e.target.value)}
                />
            </div>

            <div className='flex gap-6 mt-6'>
                <Button variant={'destructive'} className='px-6'>
                    Cancel
                </Button>
                <Button
                    onClick={handleSendTransaction}
                    disabled={loading}
                    className='flex gap-3 bg-indigo-600 hover:bg-indigo-700 px-6'>
                    <Send className='text-white' />
                    <span className='text-white'>{loading ? 'Loading...' : 'Send' + coinName}</span>
                </Button>
            </div>
        </div>
    )
}

export default SendCoin
