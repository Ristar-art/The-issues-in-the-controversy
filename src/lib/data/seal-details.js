// Long-form content for /seals/[slug] — one entry per seal, keyed by the `id`
// in $lib/data/seals.js. Kept apart from that file so the landing filmstrip and
// the /seals index stay lightweight; only the detail page imports this.
//
// Every field is optional. A seal with nothing filled in still renders: the
// page falls back to its summary from seals.js and says the fuller study is in
// preparation, rather than showing an empty shell.
//
// The shape, in full:
//
//   'first-seal': {
//       // One line under the title. Sets the frame for the whole page.
//       subtitle: 'The church while it was still pure.',
//
//       // The seal's own text. Paste the translation you want quoted —
//       // reference is taken from seals.js, so only `text` is needed here.
//       passage: 'And I saw when the Lamb opened one of the seals…',
//
//       // Two or three sentences of orientation before the study proper.
//       summary: '…',
//
//       // The body of the study. Each section becomes a headed block; a
//       // section may carry a pull-quote that sits beside its prose.
//       sections: [
//           {
//               heading: 'The rider and the bow',
//               paragraphs: ['…', '…'],
//               quote: { text: '…', cite: 'Revelation 6:2' }
//           }
//       ],
//
//       // Short pull-out list — the claims the study rests on.
//       keyPoints: ['…', '…'],
//
//       // Questions to carry into personal study.
//       questions: ['…'],
//
//       // Further reading. `href` may point anywhere on the site.
//       related: [{ label: 'The Overview of Daniel and Revelation', href: '/the-overview-of-daniel-and-revelations' }]
//   }
//
// The first four studies are drawn from the Bible class on Revelation 6 — the
// four horses read as four phases of the kingdom of Christ, laid out as
// evidence in the judgement of Daniel 7. All dates in them are the broad
// generalisations the study itself insists on, not fixed boundaries.

