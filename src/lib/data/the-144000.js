// The hundred and forty and four thousand — Revelation 7, read in its place.
//
// Chapter 6 ends with a question the wicked ask: the great day of his wrath is
// come, and who shall be able to stand? God puts the question in the vision
// because he intends to answer it, and chapter 7 is the answer. Everything on
// this page hangs on that: the sealed company is the company that stands in the
// day of wrath, so the sealing has to happen before that day and nowhere else.
//
// The page is built from this file. Each exported block is one movement of the
// study, in the order a reader meets it.

export const TITLE = 'The 144,000';
export const SUBTITLE =
	'Chapter 6 ends with a question. Chapter 7 is the answer - and it answers by naming the company that will be standing when the day of wrath falls.';

/** The question the chapter exists to answer. */
export const QUESTION = {
	quote: 'For the great day of his wrath is come; and who shall be able to stand?',
	refs: 'Revelation 6:17',
	notes: [
		'Nothing in the vision is filler. Revelation is not a recording of things that happened to be said - it is a vision God composed, and every word spoken in it is a word he put there. So when he has the great men of the earth cry out and ask who shall be able to stand, he is not decorating the scene. He is asking the reader a question, the way a teacher asks a question: to make the mind reach for the answer.',
		'The wrath of God has a fixed meaning in this book. I saw another sign in heaven, great and marvellous, seven angels having the seven last plagues; for in them is filled up the wrath of God. Wherever the wrath of God appears in Revelation, the seven last plagues are what is meant.',
		'So the question is: who will come through the seven last plagues? And the answer begins in the very next verse, because there are no chapter divisions in the original - John never wrote a chapter seven. The four angels holding the winds follow straight on from the question.'
	],
	pivot:
		'Read the question first and the 144,000 stop being a puzzle taken out of the blue. They are the answer to a question already asked: these are the ones who will be able to stand.'
};

/** Where the sealing falls in the sequence of the seals. */
export const PLACEMENT = {
	lede: 'The seals run in order, and the sealing is not loose in that order. It happens in one window and no other.',
	steps: [
		{ era: '1st', title: 'White horse', note: 'The church in its purity, the apostolic age.' },
		{ era: '2nd', title: 'Red horse', note: 'The age of compromise; blood in the empire.' },
		{ era: '3rd', title: 'Black horse', note: 'The age when the word of God was sold cheap.' },
		{ era: '4th', title: 'Pale horse', note: 'The public church become an instrument of death.' },
		{
			era: '5th',
			title: 'The souls under the altar',
			note: 'The pre-advent judgement. White robes are given, the downward course is halted, and the great tribulation runs its length.',
			here: 'The sealing happens here'
		},
		{
			era: '6th',
			title: 'The day of wrath',
			note: 'Earthquake, sun black, moon as blood, stars fallen - and the question: who shall be able to stand?'
		},
		{ era: '7th', title: 'The seven last plagues', note: 'The wrath itself, and then the coming of Christ.' }
	],
	flashback:
		'Chapter 7 is a flashback. Chapter 6 has already carried the reader into the sixth seal; chapter 7 turns back to show what had to happen first, under the fifth. This is the same device the book uses elsewhere - the narrative reaches a crisis, then steps back to show how the people in it were prepared.',
	consequences: [
		{
			term: 'Not in every age',
			meaning: 'The sealing sits in one slot. It is not going on under the white horse, nor the red, nor the black, nor the pale. A company sealed in that window cannot be the saved of all ages.'
		},
		{
			term: 'Not behind us',
			meaning: 'It cannot be a company that finished in 1844, or went to heaven in 1914. The winds are still being held when the sealing is done, and the winds have not been loosed.'
		},
		{
			term: 'Not yet begun to fall',
			meaning: 'Hurt not the earth, neither the sea, nor the trees, till we have sealed the servants of our God. Whatever trouble is in the earth now, the plagues cannot begin until the sealing is finished.'
		}
	]
};

