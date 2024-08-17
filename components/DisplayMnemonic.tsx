import React, { useState } from 'react'
import { Badge } from "@/components/ui/badge"
import { EyeIcon } from 'lucide-react'
import { useToast } from "@/components/ui/use-toast"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from './ui/button'

function DisplayMnemonic({ mnemonic }: {
    mnemonic: string[]
}) {
    const [isVisible, setIsVisible] = useState(false)
    const { toast } = useToast()

    const handleCopy = () => {
        if (isVisible) {
            navigator.clipboard.writeText(mnemonic.join(' '))
        }
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
                    {mnemonic.map((word, index) => (
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

            {isVisible && (
                <div>
                    <div className="flex items-center justify-center space-x-2 mt-10">
                        <Checkbox id="createWallet" />
                        <label
                            htmlFor="createWallet"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            I agree that I have saved the mnemonic phrase and I understand the risks of losing access to my wallet if I forget my password.
                        </label>
                    </div>
                    <div className='flex justify-center'>
                        <Button className='min-w-80 mt-10 mx-auto'>Continue</Button>
                    </div>
                </div>
            )}
        </>
    )
}

export default DisplayMnemonic