/** @type {Record<string, any>} */
export const SEAL_DETAILS = {
	/* ------------------------------ FIRST SEAL ------------------------------ */
	'first-seal': {
		subtitle: 'The kingdom in its first phase — a conquering church, and the point the judgement starts counting from.',
		passage:
			'And I saw when the Lamb opened one of the seals, and I heard, as it were the noise of thunder, one of the four beasts saying, Come and see. And I saw, and behold a white horse: and he that sat on him had a bow; and a crown was given unto him: and he went forth conquering, and to conquer.',
		summary:
			'The first seal opens inside a courtroom. John is in heaven, standing where Daniel saw the judgement set and the books opened, and what he is shown is not a disaster coming on the earth but a record being produced: the first phase of the kingdom of Christ, the apostolic church, riding out pure and victorious. Everything the other six seals mean depends on reading this one correctly.',
		sections: [
			{
				heading: 'Come and see',
				paragraphs: [
					'The King James reading is “Come and see.” Young’s Literal has “Come and behold.” Several modern versions, working from a different manuscript family, print only “Come” — and that single word changes the scene entirely. If the living creature says “Come,” it is either calling John forward or summoning something out of the seal. If it says “Come and see,” it is addressing the assembled court and inviting it to examine what is being produced.',
					'Given where John is standing, the longer reading is the one that fits. This is the judgement. Evidence is being presented, and the invitation to the watching universe is to look at it. Nothing in Revelation is inconsequential; the living creature speaks, John hears it, and John writes it down, because we are meant to know that what follows is evidence under examination.',
					'The noise of thunder belongs to the same scene. In Revelation 4 voices and thunderings and lightnings proceed out of the throne — the first of the seven thunders, announcing that the judgement is about to begin. This is the second: the court is now told to look at the first exhibit.'
				],
				quote: {
					text: 'I beheld till the thrones were cast down, and the Ancient of days did sit… the judgment was set, and the books were opened.',
					cite: 'Daniel 7:9–10'
				}
			},
			{
				heading: 'Why the rider is not the Antichrist',
				paragraphs: [
					'Most interpreters read the seals as a series of escalating disasters reserved for the last days: the white horse is the Antichrist, the red horse is world war, the pale horse is famine and mass death. Each symbol is given a meaning on its own, and no single picture has to hold them all together.',
					'The difficulty is that this reading ignores the room the seals are opened in. Revelation 4 and 5 place John in a judgement scene with every mark Daniel names — the four living creatures full of eyes, the Spirit in unlimited measure, the innumerable angels as witnesses, the four and twenty elders, and a sealed book to be opened. Only the Lion of the tribe of Judah, the Lamb that was slain, is found worthy to open it, and when he takes it every creature in heaven and earth and sea bursts into praise. A court does not convene to release catastrophes. It convenes to examine a record.',
					'So the white horse is not an enemy riding out. It is the first item of evidence in the trial of Christ’s own kingdom.'
				]
			},
			{
				heading: 'The horse is the people of God',
				paragraphs: [
					'One verse in the middle of Zechariah gives the figure away. God has visited the house of Judah and made them his goodly horse in the battle. Read as a picture it is strange — God riding upon his people — but the sense is plain enough: a horse is what gave an army its advantage in war, and God is saying that his people are the instrument he fights with. It is the same kind of figure as a battle axe and weapons of war.',
					'This is why John sees horses and not armies or cities. He is being shown the kingdom at war, phase by phase, in the only terms the age he wrote in could carry. He is watching history replayed in heaven — something nearer to a screen than a scroll, whatever the actual medium is — and what is on it is the church.',
					'The seven churches showed the same history from the inside, as the church’s own experience. The seals show it from the outside, as the kingdom’s public record. The two overlap, but they are not a matching pair: the seventh church is Laodicea, while the seventh seal is the opening of the seven trumpets.'
				],
				quote: {
					text: 'For the LORD of hosts hath visited his flock the house of Judah, and hath made them as his goodly horse in the battle.',
					cite: 'Zechariah 10:3'
				}
			},
			{
				heading: 'White, a bow, and a crown',
				paragraphs: [
					'Three details carry the first phase. White is the colour of purity throughout Scripture. A bow means the rider has gone out to war. A crown given to him means royalty, and it means victory. And the verdict on the phase is written into the verse itself: he went forth conquering, and to conquer.',
					'This is the apostolic church. It was not a perfect church — the letters and the epistles are frank about that — but it was a conquering one, and arguably the best manifestation of the kingdom the world has yet seen. Roughly AD 30 to about AD 100, the outer date set by the death of John, the last of the apostles. By then that whole generation was gone.',
					'The dates here, and in every seal that follows, are deliberately broad. God gives the kingdom in seven phases and lets us say in general terms what each phase looked like. Pinning a phase to an exact year claims more than the text gives.'
				]
			},
			{
				heading: 'Where the count begins, and what that proves',
				paragraphs: [
					'Notice what the judgement does not do. It does not begin in Eden. It does not begin with Adam, or with the generation of Noah. It begins with the apostolic church — and that single fact settles what kind of judgement this is.',
					'If individual people were the subject, every human being would have to be examined, and the record would have to start at Adam. It starts instead at the point the kingdom of Christ began: the crucifixion and the resurrection. Before that there was no kingdom to examine. So this is the judgement of a kingdom, not an audit of personal salvation — a pre-advent judgement whose subject is the government of Christ, not the standing of each believer in it.',
					'Individuals are still examined, because a kingdom cannot be examined in a vacuum. Everyone in it is part of the testimony of it. But the question on the table is whether the kingdom works — and the motive that puts in a believer is not anxiety about being lost. It is the desire that Christ and his kingdom be glorified in the life that is put on display.'
				],
				quote: {
					text: 'To the intent that now unto the principalities and powers in heavenly places might be known by the church the manifold wisdom of God.',
					cite: 'Ephesians 3:10'
				}
			}
		],
		keyPoints: [
			'The seals are opened inside the judgement scene of Daniel 7, so they present evidence rather than release disasters.',
			'“Come and see” is the court being invited to examine the record — not a summons calling a calamity out of the seal.',
			'A horse stands for the people of God as the instrument he goes to war with (Zechariah 10:3).',
			'White is purity, the bow is war, the crown is royalty and victory: the apostolic church, conquering and to conquer.',
			'Roughly AD 30 to about AD 100, when John, the last apostle, died — a broad phase, not a fixed boundary.',
			'The record starts at the apostolic church and not at Adam, which proves the subject is the kingdom of Christ, not individual salvation.'
		],
		questions: [
			'If the court is being told to come and see, who is the evidence being shown to — and what is it meant to settle?',
			'Why can the judgement not begin at Adam if the kingdom of Christ is what is on trial?',
			'What changes in your reading of the other six seals once the white horse is the church rather than an enemy?',
			'If your life is part of the testimony of the kingdom, what is being testified?'
		],
		related: [
			{ label: 'The scene in Revelation 4 — the court is seated', href: '/scene/revelation-4' },
			{ label: 'Ephesus — the same apostolic church, from within', href: '/churches/ephesus' },
			{ label: 'The symbols and how they are read', href: '/symbols' }
		]
	},

	/* ------------------------------ SECOND SEAL ------------------------------ */
	'second-seal': {
		subtitle: 'The kingdom under the sword — three centuries in which following Christ cost your life.',
		passage:
			'And when he had opened the second seal, I heard the second beast say, Come and see. And there went out another horse that was red: and power was given to him that sat thereon to take peace from the earth, and that they should kill one another: and there was given unto him a great sword.',
		summary:
			'The apostles die and the colour changes. The second phase of the kingdom is the phase of the sword: Christianity spreads, the world turns on it, and for roughly three centuries the public face of the kingdom is a face covered in blood. Broadly AD 100 to about AD 313.',
		sections: [
			{
				heading: 'Why a living creature speaks each time',
				paragraphs: [
					'The second seal is announced the same way the first was, and by the second of the four living creatures. It is worth asking why these beings, and not an angel or a voice from the throne, are the ones calling the court to look.',
					'They are the watchers — the guardians of Israel, under whose banner Israel moves. They are the beings who have been monitoring the kingdom through every phase of it, and they are the ones who recorded what is now being produced. The data is theirs. So it is entirely fitting that each of them in turn unfolds the exhibit he is responsible for and calls the universe to examine it.',
					'It is also worth noticing where they stop. Four living creatures announce four horses, and after the fourth the horses end. From the fifth seal on, the subject is no longer the recorded past but the living present — the souls under the altar and the sealing of the 144,000.'
				]
			},
			{
				heading: 'A great sword given to him',
				paragraphs: [
					'The rider is given power to take peace from the earth, and a great sword. Jesus had said plainly that he came not to send peace but a sword, and in the three centuries after the apostles that saying was fulfilled with terrible exactness.',
					'As the kingdom expanded it became a stumbling block. Before Christianity was ever fashionable it was hated, and the hatred was official: successive Roman emperors persecuted Christians without mercy. Believers were thrown to wild beasts in the arenas, or killed outright as public entertainment. Nero dipped them in tar and set them alight to light his garden at night.',
					'The colour fits what the phase produced. This is not the kingdom being attacked from outside the record — it is the kingdom’s own public history, and in this phase it is red.'
				],
				quote: {
					text: 'Think not that I am come to send peace on earth: I came not to send peace, but a sword.',
					cite: 'Matthew 10:34'
				}
			},
			{
				heading: 'Does “the earth” mean only the church?',
				paragraphs: [
					'A fair question, since it is the church that is being killed: is the earth here just a way of saying God’s own people? There is no good reason to narrow it that far. Peace is taken from the earth, and the people doing the killing are no more at peace than the people dying.',
					'What the verse implies is that Christianity had become a force in the world. It was spreading across the known earth, and wherever it spread this persecution and this bloodshed went with it. The disturbance was not contained inside the church; it was a public convulsion, and the kingdom was at the centre of it.'
				]
			}
		],
		keyPoints: [
			'The four living creatures announce the seals because they are the watchers who recorded the kingdom’s history — the evidence is theirs to produce.',
			'Four living creatures, four horses: after the fourth the horses stop, because the fifth seal moves from recorded history to the living present.',
			'The great sword fulfils Christ’s own word that he came to bring not peace but a sword.',
			'Roughly AD 100, when the last apostle died, to about AD 313 — the age of imperial persecution.',
			'Peace is taken from the earth, not merely from the church: wherever Christianity spread, the bloodshed spread with it.'
		],
		questions: [
			'Why would the judgement record a phase in which the kingdom suffered rather than sinned?',
			'The watchers recorded this history before they announced it. What does that say about how carefully the kingdom has been observed?',
			'The first phase conquered; this one bled. In what sense is the second still the same kingdom going out to war?'
		],
		related: [
			{ label: 'The first seal — the conquering church', href: '/seals/first-seal' },
			{ label: 'Smyrna — the church under persecution', href: '/churches/smyrna' },
			{ label: 'The symbols and how they are read', href: '/symbols' }
		]
	},

	/* ------------------------------ THIRD SEAL ------------------------------ */
	'third-seal': {
		subtitle: 'The kingdom selling its own bread — truth priced for favour, while the oil and the wine are protected.',
		passage:
			'And when he had opened the third seal, I heard the third beast say, Come and see. And I beheld, and lo a black horse; and he that sat on him had a pair of balances in his hand. And I heard a voice in the midst of the four beasts say, A measure of wheat for a penny, and three measures of barley for a penny; and see thou hurt not the oil and the wine.',
		summary:
			'The persecution stops and the compromise begins. In the third phase the kingdom becomes acceptable — to emperors, to kings, to people in high places — and it pays for that acceptance with the word of God. Broadly AD 313 to about 538.',
		sections: [
			{
				heading: 'Balances, and what is being weighed',
				paragraphs: [
					'The rider carries a pair of balances: scales, for measuring out goods to be sold. A price is then called over the scene — a measure of wheat for a penny, three measures of barley for a penny — and a command follows: see thou hurt not the oil and the wine.',
					'The famine reading takes the prices literally and stops there. It has never had much to say about the last clause. Why, in a famine, would oil and wine be singled out for protection? The clause is the clearest sign that the whole scene is figurative, and that the figures are ones Scripture has already defined.'
				]
			},
			{
				heading: 'Wheat and barley are the word of God',
				paragraphs: [
					'Wheat and barley are what bread is made from, and bread throughout Scripture stands for the word of God. So the picture is of a kingdom weighing out the word of God on scales and selling it — and selling it cheap.',
					'That is exactly the transaction of this period. Persecution had ended. The church was becoming popular, accepted by kings and courts, and to make its way forward more easily it traded away what it held. Truth was given up for worldly advantage, one measure at a time.',
					'This is the age of councils and creeds, of Nicaea and what followed it. The Trinity, Sunday observance, the veneration of saints — a great many of the doctrines that later became famous in the Roman and Orthodox systems entered the kingdom during exactly this phase, and they entered it because the kingdom was buying favour with them.'
				],
				quote: {
					text: 'Man doth not live by bread only, but by every word that proceedeth out of the mouth of the LORD.',
					cite: 'Deuteronomy 8:3'
				}
			},
			{
				heading: 'Hurt not the oil and the wine',
				paragraphs: [
					'Oil and wine are settled symbols of the Holy Spirit and of his work. And in the middle of a scene about the word of God being sold, a command is issued out of the midst of the four living creatures that these are not to be touched.',
					'The work of the Spirit is not to be crushed and it is not to be stopped. However far the public kingdom degrades, God holds a line inside it. The compromise is real, the loss is real, and the Spirit is still working — which is why the next phases still have a faithful remnant to persecute.'
				]
			},
			{
				heading: 'Growing outwardly, dying inwardly',
				paragraphs: [
					'Measured socially and politically, this is a period of expansion. Measured spiritually, it is a period of dying. Both are true at once, and the seal records the second while the world was celebrating the first.',
					'The whole phase builds toward 538, the year the bishop of Rome became the undisputed head of Christendom and the supremacy of the papacy began. Everything in this seal is the road to that year: each compromise made the next one easier, and the accumulated compromises made one man’s supremacy possible.',
					'And the colours are telling their own story. White, then red, then black. The sequence is not decoration — it is a direction, and the direction is down.'
				]
			}
		],
		keyPoints: [
			'Balances mean goods weighed out for sale; the goods being sold are wheat and barley — the word of God.',
			'“Hurt not the oil and the wine” is the clause the famine reading cannot explain, and the proof the scene is symbolic.',
			'Oil and wine are the Holy Spirit and his work: God forbids the compromise to reach them.',
			'Roughly AD 313 to about 538 — persecution ends, the church becomes fashionable, and truth is traded for favour.',
			'The Trinity, Sunday observance and the veneration of saints entered the kingdom in this phase, as the price of acceptance.',
			'Socially the kingdom grew while spiritually it died — and the phase ends at 538, with the supremacy of the papacy.'
		],
		questions: [
			'Which is the more dangerous phase for the kingdom: the sword of the second seal, or the favour of the third?',
			'If bread is the word of God, what does it mean to sell it cheap — and what is the penny being taken in exchange?',
			'God protects the oil and the wine here. What does that tell you about what he will and will not allow a corrupt kingdom to destroy?',
			'What is being traded for acceptance in the churches you know today?'
		],
		related: [
			{ label: 'The second seal — the kingdom under the sword', href: '/seals/second-seal' },
			{ label: 'The fourth seal — the kingdom as a source of death', href: '/seals/fourth-seal' },
			{ label: 'The symbols and how they are read', href: '/symbols' }
		]
	},

	/* ------------------------------ FOURTH SEAL ------------------------------ */
	'fourth-seal': {
		subtitle: 'Death riding the kingdom of Christ — the phase that makes the record look like a total failure.',
		passage:
			'And when he had opened the fourth seal, I heard the voice of the fourth beast say, Come and see. And I looked, and behold a pale horse: and his name that sat on him was Death, and Hell followed with him. And power was given unto them over the fourth part of the earth, to kill with sword, and with hunger, and with death, and with the beasts of the earth.',
		summary:
			'After black there seems to be nowhere worse to go, and the fourth seal goes there. The rider is named Death and Hell follows him, and the phase he rides through is the heyday of the papacy — roughly 538 to about 1517 — when the kingdom of Christ became the world’s foremost source of death.',
		sections: [
			{
				heading: 'The colour of something dying',
				paragraphs: [
					'Pale is not simply a fourth colour after white, red and black. It is the particular colour of something that has been kept from the light — lay a board on grass and lift it a few weeks later, and what is underneath is pale and sickly, dying rather than dead. That is the word used for this horse.',
					'And this time the rider is named outright. No other seal names its rider. His name is Death, and Hell — the grave — follows after him, given power over the fourth part of the earth to kill with sword, with hunger, with death and with the beasts of the earth.',
					'What that describes is a stretch of history most readers can place without help. From about 538 to about 1517, Rome was undisputed, supreme not only over Christians but over the political powers of Europe. Even 1517 is not a true end: Luther began the Reformation there, and the Reformation began the diminishing of that power, but the dominance continued for centuries afterward.'
				]
			},
			{
				heading: 'But surely that was not the kingdom of God',
				paragraphs: [
					'This is the objection the seal always raises, and it has to be answered from the text rather than from instinct. Christ’s own parables of the kingdom refuse the escape. He likened the kingdom to a field sown with good seed into which an enemy sowed tares — and the tares are in the kingdom, so plainly in it that the servants want to pull them out and are told to let both grow together until the harvest.',
					'The kingdom has wheat and it has tares. It has sheep and it has goats. It contains people who climbed in over the wall and never came through the door, and they are in it just the same. So the evil face of the kingdom is still the kingdom — the kingdom in an apostate form, but the kingdom. It will not do to say that because the Christian church was in an evil condition it had stopped being Christ’s kingdom.',
					'And this is precisely why Satan has ground for accusation. If the kingdom were made up only of saints he would have no argument to bring. His argument is that this — all of it, the whole public record — is the kingdom of Christ. Look at the history.'
				],
				quote: {
					text: 'Let both grow together until the harvest.',
					cite: 'Matthew 13:30'
				}
			},
			{
				heading: 'Death here, and death in Revelation 20',
				paragraphs: [
					'Death and Hell appear again at the end of the book, cast into the lake of fire, and it is natural to want to connect the two scenes. The connection is looser than it looks. Revelation 20 is saying that dying and the grave come to an end for ever. Revelation 6 is saying something narrower: that at this stage of the kingdom, killing is the outstanding feature of the record.',
					'Death works in many places in Revelation — through the beast, through the seven plagues. What makes its appearance here astonishing is the context. The kingdom of God is about life. Here it is a kingdom in which death dominates and the grave is the fruitage. That is why Death riding this horse is so appalling.'
				]
			},
			{
				heading: 'A kingdom that looks like a perfect failure',
				paragraphs: [
					'Set the four horses side by side and the direction is unmistakable. White, red, black, pale: pure, then bloodied, then bought, then lethal. And since what the judgement examines is the public face of the kingdom — not a few bad eggs inside it, but the face the universe and the world have seen — the evidence to this point proves that the government of Christ is failing. At the fourth seal the kingdom of God appears to be a perfect failure, a tool of death in the hand of Satan.',
					'The judgement is proving that something is wrong. The question the record forces is why: how does a kingdom Christ himself established go from white to the colour of death?',
					'The answer offered in this study is human control. Every time the kingdom has been renewed, it has gone back and installed a human system of government — saying Christ is in charge while putting men at the helm. Christ had ruled it out in advance: the princes of the Gentiles exercise authority over them, but it shall not be so among you; one is your Master, even Christ. Yet from early in Acts a human headship appears, and the pattern never breaks. It is what let the bishop of Rome rise to supremacy. Protestantism came out of Catholicism and set up human control. Adventism came out of Protestantism and did the same. The smallest fellowships repeat it, forming rival conferences among a few hundred people, disfellowshipping and ostracising as they go.',
					'That is the diagnosis the first four seals deliver. It is also where the direction changes — not in the fourth seal, but after it, and not because the kingdom reforms its institutions. It changes when Christ is actually allowed to be Lord and the message of Christ our righteousness takes its effect. The kingdom is going to be vindicated; it will be vindicated because human control is finally eliminated.'
				],
				quote: {
					text: 'But it shall not be so among you… for one is your Master, even Christ.',
					cite: 'Matthew 20:26 · 23:10'
				}
			}
		],
		keyPoints: [
			'Pale is the sickly colour of something kept from the light — dying, with the pallor of death over it.',
			'This is the only seal that names its rider: his name is Death, and Hell follows with him.',
			'Roughly 538 to about 1517 — the heyday of the papacy, supreme over Christians and over political powers alike.',
			'Matthew 13 refuses the objection: the tares are in the kingdom, so the apostate face of the kingdom is still the kingdom.',
			'This is why Satan has ground to accuse — his argument is that the whole public record belongs to Christ.',
			'Death here is a feature of this phase of the kingdom, not the final abolition of death in Revelation 20.',
			'White to red to black to pale is a direction: at the fourth seal the government of Christ appears to have failed.',
			'The cause named is human control — men at the helm of a kingdom that has one Master — and the turn comes when Christ is allowed to be Lord.'
		],
		questions: [
			'Why does Christ insist the tares stay in the field until harvest, when leaving them there is what gives Satan his argument?',
			'If the public face of the kingdom is what the universe is judging, what is that face showing now?',
			'Where is human control operating in the fellowship you belong to — and what is it costing?',
			'The direction changes only when Christ is actually Lord. What would have to be surrendered for that to be true where you are?'
		],
		related: [
			{ label: 'The third seal — the word of God sold cheap', href: '/seals/third-seal' },
			{ label: 'The fifth seal — where the direction changes', href: '/seals/fifth-seal' },
			{ label: 'The beast and the system it builds', href: '/beast' }
		]
	},

	/* ------------------------------ FIFTH SEAL ------------------------------ */
	'fifth-seal': {
		subtitle:
			'The symbol changes, the direction changes, and the record stops being history — this is the seal we are standing in.',
		passage:
			'And when he had opened the fifth seal, I saw under the altar the souls of them that were slain for the word of God, and for the testimony which they held: And they cried with a loud voice, saying, How long, O Lord, holy and true, dost thou not judge and avenge our blood on them that dwell on the earth? And white robes were given unto every one of them; and it was said unto them, that they should rest yet for a little season, until their fellowservants also and their brethren, that should be killed as they were, should be fulfilled.',
		summary:
			'Four seals, four horses — and then the horses stop. At the fifth seal the record leaves the past and arrives at the present, and everything in the scene says so: martyrs crying how long, robes handed out centuries after the wearers died, and a season still left to run. This is the pre-advent judgement itself, and it is where the downward trajectory of the first four seals finally turns.',
		sections: [
			{
				heading: 'Three stages, three judgements',
				paragraphs: [
					'Satan attacked two things: God’s character and God’s government. God’s answer has never been force — if the issue could be settled by power, no rebellion could have lasted an hour. It is a battle of ideas, and God defends himself by revealing truth. That is what revelation is for.',
					'So the conflict runs in three stages, and each stage closes with a judgement, because judgement is how the kingdom advances. First, Christ reveals God’s character at the cross: “Now is the judgment of this world: now shall the prince of this world be cast out.” The dragon is cast down, the accuser is thrown out of heaven, and the kingdom is established in the hearts of men. Second — the stage running now — Christ reveals God’s government through the church, and two kingdoms are judged against each other: the kingdom of Christ and the kingdom of the beast, both developed to their furthest point, the 144,000 on one side and the mark of the beast on the other. Third, at the end of the thousand years, the great white throne.',
					'Revelation is laid out on that frame. Chapters 1 to 3 introduce the book and the churches; 4 to 11 are the judgement of Christ’s kingdom; 12 to 19 are the judgement of the beast’s kingdom; 20 to 22 are the concluding events. The seals belong to the second stage, and the fifth seal is where that stage becomes current.',
					'Character was the question at the cross. Government is the question now — not whether God is loving, but whether his way of governing works. Love and wisdom are not the same thing, and it is the wisdom of God that the church exists to display.'
				],
				quote: {
					text: 'Now is the judgment of this world: now shall the prince of this world be cast out.',
					cite: 'John 12:31'
				}
			},
			{
				heading: 'Why the horse is gone',
				paragraphs: [
					'Up to this point every seal produced a horse. At the fifth there is no horse at all, and a change of symbol that abrupt is never decoration. Something in the subject has changed.',
					'Picture the court watching a documentary of God’s movement in the world. It runs from Adam through Noah, Abraham, the Exodus, David, the captivity, the birth of Christ, the apostolic age, the dark ages, the Reformation. At some point a film like that stops dealing with the past and reaches the present — and the people watching see themselves on the screen.',
					'That is what happens here. The four horses were recorded history, finished and filed. The fifth seal is history taking place before the eyes of the court. You cannot hand the present a symbol from the archive, so God changes the picture.'
				]
			},
			{
				heading: 'Souls under the altar',
				paragraphs: [
					'John sees an altar in heaven — most likely the altar of incense — and beneath it the souls of those slain for the word of God and for the testimony which they held. They cry with a loud voice: how long, O Lord, holy and true, before you judge and avenge our blood?',
					'None of this is literal, and it does not need to be. Revelation presents data as images, and the images rarely resemble the thing they carry. A beast is not a kingdom; a woman is not a church; a horse is not the people of God. An altar in heaven is not masonry, and the dead are not conscious — they are asleep, and they are not asking for anything.',
					'The language is the Bible’s own. When Cain killed his brother, God told him the voice of his brother’s blood was crying from the ground. Blood has no voice. What God meant is that the deed itself stood before him and pressed on him the way a cry presses on the person who hears it. As one brother put it in the class: it is what a court means by saying the evidence is overwhelming.',
					'And the cry is a question about delay. Read Foxe and the delay is unbearable — people watching their children killed in front of them, people tortured to death for their faith. When does God make that right? There is exactly one setting in which that question is not a complaint but an agenda item, and that setting is a judgement.'
				],
				quote: {
					text: 'The voice of thy brother’s blood crieth unto me from the ground.',
					cite: 'Genesis 4:10'
				}
			},
			{
				heading: 'White robes, centuries late',
				paragraphs: [
					'Then the detail that settles the whole seal: white robes were given unto every one of them. A white robe is the righteousness of Christ, and every Christian receives it the moment they accept him. These are martyrs. They died Christians. They were already wearing it.',
					'So why is a robe given to them hundreds of years after they are dead? Once a person dies nothing about them can change — not their character, not God’s estimate of them, not a line in the books. Nothing, with one exception. The one thing that can still change about the dead is their reputation.',
					'Marcus Garvey is the illustration the study used. A national hero of Jamaica who carried a criminal conviction from the United States, and whose name has been pressed for clearing long after his death. Nothing about that campaign can change what was done or the fact of the conviction. What it can change is the record’s verdict on the man — his name cleared, the charge lifted off it.',
					'That is precisely the transaction under the altar. These people were not made righteous here; they were righteous in Christ when they died. What happens here is that heaven demonstrates it — that there was never any justification for them to die as criminals, and that the world’s verdict on them was false. Their names are cleared in front of the universe. It is posthumous vindication, and posthumous vindication only happens in a courtroom. This is the strongest single evidence that the seals are the pre-advent judgement.'
				]
			},
			{
				heading: 'Rest yet for a little season',
				paragraphs: [
					'They are told to rest yet for a little season — until their fellowservants and their brethren, who should be killed as they were, should be fulfilled.',
					'Two things follow from that sentence. First, when the fifth seal opens it is not yet time for the account to be settled or for Christ to return; a season still has to run. Second, and more soberly: the number is not complete. There are still believers who will be killed as these were, in the crisis that lies ahead.',
					'That is not a detail to hurry past. The seal that vindicates the martyrs of the past is also the seal that tells the church there are martyrs still to come.'
				]
			},
			{
				heading: 'Why this is where we are standing',
				paragraphs: [
					'The case for placing ourselves inside the fifth seal is made from the sixth. The sixth seal opens with a great earthquake, the sun black as sackcloth, the moon as blood, the stars falling, the heaven departing as a scroll, and every mountain and island moved out of its place — and Christ dated that cluster of signs for us. He put them “immediately after the tribulation of those days.”',
					'Read in Revelation’s own context, that great tribulation is the final crisis over the mark of the beast. So the sixth seal comes after the tribulation — which means the tribulation itself, the testing and perfecting of the church, and the sealing of the 144,000 all fall inside the fifth seal. That is the seal now running.',
					'This also rules out the familiar dating of those signs — the Lisbon earthquake of 1755, the dark day of 1780, the Leonid meteor storm of 1833. Set the intervals side by side: twenty-five years, then more than fifty, and then nearly two centuries to now with the next event in the sequence still unfulfilled. The text describes signs in such rapid succession that everyone alive knows the great day of wrath has come. Nobody concluded that in 1755, and anyone who did is long dead. Those events may well have encouraged the brethren of 1844; they are not the fulfilment of the prophecy.',
					'And this is where the direction changes. The first four seals fell because the kingdom kept installing human government over itself. The last phase of the kingdom will be free of it — a people who follow the Lamb wherever he goes, not people who follow men. The descent stops here, and it stops for that reason.'
				],
				quote: {
					text: 'Immediately after the tribulation of those days shall the sun be darkened, and the moon shall not give her light, and the stars shall fall from heaven.',
					cite: 'Matthew 24:29'
				}
			}
		],
		keyPoints: [
			'God defends his character and government by revealing truth, not by force — so the conflict advances through judgements, three of them, and the seals belong to the second.',
			'The horses stop at the fifth seal because the record leaves the recorded past and arrives at the present.',
			'The souls under the altar are an image, not a doctrine of conscious dead: the picture follows Abel’s blood crying from the ground — the deed standing before God as a cry.',
			'“How long” is a question that only belongs in a judgement, and it registers what has felt like a long delay in justice.',
			'White robes given centuries after death can only mean reputation: the martyrs’ names cleared before the universe, which is what a court does.',
			'“Rest yet for a little season” means the number is not complete — there are believers still to be killed in the crisis ahead.',
			'Matthew 24:29 puts the sixth seal’s signs after the great tribulation, so the tribulation and the sealing of the 144,000 fall inside the fifth seal.',
			'The 1755, 1780 and 1833 datings fail on their own intervals — the text requires signs in rapid succession that convince everyone alive.',
			'The descent of the first four seals turns here, because the final phase of the kingdom follows the Lamb rather than men.'
		],
		questions: [
			'If the fifth seal is the present rather than the past, what does it mean to say the court is watching us on the screen?',
			'Why would God vindicate the reputation of the dead before settling accounts with the living?',
			'“Rest yet for a little season, until… their brethren, that should be killed as they were, should be fulfilled.” How does that sentence change how you read the crisis ahead?',
			'The descent turns only where human control ends. What would following the Lamb rather than men cost you in practice?'
		],
		related: [
			{ label: 'The fourth seal — the kingdom as a source of death', href: '/seals/fourth-seal' },
			{ label: 'The sixth seal — the cosmic signs', href: '/seals/sixth-seal' },
			{ label: 'The 144,000 — sealed under this seal', href: '/the-144000' },
			{ label: 'The beast and the kingdom judged against Christ’s', href: '/beast' }
		]
	},

	'sixth-seal': {}
	// The seventh seal has no entry: it lives at /seventh-seal, and its
	// trumpets are written up in trumpet-details.js.
};

/**
 * Detail for one seal, always an object so callers can read fields without
 * guarding first.
 * @param {string} id
 */
export function getSealDetail(id) {
	return SEAL_DETAILS[id] ?? {};
}

/**
 * Whether a seal has any long-form content yet — decides between the full
 * study and the "in preparation" state.
 * @param {Record<string, any>} detail
 */
export function hasDetail(detail) {
	return Boolean(
		detail?.passage ||
			detail?.summary ||
			detail?.sections?.length ||
			detail?.keyPoints?.length ||
			detail?.questions?.length
	);
}
