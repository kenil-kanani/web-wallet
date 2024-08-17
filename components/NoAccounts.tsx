import React from 'react';
import { Button } from './ui/button';
import { useToast } from './ui/use-toast';

const NoAccounts: React.FC = () => {
    const { toast } = useToast();

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
};

export default NoAccounts;