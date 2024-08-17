'use client';

import { generateMnemonic , mnemonicToSeedSync } from 'bip39';
import { useState } from 'react';

export default function Home() {

  const [mnemonic, setMnemonic] = useState<string>('');

  const generateMnemonicHandler = () => {
    const mnemonic = generateMnemonic();
    setMnemonic(mnemonic);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1>Hello World</h1>
      <button onClick={generateMnemonicHandler}>Generate Mnemonic</button>
      <p>{mnemonic}</p>
    </div>
  );
}
