import React, { useState, useEffect } from 'react';
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
				const results = res.data.results;
				let urlObject = {};

				for (let image of results) {
					urlObject = { src: image.urls.small, id: image.id };
					const addUrls = [ ...urls ];
					addUrls.push(urlObject);
					setUrls((urls) => urls.concat(addUrls));
				}
				const copy = [ ...urls ];
				setUrls((urls) => urls.concat(copy));
				setPlayGame(!playGame);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	if (playGame === true) {
		opacity = '0.5';
	}

	const images = [ ...urls, ...urls ];

	const flipcard = (index) => {
		setOpenedCard((opened) => [ ...opened, index ]);
	};

	useEffect(
		() => {
			if (openedCard.length < 2) return;

			const firstMatched = images[openedCard[0]];
			const secondMatched = images[openedCard[1]];

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
				{images.map((url, index) => {
					let isFlipped = false;

					if (openedCard.includes(index)) {
						isFlipped = true;
					}

					if (matched.includes(url.id)) {
						isFlipped = true;
					}

					return (
						<ReactCardFlip
							key={url.id}
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
