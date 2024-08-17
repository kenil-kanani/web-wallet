import React from 'react'
import { Badge } from "@/components/ui/badge"

function DisplayMnemonic({ mnemonic }: {
    mnemonic: string[]
}) {
    return (
        <div className="grid grid-cols-3 gap-4 p-4">
            {mnemonic.map((word, index) => (
                <Badge key={index} variant="secondary" className="text-lg p-2">
                    <span className="font-bold mr-2">{index + 1}.</span>
                    {word}
                </Badge>
            ))}
        </div>
    )
}

export default DisplayMnemonic
