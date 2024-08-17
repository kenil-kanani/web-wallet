'use client';

import CreateWallet from "@/components/CreateWallet";
import useLocalStorage from "use-local-storage";


export default function Home() {

  const [mnemonic, setMnemonic] = useLocalStorage<string>('mnemonic', '');

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
