import { SocialLogins } from '../_components/social-logins'

const LoginPage = () => {
	return (
		<div className="w-full max-w-[400px]">
			<div>
				<h1 className="text-2xl font-bold text-black">RealEstate</h1>
				<hr className="w-4  border-[2px] border-primary" />
			</div>
			<p className="mb-5 font-medium text-neutral-600">O seu lugar esta aqui</p>
			<SocialLogins />
		</div>
	)
}

export default LoginPage
