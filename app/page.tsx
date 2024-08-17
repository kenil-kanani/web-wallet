'use client';

import CreateWallet from "@/components/CreateWallet";
import { useEffect, useState } from "react";
import useLocalStorage from "use-local-storage";


export default function Home() {

  const [isClient, setIsClient] = useState(false);
  const [mnemonic, setMnemonic] = useLocalStorage<string>('mnemonic', '');

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }
  return (

    mnemonic === '' ?
      <CreateWallet />
      : (
        <div>
          UI of fetching the wallet details
        </div>
      )
  );
}
