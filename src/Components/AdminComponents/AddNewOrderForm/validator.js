export const validator = (selectedUser, date, aantal, referentie, ordernummer, productNaam) => {
	let errors = []

	if (!selectedUser) {
		errors.push(
			{
				severity: 'error',
				detail: 'Selecteer een klant voor deze opdracht.',
				sticky: false,
				life: 10000,
			})
	}

	if (!date) {
		errors.push(
			{
				severity: 'error',
				detail: 'Selecteer een datum voor deze opdracht.',
				sticky: false,
				life: 10000,
			})
	}

	if (!aantal) {
		errors.push(
			{
				severity: 'error',
				detail: 'Het aantal kan niet leeg zijn.',
				sticky: false,
				life: 10000,
			})
	}

	if (parseInt(aantal) === 0) {
		errors.push(
			{
				severity: 'error',
				detail: 'Het aantal kan niet 0 zijn.',
				sticky: false,
				life: 10000,
			})
	}

	if (!referentie) {
		errors.push(
			{
				severity: 'error',
				detail: 'Vul een referentie in voor deze opdracht.',
				sticky: false,
				life: 10000,
			})
	}

	if (!ordernummer) {
		errors.push(
			{
				severity: 'error',
				detail: 'Vul een opdracht nummer in voor deze opdracht.',
				sticky: false,
				life: 10000,
			})
	}

	if (!typeof ordernummer === 'number') {
		errors.push(
			{
				severity: 'error',
				detail: 'Het opdracht nummer is geen nummer.',
				sticky: false,
				life: 10000,
			})
	}

	if (!productNaam) {
		errors.push(
			{
				severity: 'error',
				detail: 'Selecteer een product voor deze opdracht.',
				sticky: false,
				life: 10000,
			})
	}

	return errors
}