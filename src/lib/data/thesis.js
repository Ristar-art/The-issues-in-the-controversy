// The argument the whole project is built around, and the question underneath
// it. Shared by the landing page and /about so the two always state it the
// same way.

export const THESIS_ITEMS = [
	{
		num: 'I',
		title: 'The Issue',
		description: 'What are the key areas of satan’s assault and why it worked.',
		cta: { href: 'the-issue', label: 'Read More' }
	},
	{
		num: 'II',
		title: "God's Solution",
		description: "What is God's answer to the challenges laid against Him by satan?",
		cta: { href: 'gods-solution', label: 'Read More' }
	},
	{
		num: 'III',
		title: 'Our Part',
		description:
			'Understanding our role in the greater plan and how we can contribute positively.',
		cta: { href: 'our-part', label: 'Read More' }
	}
];

export const CENTRAL_QUESTION = {
	title: 'What is the truth about God?',
	sub: 'Is God a trinity?',
	href: 'the-truth-about-god',
	points: [
		'Who and what is God the Father?',
		'What is the identity of Jesus Christ, the Word of God?',
		'Is the Holy Spirit a self-existent being like the Father and Jesus Christ?'
	]
};