/** The four winds, and why they are being held. */
export const WINDS = {
	quote: 'And after these things I saw four angels standing on the four corners of the earth, holding the four winds of the earth, that the wind should not blow on the earth, nor on the sea, nor on any tree.',
	refs: 'Revelation 7:1',
	witnesses: [
		{
			quote: 'Behold, a whirlwind of the LORD is gone forth in fury, even a grievous whirlwind: it shall fall grievously upon the head of the wicked.',
			refs: 'Jeremiah 23:19'
		},
		{
			quote: 'Behold, evil shall go forth from nation to nation, and a great whirlwind shall be raised up from the coasts of the earth. And the slain of the LORD shall be at that day from one end of the earth even unto the other end of the earth: they shall not be lamented, neither gathered, nor buried.',
			refs: 'Jeremiah 25:32–33'
		}
	],
	reading: [
		'The wind, in the prophets, is trouble let loose - trouble that travels from nation to nation and leaves the slain unburied from one end of the earth to the other. Four angels holding four winds is that trouble restrained: it is ready, and it is not permitted.',
		'The restraint has a purpose and the angel states it. Another angel ascends from the east with the seal of the living God and cries to the four who have power to hurt: hold, till we have sealed the servants of our God in their foreheads. The day of wrath waits on the sealing of God’s people, and not the other way round.'
	]
};

/** What a seal is, before asking what this seal is. */
export const SEAL_SENSES = [
	{
		term: 'A mark of approval',
		meaning: 'A king’s seal on a decree makes it the king’s own and puts it beyond reversal. It was written in the name of king Ahasuerus, and sealed with the king’s ring - and the writing which is sealed with the king’s ring, may no man reverse. Darius sealed the stone on the lions’ den the same way.',
		refs: 'Esther 3:12 · Esther 8:8 · Daniel 6:17'
	},
	{
		term: 'A guarantee',
		meaning: 'In whom also after that ye believed, ye were sealed with that holy Spirit of promise. A seal in this sense is a deposit - God’s own pledge that the one sealed is accepted by him.',
		refs: 'Ephesians 1:13 · 2 Corinthians 1:22'
	},
	{
		term: 'A statement of completeness',
		meaning: 'A letter is sealed when it is finished. Nothing further is to be added, and nothing is to interfere with it from that point forward. In Revelation this is the weight the word carries.',
		refs: 'Daniel 12:4 · Revelation 22:10'
	}
];

/** Why the seal of Revelation 7 is not the seal of the Spirit. */
export const SECOND_SEAL = {
	lede: 'The seal of God is often read straight off Ephesians 1:13 and made to mean the Holy Spirit. In the setting of salvation that is exactly what it means. In Revelation it cannot be.',
	reasons: [
		{
			term: 'These are already God’s people',
			meaning: 'They are sealed of all the tribes of the children of Israel - which is to say they are inside the kingdom before the angel reaches them. Every born-again Christian is already sealed with the Spirit of promise. Out of those already sealed, a company is now sealed again.'
		},
		{
			term: 'That seal belongs to every age',
			meaning: 'The sealing of the Spirit has been the portion of every Christian since the apostles. This one happens in a single window while four angels hold the winds. A seal given to all cannot be the seal given to some, at one moment, for one crisis.'
		},
		{
			term: 'It is set against the mark of the beast',
			meaning: 'Revelation names two marks and one stands opposite the other. The seal here is defined by the conflict it belongs to - the last crisis, not the ordinary standing of a believer before God.'
		},
		{
			term: 'Revelation is not asking who will be saved',
			meaning: 'The book is about the kingdom brought to its perfection and put on display. The question at the end of chapter 6 is not who is forgiven; it is who will be standing. A seal answering that question is a different seal.'
		}
	]
};

