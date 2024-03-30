import { Header } from './_components/header'
import { ModeToggle } from './_components/mode-toggle'
import { TopBar } from './_components/top-bar'

const Name = () => {
	return (
		<div className="h-[6000px]">
			<TopBar />
			<Header />

			<h1>oi teste</h1>
			<ModeToggle />
		</div>
	)
}

export default Name
