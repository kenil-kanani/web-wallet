import React from 'react';

interface TotalBalanceProps {
    solanaBalance: number;
    ethereumBalance: number;
    solanaPrice: number;
    ethereumPrice: number;
}

const TotalBalance: React.FC<TotalBalanceProps> = ({ solanaBalance, ethereumBalance, solanaPrice, ethereumPrice }) => {
    const totalBalance = (solanaBalance * solanaPrice + ethereumBalance * ethereumPrice).toFixed(2);

    return (
        <div className="bg-neutral-900 rounded-lg p-6 mb-6">
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-white">Total Balance</h3>
                <p className="text-gray-300 text-2xl font-bold">${totalBalance}</p>
            </div>
            <div className="flex justify-between mt-4">
                <p className="text-gray-400">{solanaBalance} SOL</p>
                <p className="text-gray-400">{ethereumBalance} ETH</p>
            </div>
        </div>
    );
};

export default TotalBalance;