/** What the seal itself is. */
export const THE_MARK = {
	quote: 'And I looked, and, lo, a Lamb stood on the mount Sion, and with him an hundred forty and four thousand, having his Father’s name written in their foreheads.',
	refs: 'Revelation 14:1',
	reading: [
		'The seal is the Father’s name in the forehead, and a name in scripture is a character. Nobody is going about stamping foreheads. Neither the seal nor the mark of the beast is ink; both are seen, and both are seen in behaviour.',
		'It has to be visible, or the contrast the book is drawing has no force - God is setting one company in plain sight against another. But because it is visible as conduct and not as a stamp, there is room to refuse it. When John came, Jesus said this is Elijah, and those who did not wish to see it said it was John and not Elijah. God works this way throughout: enough light for those who want to see, and enough room for those who do not.',
		'What the conduct is, the book keeps saying. Above all these things put on charity, which is the bond of perfectness. By this shall all men know that ye are my disciples, if ye have love one to another. Now abideth faith, hope, charity, these three; but the greatest of these is charity. The seal of God is the love of God worked out in his people, and it will be so marked that the world has to notice it.',
		'The church that answers to this company is Philadelphia, and Philadelphia is brotherly love. That is not a coincidence of names. It is the same subject twice.',
		'Which fixes the mark of the beast as well, and not as most would guess. The opposite of brotherly love is not hatred; it is love of self. That was Lucifer’s fall - not that he began by hating anyone, but that he became the centre of his own world. Hatred is only what self-love looks like once it is crossed.'
	],
	pair: [
		{
			term: 'The seal of God',
			meaning: 'Brotherly love, made visible. The character of God reproduced in people, so plainly that an honest onlooker has to account for it.',
			refs: 'Revelation 14:1 · Revelation 3:7–12 · John 13:35 · Colossians 3:14'
		},
		{
			term: 'The mark of the beast',
			meaning: 'Self-love, made visible. The same faculty turned inward, worked out in a way of living that the last crisis brings into the open.',
			refs: 'Revelation 13:16–17 · Isaiah 14:13–14 · 2 Timothy 3:1–4'
		}
	]
};

/** The tribe list, and the two names that are not in it. */
export const TRIBES = {
	lede: 'The list is given tribe by tribe, twelve thousand apiece. Read it against Israel’s own inheritance and it does not match - and the mismatch is deliberate.',
	list: [
		{ name: 'Juda', note: 'First, though not the firstborn - the tribe of the Lion and of Christ.' },
		{ name: 'Reuben' },
		{ name: 'Gad' },
		{ name: 'Aser' },
		{ name: 'Nepthalim' },
		{ name: 'Manasses', note: 'Joseph’s son, kept in the list.' },
		{ name: 'Simeon' },
		{ name: 'Levi', note: 'Restored. Levi held no inheritance in Israel; the tribe was the priesthood, scattered among the rest.' },
		{ name: 'Issachar' },
		{ name: 'Zabulon' },
		{ name: 'Joseph', note: 'Restored under his own name, after being replaced in Israel by his two sons.' },
		{ name: 'Benjamin' }
	],
	absent: [
		{
			name: 'Ephraim',
			note: 'Joseph’s other son, and one of the twelve that held land. Ephraim is joined to idols: let him alone.'
		},
		{
			name: 'Dan',
			note: 'One of the twelve that held land, and the place where Israel set up a calf for the people to go and worship.'
		}
	],
	reading: [
		'Jacob had twelve sons, but the twelve tribes that held land were not those twelve. Levi was given no inheritance - the tribe stood by God at Sinai when the rest went after the calf, and was given the priesthood instead of a portion. And Joseph was given a double portion, which meant his two sons, Ephraim and Manasseh, took his place on the list.',
		'Revelation undoes both changes and makes two more. Levi comes back. Joseph comes back under his own name. Ephraim and Dan are gone. The total is still twelve - the number is being kept on purpose - but the twelve are not Israel’s twelve.',
		'The reason offered for the two omissions, and it is offered as a suggestion and not a settled case, is that these were the two tribes most given to idolatry. If that is why, then the list is saying something about idolatry costing everything. What the list certainly is not is a census. A roll call of literal Israel that excludes every Ephraimite and every Danite is not a roll call of literal Israel at all.'
	]
};

