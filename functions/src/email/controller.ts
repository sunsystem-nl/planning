import { Request, Response } from 'express';
const nodemailer = require("nodemailer");

export const sendMail = async (req: Request, res: Response) => {
	const { klantEmail, klantLeverDag, klantNaamKort, ordernummer, productAantal, productNaam, referentie } = req.body
	try {

		let transporter = nodemailer.createTransport({
			host: "mail.madebyzuyd.nl",
			port: 465,
			secure: true,
			auth: {
				user: `info@madebyzuyd.nl`,
				pass: `gMa*#V}wWr5a`,
			},
		});

		let msg = {}
		if (klantLeverDag === 'geen') {
			msg = {
				from: '"Sunsystem werkplaats" <noreply@sunsystem.nl>',
				to: `${klantEmail}`,
				subject: `Uw opdracht voor referentie ${referentie} is klaar!`,
				html: `
					<h1>Beste ${klantNaamKort},</h1>
					<hr/>
					<p>De volgende opdracht ligt klaar om afgehaald te worden:</p>
					<ul>
						<li><strong>Referentie: </strong> ${referentie}</li>
						<li><strong>Opdracht Nummer: </strong> ${ordernummer}</li>
						<li><strong>Product Soort: </strong> ${productNaam}</li>
						<li><strong>Aantal: </strong> ${productAantal}</li>
					</ul>
					<p>Mocht u nog vragen hebben neem dan contact met ons op via:</p>
					<ul style="list-style:none; padding-left: 0; margin-left: 10px">
						<li><strong>Telefoon:</strong> <a href="tel:+31 46 475 7880">+31 46 475 7880</a></li>
						<li><strong>Email:</strong> <a href="mailto:tony@sunsystem.nl">tony@sunsystem.nl</a></li>
					</ul>
					<p>Met vriendelijke groet</p>
					<ul style="list-style:none; padding-left: 0; margin-left: 10px">
						<li>SunSystem B.V.</li>
						<li>Kampstraat 2F</li>
						<li>6163HG Geleen Nederland</li>
					</ul>
				`,
			}
		} else {
			msg = {
				from: '"Sunsystem werkplaats" <noreply@sunsystem.nl>', // sender address
				to: `${klantEmail}`, // list of receivers
				subject: `Uw opdracht voor referentie ${referentie} is klaar!`, // Subject line
				html: `
					<h1>Beste ${klantNaamKort},</h1>
					<hr/>
					<p>De volgende opdracht wordt de eerstvolgende leverdag bezorgt:</p>
					<ul>
						<li><strong>Referentie: </strong> ${referentie}</li>
						<li><strong>Opdracht Nummer: </strong> ${ordernummer}</li>
						<li><strong>Product Soort: </strong> ${productNaam}</li>
						<li><strong>Aantal: </strong> ${productAantal}</li>
					</ul>
					<p>Mocht u nog vragen hebben neem dan contact met ons op via:</p>
					<ul style="list-style:none; padding-left: 0; margin-left: 10px">
						<li><strong>Telefoon:</strong> <a href="tel:+31 46 475 7880">+31 46 475 7880</a></li>
						<li><strong>Email:</strong> <a href="mailto:tony@sunsystem.nl">tony@sunsystem.nl</a></li>
					</ul>
					<p>Met vriendelijke groet</p>
					<ul style="list-style:none; padding-left: 0; margin-left: 10px">
						<li>SunSystem B.V.</li>
						<li>Kampstraat 2F</li>
						<li>6163HG Geleen Nederland</li>
					</ul>
				`,
			}
		}

		await transporter.sendMail(msg);

		return res.status(200).send({ message: `De email is verzonden!` })

	} catch (err) {
		return handleErrors(res, err)
	}
}

const handleErrors = (res: Response, err: any) => {
	return res.status(500).send({ message: `${err.code} - ${err.message}` });
};