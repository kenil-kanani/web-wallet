import React, { useState } from 'react'
import { Badge } from "@/components/ui/badge"
import { EyeIcon } from 'lucide-react'
import { useToast } from "@/components/ui/use-toast"
import { Checkbox } from "@/components/ui/checkbox"
import { mnemonicToSeedSync } from 'bip39';
import { Button } from './ui/button'
import useLocalStorage from 'use-local-storage'

function DisplayMnemonic({ tempMnemonic, handleCancel }: {
    tempMnemonic: string[]
    handleCancel: () => void
}) {
    const [isVisible, setIsVisible] = useState(false)
    const [seed, setSeed] = useLocalStorage<string>('seed', '');
    const [mnemonic, setMnemonic] = useLocalStorage<string>('mnemonic', '');
    const { toast } = useToast()
    const [isChecked, setIsChecked] = useState(false)

    const handleCopy = () => {
        if (isVisible) {
            navigator.clipboard.writeText(tempMnemonic.join(' '))
        }
    }

    const handleContinue = () => {
        const joinedMnemonic = tempMnemonic.join(' ');
        setMnemonic(joinedMnemonic);
        const seed = mnemonicToSeedSync(joinedMnemonic);
        setSeed(seed.toString('hex'));
    }

    return (
        <>
            <div
                className={`relative border border-gray-800 p-2 cursor-pointer `}
                onClick={(e) => {
                    e.preventDefault();
                    if (!isVisible)
                        setIsVisible(true)
                    else {
                        handleCopy();
                        toast({
                            title: "Copied!",
                            description: "Mnemonic phrase has been copied to clipboard.",
                            duration: 3000,
                        })
                    }
                }}
            >
                <div className={`absolute inset-0  rounded-md bg-opacity-50 backdrop-blur-md flex items-center justify-center ${isVisible ? 'hidden' : ''}`}>
                    <div className='cursor-pointer'>
                        <EyeIcon className="w-12 h-12 text-gray-600 cursor-pointer" />
                    </div>
                </div>
                <div className={`grid grid-cols-3 gap-4 p-4 ${isVisible ? '' : 'blur-sm'}`}>
                    {tempMnemonic.map((word, index) => (
                        <Badge key={index} variant="secondary" className="text-lg p-2">
                            <span className="font-bold mr-2">{index + 1}.</span>
                            {word}
                        </Badge>
                    ))}
                </div>
                {isVisible && (
                    <p className="text-sm text-gray-500 mt-2 text-center">
                        Click anywhere in the container to copy the phrase
                    </p>
                )}
            </div>

            <div>
                <div className="flex justify-center items-start space-x-2 mt-10">
                    <Checkbox
                        id="createWallet"
                        checked={isChecked}
                        onCheckedChange={(checked) => setIsChecked(checked as boolean)}
                    />
                    <label
                        htmlFor="createWallet"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        I agree that I have saved the mnemonic phrase and I understand the risks of losing access to my wallet if I forget my password.
                    </label>
                </div>
                <p className='text-sm text-gray-500 mt-4 text-center'>
                    Please save the mnemonic phrase in a secure location. You will not able to continue without it. To continue, click on the eye icon to reveal the phrase and click on the checkbox and click continue.
                </p>
                <div className='flex justify-center mt-10 flex-wrap gap-4'>
                    <Button variant={'destructive'} onClick={handleCancel} className='min-w-80  mx-auto'>Cancel</Button>
                    <Button className='min-w-80  mx-auto' disabled={!isChecked || !isVisible} onClick={handleContinue}>Continue</Button>
                </div>
            </div>
        </>
    )
}

export default DisplayMnemonic
