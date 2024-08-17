'use client';

import { Button } from '@/components/ui/button';
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
      <Button onClick={generateMnemonicHandler}>Generate Mnemonic</Button>
      <p>{mnemonic}</p>
    </div>
  );
}