/** Why the number is not a headcount. */
export const NOT_A_NUMBER = [
	{
		term: 'Numbers in Revelation state characteristics',
		meaning: 'The Lamb has seven horns and seven eyes. Nobody counts them: seven is completeness, and the verse itself glosses the eyes as the seven Spirits of God sent into all the earth. In that day seven women shall take hold of one man - and the women are not women, so the seven is not seven. The book uses number as description.',
		refs: 'Revelation 5:6 · Isaiah 4:1'
	},
	{
		term: 'Twelve is the kingdom',
		meaning: 'Twelve tribes, twelve apostles, twelve gates, twelve foundations. When the eleven were left, the number was made up to twelve again. A hundred and forty-four thousand is twelve twelves, thousandfold - the kingdom squared and complete. That is the kingdom perfected, stated as arithmetic.',
		refs: 'Revelation 21:12–14 · Acts 1:26'
	},
	{
		term: 'A literal figure would teach nothing',
		meaning: 'Ask what is gained by knowing the tally is 144,000 rather than 143,999. Nothing follows from it, nobody can verify it, and God does not fill the vision with information that leads nowhere. Read as the perfected kingdom the number teaches something immediately.',
		refs: 'Revelation 1:1'
	},
	{
		term: 'A literal figure would be a fixed roll',
		meaning: 'If the number is exact then the company is settled beforehand - not one more can be added when it is full, and God cannot close the matter while one is short. That is predestination, and it leaves a reader nothing to desire and nothing to do.',
		refs: '2 Peter 3:9 · Revelation 22:17'
	},
	{
		term: 'A literal figure implies literal Jews',
		meaning: 'The two stand or fall together. If the count is exact then the tribes are bloodlines; if the tribes are bloodlines then Ephraim and Dan are excluded by name, which no one is willing to hold.',
		refs: 'Revelation 7:5–8'
	},
	{
		term: 'John only heard it',
		meaning: 'I heard the number of them which were sealed. He never counted them. When he turns and looks, what he reports is a multitude no man could number - so the only figure in the passage is the one the voice gave, and a figure given by the voice of God is a figure with a meaning in it.',
		refs: 'Revelation 7:4, 9'
	}
];

/** Why the tribes are not bloodlines. */
export const NOT_JEWS = [
	{
		term: 'The list excludes two tribes of Israel',
		meaning: 'Taken literally, every descendant of Ephraim and every descendant of Dan is shut out by name. As a statement about literal Israel that is not reasonable; as a statement about idolatry it reads at once.'
	},
	{
		term: 'Revelation is symbolic by nature',
		meaning: 'Babylon is not Babylon. Egypt is not Egypt. Jerusalem is not Jerusalem. In a book where the first assumption must be that a name is a symbol, Israel is not the one exception. Anyone reading a thing literally here owes a reason for it.'
	},
	{
		term: 'Revelation speaks Old Testament and means New',
		meaning: 'Armageddon, Euphrates, Sion, the tribes - the images all come from the old covenant and are to be carried across into new covenant meaning. It is how the Lamb is recognised as Christ. In the New Testament, Israel means those who are Christ’s.',
		refs: 'Galatians 3:29 · Romans 2:28–29'
	},
	{
		term: 'The seals are one consistent subject',
		meaning: 'The four horsemen, the souls under the altar and the sealed company are successive states of one thing: the kingdom of Christ. The chapter cannot switch to a Jewish remnant while everything around it is about the church.'
	},
	{
		term: 'And when John looks, they are from everywhere',
		meaning: 'A great multitude of all nations, and kindreds, and people, and tongues. This is the strongest evidence of all, and it is in the passage itself.',
		refs: 'Revelation 7:9'
	}
];

/** The readings this one displaces, and why each fails. */
export const MISREADINGS = [
	{
		claim: 'The pioneers of 1844, and Ellen White among them, are of the 144,000.',
		fails: 'The sealing is done while the winds are held, under the fifth seal, before the sixth. A company that finished dying in the nineteenth century was not in that window. The 144,000 are described as those who do not die - they pass through the great tribulation alive - and the conditions in Revelation 7 are specific enough to settle it.'
	},
	{
		claim: 'The 144,000 went to heaven in 1914, with a remnant still on earth.',
		fails: 'Same objection, same window. And the plagues have not fallen, so the winds have not been loosed, so the sealing this chapter describes has not yet finished.'
	},
	{
		claim: 'They are literal Jews chosen out of Israel.',
		fails: 'The list omits Ephraim and Dan, the book is symbolic throughout, Israel in the New Testament means those who are Christ’s - and John, looking at them, sees every nation on earth.'
	},
	{
		claim: 'They represent everybody who will ever be saved, from Adam onward.',
		fails: 'The sealing occupies one slot in a sequence of seven. Nothing is being sealed under the white horse or the black. The company answers a question about one day, and it is not a roll of the redeemed of all ages.'
	},
	{
		claim: 'The number is a quota to be gathered out of one denomination.',
		fails: 'It has produced a great deal of confusion and no small cruelty. The number is the kingdom perfected, not a target; and what John saw was a crowd out of all nations, kindreds, people and tongues.'
	}
];

