import React, { useState } from 'react';
import GameBoard from './GameBoard';
import axios from 'axios';
import '../style/style.css';

const MakeRequest = () => {
	const [ urls, setUrls ] = useState([]);
	const [ playGame, setPlayGame ] = useState(false);

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

	const resultUrls = [ ...urls, ...urls ];

	return (
		<div className="flex-container">
			<button className="game-btn" onClick={handleClick} disabled={playGame} style={{ opacity }}>
				Play Game
			</button>

			<GameBoard urls={resultUrls} />
		</div>
	);
};

export default MakeRequest;
