import { Account } from '@/types';
import React from 'react'
import useLocalStorage from 'use-local-storage';
import { Button } from './ui/button';
import { useToast } from './ui/use-toast';

function AccountInfo() {

    const [accounts, setAccounts] = useLocalStorage<Account[]>('accounts', []);
    const { toast } = useToast();

    if (accounts.length !== 0) {
        return (
            <div className="flex flex-col items-center justify-center h-screen w-full">
                <div className="text-center p-8 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-4">No Accounts Found</h2>
                    <p className="mb-6">It looks like you haven&apos;t created any accounts yet.</p>
                    <Button
                        variant={'destructive'}
                        className="px-4 py-2 transition duration-300"
                        onClick={() => {
                            toast({
                                title: "No Accounts Found",
                                description: "Side bar se click kr do na bhai... PLz",
                                variant: "destructive",
                            });
                        }}
                    >
                        Create Your First Account
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div>
            Account Info
        </div>
    )
}

export default AccountInfo
