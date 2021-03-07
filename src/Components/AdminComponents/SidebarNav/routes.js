export const routes = [
	{
		heading: 'SunSystem',
		routes: [
			{
				'slug': '/admin-dashboard',
				'title': 'Dashboard',
			},
		],
	},
	{
		heading: 'Planning',
		routes: [
			{
				slug: '/admin-dashboard/planning',
				title: 'Alles',
			},
			{
				slug: '/admin-dashboard/planning/klaar',
				title: 'Klaar',
			},
			{
				slug: '/admin-dashboard/planning/week',
				title: 'Deze Week',
			},
			{
				slug: '/admin-dashboard/planning/maand',
				title: 'Deze Maand',
			},
		],
	},
	{
		heading: 'Opdrachten',
		routes: [
			{
				slug: '/admin-dashboard/opdrachten',
				title: 'Alles',
			},
			{
				slug: '/admin-dashboard/opdrachten/new',
				title: 'Nieuwe Opdracht',
			},
			{
				slug: '/admin-dashboard/opdrachten/edit',
				title: 'Bewerk Opdracht',
			},
		],
	},
	{
		heading: 'Gebruikers',
		routes: [
			{
				slug: '/admin-dashboard/gebruikers',
				title: 'Alle Gebruikers',
			},
			{
				slug: '/admin-dashboard/gebruikers/new',
				title: 'Nieuwe Gebruiker',
			},
			{
				slug: '/admin-dashboard/gebruikers/edit',
				title: 'Bewerk Gebruiker',
			},
		],
	},
	{
		heading: 'Settings',
		routes: [
			{
				slug: '/admin-dashboard/vakanties',
				title: 'Vakanties',
			},
			{
				slug: '/admin-dashboard/producten',
				title: 'Producten',
			},
			{
				slug: '/admin-dashboard/jaren',
				title: 'Jaren',
			},
		],
	},
]