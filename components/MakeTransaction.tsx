import React, { useState } from 'react'
import SendCoin from './SendCoin'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronDown, ChevronUp } from 'lucide-react'

function MakeTransaction() {
    const [open, setOpen] = useState(true);

    const toggleOpen = () => setOpen(!open);

    return (
        <div className={`bg-neutral-900 my-5 p-3 rounded-md transition-all duration-300 ease-in-out ${open ? 'h-[530px]' : 'h-24'} overflow-hidden`}>
            <div className="mb-4 text-center cursor-pointer" onClick={toggleOpen}>
                <h3 className="text-xl font-semibold text-indigo-300 mb-2 flex items-center justify-center">
                    Share the Love
                    {open ? <ChevronUp className="ml-2" /> : <ChevronDown className="ml-2" />}
                </h3>
                <p className="text-gray-400">
                    Spread joy and kindness with every transaction. Your generosity can brighten someone&apos;s day!
                </p>
            </div>
            {open && (
                <Tabs defaultValue="ethereum" className="w-full">
                    <TabsList className='w-full'>
                        <TabsTrigger className='w-full' value="ethereum">Ethereum</TabsTrigger>
                        <TabsTrigger className='w-full' value="solana">Solana</TabsTrigger>
                    </TabsList>
                    <TabsContent value="ethereum"><SendCoin coinName='Ethereum' /></TabsContent>
                    <TabsContent value="solana"><SendCoin coinName='Solana' /></TabsContent>
                </Tabs>
            )}
        </div>
    )
}

export default MakeTransaction
