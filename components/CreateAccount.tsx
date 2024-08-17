
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import AccountInfo from './AccountInfo';

function CreateAccount() {

    const [selectedAccountIndex, setSelectedAccountIndex] = useState(0);

    return (
        <div className="flex">
            <Sidebar selectedAccountIndex={selectedAccountIndex} setSelectedAccountIndex={setSelectedAccountIndex} />
            <AccountInfo />
        </div>
    );
}

export default CreateAccount;