/** The great tribulation, and the missing article. */
export const TRIBULATION = {
	quote: 'These are they which came out of great tribulation, and have washed their robes, and made them white in the blood of the Lamb.',
	refs: 'Revelation 7:14',
	article:
		'Every other translation, and the Greek behind the King James itself, has the article: these are they which came out of the great tribulation. The word is in the text the translators worked from, and leaving it out changes the sense. Great tribulation, without the article, could take in every believer from Abel onward - all that will live godly in Christ Jesus shall suffer persecution, and the ages are full of it. The great tribulation is one particular time.',
	witnesses: [
		{
			quote: 'And at that time shall Michael stand up... and there shall be a time of trouble, such as never was since there was a nation, even to that same time: and at that time thy people shall be delivered, every one that shall be found written in the book.',
			refs: 'Daniel 12:1'
		},
		{
			quote: 'For then shall be great tribulation, such as was not since the beginning of the world to this time, no, nor ever shall be.',
			refs: 'Matthew 24:21'
		},
		{
			quote: 'Immediately after the tribulation of those days shall the sun be darkened, and the moon shall not give her light, and the stars shall fall from heaven, and the powers of the heavens shall be shaken.',
			refs: 'Matthew 24:29'
		}
	],
	reading: [
		'Take that last verse to Revelation and it places itself. Sun darkened, moon without light, stars fallen, the powers of heaven shaken - that is the sixth seal. And Jesus says it comes immediately after the tribulation of those days. So the great tribulation runs under the fifth seal, in the time of the judgement, and it is the time in which the mark of the beast is enforced.',
		'Matthew and Revelation are telling one story at different resolutions. Jesus says: after the tribulation, these signs, then the sign of the Son of man. Revelation adds what sits between - the day of wrath, the seven last plagues - and then the coming.',
		'So the company standing before the throne in chapter 7 are the ones who come through that. They are not in heaven yet; the vision shows them there because that is where they belong in point of privilege, and because it is where they are going.'
	]
};

/** Two companies, two ways of receiving a white robe. */
export const ROBES = {
	lede: 'White robes are handed out twice in these two chapters, and the difference in how they come is the whole point.',
	pair: [
		{
			term: 'Given',
			who: 'The souls under the altar',
			meaning: 'And white robes were given unto every one of them, and it was said unto them, that they should rest yet for a little season, until their fellowservants also and their brethren, that should be killed as they were, should be fulfilled. They receive; they are not party to the process. They are asleep while it is done.',
			refs: 'Revelation 6:11'
		},
		{
			term: 'Washed',
			who: 'The sealed company',
			meaning: 'They have washed their robes, and made them white in the blood of the Lamb. The verb has them in it. They are alive, and they go through what whitens the robe.',
			refs: 'Revelation 7:14'
		}
	],
	reading: [
		'This is not the robe a Christian receives at the beginning. That robe - justification, the clean slate, God’s acceptance of a person as they are - every believer already has, and Revelation is not handing it out again. Revelation is about judgement, and judgement is not God consulting his own knowledge. If God’s private knowledge were the issue there would be no need of a judgement at all, now or after the thousand years. The judgement is public: God’s justice put on display.',
		'So the souls under the altar are seen to be righteous, and the robe says so before the watching universe. And the living company, who already have the first robe, are given the second in the same court and for the same reason - their characters are tried, purified, and then seen.',
		'Which is why the tribulation is not incidental to them. It is the means. A character is not proved in peace and safety, and the last generation is put through the fire because that is what fire is for. It is God’s washing machine - and it is one thing to put clothes in a washing machine, and another thing to be wearing them.'
	]
};

