
import React, { useState } from 'react';
import Sidebar from './Sidebar';

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
    
    return (
        <div>
            <Sidebar />
            {/* <button onClick={generateAccount}>Generate New Account</button>
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
            )} */}
        </div>
    );
}

export default CreateAccount;