import { Mail, Phone, Pin } from 'lucide-react'

import { ContactForm } from '../_components/contact-form'
import { ServicesSection } from '../_components/sections/services-section'

const Name = () => {
	return (
		<div className="container mx-auto mt-10 md:mt-20">
			<section className="grid grid-cols-1 gap-4 md:grid-cols-2">
				<div>
					<h2 className="text-3xl font-semibold text-foreground md:text-5xl">
						Entre em contato
					</h2>
					<p className="font-medium text-muted-foreground md:text-lg">
						Estamos ansiosos para ouvir de você. Entre em contato
					</p>
					<div className="mt-5 space-y-4">
						<div className="flex items-center gap-2">
							<Mail className="text-primary" /> <span>email@email.com</span>
						</div>
						<div className="flex items-center gap-2">
							<Phone className="text-primary" /> <span>(00) 0 00000-0000</span>
						</div>
						<div className="flex items-center gap-2">
							<Pin className="text-primary" />{' '}
							<span>Bem ali perto, BR, 000 000</span>
						</div>
					</div>
				</div>

				<ContactForm />
			</section>
			<ServicesSection />
		</div>
	)
}

export default Name
