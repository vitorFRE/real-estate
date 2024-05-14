import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface DashboardCardProps {
	Icon: React.ElementType
	title: string
	content: string
	description: string
}

export const DashboardCard: React.FC<DashboardCardProps> = ({
	Icon,
	title,
	content,
	description
}) => {
	return (
		<Card>
			<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle className="text-sm font-medium">{title}</CardTitle>
				{Icon && (
					<div className="rounded-sm border border-primary/50 p-1">
						<Icon className="h-4 w-4 text-primary" />
					</div>
				)}
			</CardHeader>
			<CardContent>
				<div className="text-2xl font-bold">{content}</div>
				<p className=" text-xs text-muted-foreground">{description}</p>
			</CardContent>
		</Card>
	)
}
