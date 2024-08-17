'use client';

import CreateAccount from "@/components/CreateAccount";
import CreateWallet from "@/components/CreateWallet";
import { useEffect, useState } from "react";
import useLocalStorage from "use-local-storage";


export default function Home() {

  const [isClient, setIsClient] = useState(false);
  const [seed, setSeed] = useLocalStorage<string>('seed', '');

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }
  return (

    seed === '' ?
      <CreateWallet />
      : (
        <CreateAccount />
      )
  );
}
