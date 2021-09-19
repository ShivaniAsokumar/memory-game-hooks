import React, { useState, useEffect, useCallback } from 'react';
import ReactCardFlip from 'react-card-flip';
import axios from 'axios';
import frontCard from '../images/front.jpg';
import '../style/style.css';

const MakeRequest = () => {
	const [ urls, setUrls ] = useState([]);
	const [ playGame, setPlayGame ] = useState(false);

	const [ openedCard, setOpenedCard ] = useState([]);
	const [ matched, setMatched ] = useState([]);

	const flipSpeedFrontToBack = 0.4;
	const flipSpeedBackToFront = 0.4;
	const flipDirection = 'horizontal';

	const shuffle = (array) => {
		let currentIndex = array.length,
			randomIndex;

		// While there remain elements to shuffle...
		while (currentIndex != 0) {
			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex--;

			// And swap it with the current element.
			[ array[currentIndex], array[randomIndex] ] = [ array[randomIndex], array[currentIndex] ];
		}

		return array;
	};

	let opacity;
	const handleClick = async (e) => {
		e.preventDefault();

		await axios
			.get(`https://api.unsplash.com/search/photos`, {
				params: {
					query: 'background',
					page: '1',
					per_page: '12',
					orientation: 'squarish'
				},
				headers: {
					Authorization: 'Client-ID hWxI9JoKVNOGLNWErte_lj6NeVdZVygSeRrF-T0AMfc'
				}
			})
			.then((res) => {
				const results = res.data.results; // Getting the data from the API request

				// Duplicating results so that each card has a matching pair
				const pairsOfCards = [ ...results, ...results ];
				shuffle(pairsOfCards);

				// Iterating through the cards and adding their src and id to the state
				let urlObject = {};
				for (let image of pairsOfCards) {
					urlObject = { src: image.urls.small, id: image.id };
					const addUrls = [ ...urls ];
					addUrls.push(urlObject);
					setUrls((urls) => urls.concat(addUrls));
				}
				// Helps disable the Play Game button
				setPlayGame(!playGame);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	if (playGame === true) {
		opacity = '0.5';
	}

	const flipcard = (index) => {
		setOpenedCard((opened) => [ ...opened, index ]);
	};

	useEffect(
		() => {
			if (openedCard.length < 2) return;

			const firstMatched = urls[openedCard[0]];
			const secondMatched = urls[openedCard[1]];

			if (secondMatched && firstMatched.id === secondMatched.id) {
				setMatched([ ...matched, firstMatched.id ]);
			}

			if (openedCard.length === 2) setTimeout(() => setOpenedCard([]), 1000);
		},
		[ openedCard ]
	);

	return (
		<div className="flex-container">
			<button className="game-btn" onClick={handleClick} disabled={playGame} style={{ opacity }}>
				Play Game
			</button>

			<div className="flex-container">
				{urls.map((url, index) => {
					let isFlipped = false;

					if (openedCard.includes(index)) {
						isFlipped = true;
					}

					if (matched.includes(url.id)) {
						isFlipped = true;
					}

					return (
						<ReactCardFlip
							key={url.index}
							isFlipped={isFlipped}
							flipDirection={flipDirection}
							flipSpeedBackToFront={flipSpeedBackToFront}
							flipSpeedFrontToBack={flipSpeedFrontToBack}>
							<div className="flex-item" onClick={() => flipcard(index)}>
								<img className="front-image" src={frontCard} alt="front" />
							</div>
							<div className="flex-item">
								<img src={url.src} alt="back" />
							</div>
						</ReactCardFlip>
					);
				})}
			</div>
		</div>
	);
};

export default MakeRequest;
