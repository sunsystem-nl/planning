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
				slug: '/admin-dashboard/planning/pantsers',
				title: 'Pantsers',
			},
			{
				slug: '/admin-dashboard/planning/werkbank',
				title: 'Werkbank',
			},
			{
				slug: '/admin-dashboard/planning/bediening',
				title: 'Bediening',
			},
			{
				slug: '/admin-dashboard/planning/klaar-niet-afgehaald',
				title: 'Klaar niet afgehaald',
			},
			{
				slug: '/admin-dashboard/planning/klaar-en-afgehaald',
				title: 'Klaar en afgehaald',
			},
			{
				slug: '/admin-dashboard/planning/deze-week',
				title: 'Deze Week',
			}
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
			}
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