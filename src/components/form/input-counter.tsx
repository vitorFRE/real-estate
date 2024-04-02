'use client'

import React, { useState } from 'react'

import { MinusIcon, PlusIcon } from 'lucide-react'

import { Button } from '../ui/button'

export const InputCounter = () => {
	const [goal, setGoal] = useState(0)

	function onClick(adjustment: number) {
		setGoal((goal) => goal + adjustment)
	}

	return (
		<div className="p-4 pb-0">
			<div className="flex items-center justify-center space-x-2">
				<Button
					variant="outline"
					size="icon"
					className="h-8 w-8 shrink-0 rounded-full"
					onClick={() => onClick(-1)}
					disabled={goal <= 0}
				>
					<MinusIcon className="h-4 w-4" />
					<span className="sr-only">Decrease</span>
				</Button>
				<div className="flex-1 text-center">
					<div className="text-7xl font-bold tracking-tighter">{goal}</div>
					<div className="text-[0.70rem] uppercase text-muted-foreground">
						Banheiros
					</div>
				</div>
				<Button
					variant="outline"
					size="icon"
					className="h-8 w-8 shrink-0 rounded-full"
					onClick={() => onClick(1)}
					disabled={goal >= 10}
				>
					<PlusIcon className="h-4 w-4" />
					<span className="sr-only">Increase</span>
				</Button>
			</div>
		</div>
	)
}