/** What the washing actually removes. */
export const BLOTTING = {
	quote: 'For on that day shall the priest make an atonement for you, to cleanse you, that ye may be clean from all your sins before the LORD.',
	refs: 'Leviticus 16:30',
	reading: [
		'Perfection here is not the ground of anybody’s salvation. The dead under the altar never reached it and they are as saved as anyone - saved by grace, through faith in Christ, exactly as the living are. So why is this company perfected? Not in order to be saved. It is God saying to Satan and to the universe: this is what the grace of Jesus Christ is able to do.',
		'And what is taken away is the residue of sin, which is the part no amount of effort has ever reached. The memory of what was done. The habits formed. The reflexes in the body. People have been told to fight harder since 1844, and fighting harder does not delete a memory. God does.',
		'A mind is the nearest thing there is to a hard drive. Some things you delete can be recovered; some can be wiped so that nothing recalls them. God says our sins and iniquities he will remember no more, and he will wipe away all tears from their eyes - and a saved murderer is not going to spend eternity remembering the blood. That cleansing is the work of the day of atonement, and it is what the sealing is.',
		'For those who die, it is done while they sleep - the robe is given. For those who live through the great tribulation, it is done while they stand - the robe is washed. Both end in the same place. One of them is harder.'
	],
	feasts: [
		{ term: 'Passover', meaning: 'The penalty of sin. Christ took the guilt.', refs: 'Exodus 12 · 1 Corinthians 5:7' },
		{ term: 'Pentecost', meaning: 'The power of sin. The Spirit given, so that sin no longer rules.', refs: 'Acts 2 · Romans 6:14' },
		{ term: 'Day of atonement', meaning: 'The pollution of sin. The mind cleansed of the memories and the habit patterns.', refs: 'Leviticus 16 · Daniel 8:14' },
		{ term: 'Tabernacles', meaning: 'The presence of sin. Taken out of it altogether.', refs: 'Leviticus 23:34 · Revelation 21:3' }
	],
	closing:
		'Sanctification is walking with God, and it goes on as long as we live - growing, maturing, learning. What it is not is a ladder to perfection. Nothing in human experience was ever made permanent except by a miracle: the new birth is a miracle, the changed body is a miracle, and the cleansed mind is a miracle too. It is the work of Christ from end to end, and all of it in the fullness of the time.'
};

/** Day and night in his temple. */
export const TEMPLE = {
	chain: [
		{
			quote: 'Therefore are they before the throne of God, and serve him day and night in his temple: and he that sitteth on the throne shall dwell among them.',
			refs: 'Revelation 7:15'
		},
		{
			quote: 'Him that overcometh will I make a pillar in the temple of my God, and he shall go no more out.',
			refs: 'Revelation 3:12 · to Philadelphia'
		},
		{
			quote: 'And I saw no temple therein: for the Lord God Almighty and the Lamb are the temple of it.',
			refs: 'Revelation 21:22'
		}
	],
	reading: [
		'Taken flatly, standing in a building day and night without leaving sounds like a dull eternity. Then the last verse takes the building away. There is no temple in the city, because the Lord God Almighty and the Lamb are the temple of it.',
		'So the promise is not a post. It is a permanent joining to God and to Christ - a pillar in that temple, and he shall go no more out. The same promise is made to Philadelphia and to this company, because they are the same company. What is being described is a relationship that does not end.'
	],
	promises: {
		quote: 'They shall hunger no more, neither thirst any more; neither shall the sun light on them, nor any heat. For the Lamb which is in the midst of the throne shall feed them, and shall lead them unto living fountains of waters: and God shall wipe away all tears from their eyes.',
		refs: 'Revelation 7:16–17',
		note: 'Hunger, thirst, and the beating sun are named because they are the conditions of the time this company came through - the tribulation, and the trouble in the wake of the plagues. God protects his people in it, but they pass through it. Having come out, they will not meet it again. And the tears wiped away are, again, the memories that would have caused them.'
	}
};

/** What the company is, stated plainly. */
export const VERDICT = {
	lede: 'The kingdom has been going downhill for four horsemen - white, red, black, pale - because men were allowed to take charge of the church. At the judgement the descent stops. The souls under the altar are vindicated, and from there the line goes up.',
	points: [
		'The 144,000 are the top of that line: the kingdom of God perfected. Twelve twelves, thousandfold. Not a quota, not a bloodline, not a roll of the ages - a company, sealed in one window of time, in whom God finishes what he started.',
		'They are the answer to the question at the end of chapter 6. They are the ones who will be standing when the winds are loosed.',
		'And they are an exhibit. The mark of the beast is the pinnacle of Satan’s kingdom; this is the crown jewel of God’s - his answer, in people, to everything that has been said against him. Which is worth understanding even by a reader who never expects to be counted in it, and worth more than understanding by one who hopes to be.'
	]
};
