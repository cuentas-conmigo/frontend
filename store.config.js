/**
 * App Store listing for `eas metadata:push`. The demo login and the review contact come from the
 * environment so they never live in the repository: DEMO_USUARIO, DEMO_CLAVE, REVIEW_FIRST_NAME,
 * REVIEW_LAST_NAME and REVIEW_PHONE (with + and country code).
 */
const site = "https://cuentasconmigo.tuentyfaiv.com";

const urls = {
	marketingUrl: site,
	supportUrl: `${site}/soporte`,
	privacyPolicyUrl: `${site}/privacidad`,
};

const spanish = {
	title: "Cuentas conmigo",
	subtitle: "Cobra tus talleres con CoDi",
	promoText: "Cobra las cuotas de tus talleres con CoDi, sin comisiones y con letra grande.",
	description: [
		"Cuentas conmigo ayuda a quienes dan talleres a cobrar las cuotas de sus alumnos sin complicaciones.",
		"",
		"• Cobra en 3 pasos: eliges a la persona, eliges qué paga y le muestras un código QR.",
		"• Tu alumno paga desde la app de su banco con CoDi. No tiene que instalar nada.",
		"• Si un familiar le ayuda a pagar, el cobro le llega directo a su celular.",
		"• La app sabe cuándo llegó el pago y lo marca como pagado sola.",
		"• Si te pagan en efectivo, lo anotas y queda el comprobante.",
		"• Ves de un vistazo quién ya pagó y a quién le falta.",
		"• Pensada para personas mayores: letra grande, alto contraste, botones grandes y un botón que lee cada pantalla en voz alta.",
		"",
		"Los cobros se hacen con CoDi, el sistema de cobros digitales del Banco de México, a través de Pey. El dinero va del banco de quien paga a la cuenta de quien cobra: Cuentas conmigo no lo recibe ni lo guarda, y no guarda datos de tarjetas ni contraseñas del banco.",
		"",
		"Las cuentas para quienes dan talleres las crea nuestro equipo. Escríbenos desde la página de ayuda para pedir la tuya.",
	].join("\n"),
	keywords: [
		"cobros",
		"talleres",
		"CoDi",
		"pagos",
		"mensualidad",
		"alumnos",
		"personas mayores",
		"accesible",
		"QR",
		"comprobante",
	],
	releaseNotes: "Primera versión.",
	...urls,
};

const english = {
	title: "Cuentas conmigo",
	subtitle: "Collect class fees with CoDi",
	promoText: "Collect your workshop fees with CoDi: no fees, large text and read-aloud.",
	description: [
		"Cuentas conmigo helps people who run workshops collect their students' fees.",
		"",
		"• Charge in 3 steps: pick the person, pick what they pay, show a QR code.",
		"• Students pay from their own bank app with CoDi, Mexico's central bank payment system.",
		"• A relative who helps them pay gets the charge on their phone.",
		"• The app marks a fee as paid as soon as the payment arrives.",
		"• Cash payments are recorded too, with a receipt.",
		"• Built for older adults: large text, high contrast, big buttons and read-aloud on every screen.",
		"",
		"Charges run on CoDi through Pey. Money goes from the payer's bank to the instructor's account; Cuentas conmigo never holds it and stores no card or bank passwords.",
		"",
		"The app is in Spanish and works with Mexican bank accounts.",
	].join("\n"),
	keywords: [
		"payments",
		"workshops",
		"CoDi",
		"fees",
		"classes",
		"students",
		"seniors",
		"accessible",
		"QR",
		"receipts",
	],
	releaseNotes: "First release.",
	...urls,
};

const reviewNotes = [
	"Cuentas conmigo is for people who run paid workshops in Mexico. Students pay from their own bank app with CoDi, Banco de México's payment system, through the Pey API.",
	"",
	"How to review:",
	"1. Sign in with the demo account above.",
	"2. Tap Cobrar, pick any student, pick what they pay. The app creates a real CoDi charge of MXN 1 and shows its QR code.",
	'3. Paying it needs a Mexican bank app, so it is not required for the review. Tap "Pagó en efectivo" to see the receipt without moving money.',
	'4. "Mis alumnos" lists students and who has paid. "Ajustes de letra y voz" changes text size, contrast and read-aloud.',
	"",
	"The app does not sell anything: CoDi charges are for in-person workshops, paid bank to bank, so in-app purchase does not apply. Instructor accounts are created by our team, so there is no sign-up or account deletion in the app; people can ask for deletion at the support URL.",
].join("\n");

module.exports = () => ({
	configVersion: 0,
	apple: {
		copyright: `${new Date().getFullYear()} Cuentas conmigo`,
		categories: ["BUSINESS", "PRODUCTIVITY"],
		info: {
			"es-MX": spanish,
			"en-US": english,
		},
		advisory: {
			alcoholTobaccoOrDrugUseOrReferences: "NONE",
			contests: "NONE",
			gamblingSimulated: "NONE",
			horrorOrFearThemes: "NONE",
			matureOrSuggestiveThemes: "NONE",
			medicalOrTreatmentInformation: "NONE",
			profanityOrCrudeHumor: "NONE",
			sexualContentGraphicAndNudity: "NONE",
			sexualContentOrNudity: "NONE",
			violenceCartoonOrFantasy: "NONE",
			violenceRealistic: "NONE",
			violenceRealisticProlongedGraphicOrSadistic: "NONE",
			gambling: false,
			unrestrictedWebAccess: false,
			kidsAgeBand: null,
			ageRatingOverride: "NONE",
			koreaAgeRatingOverride: "NONE",
		},
		release: {
			automaticRelease: false,
		},
		review: {
			firstName: process.env.REVIEW_FIRST_NAME,
			lastName: process.env.REVIEW_LAST_NAME,
			email: "develop@tuentyfaiv.com",
			phone: process.env.REVIEW_PHONE,
			demoUsername: process.env.DEMO_USUARIO,
			demoPassword: process.env.DEMO_CLAVE,
			demoRequired: true,
			notes: reviewNotes,
		},
	},
});
