import React, { useState, useEffect } from 'react';
import '../style/style.css';
import Card from './Card';

const GameBoard = ({ urls }) => {
	const [ isFlipped, setIsFlipped ] = useState(false);
	const [ openedCard, setOpenedCard ] = useState([]);
	const [ matched, setMatched ] = useState([]);

	const flipcard = (index) => {
		setOpenedCard((opened) => [ ...opened, index ]);
		if (openedCard < 2) return;

		const firstMatched = urls[openedCard[0]];
		const secondMatched = urls[openedCard[1]];

		if (secondMatched && firstMatched.id === secondMatched.id) {
			setMatched([ ...matched, firstMatched.id ]);
		}

		if (openedCard.length === 2) setTimeout(() => setOpenedCard([]), 1000);
	};

	return (
		<div className="flex-container">
			{urls.map((url, index) => {
				if (openedCard.includes(index)) {
					setIsFlipped(true);
				}

				if (matched.includes(url.id)) {
					setIsFlipped(true);
				}

				return (
					<Card
						key={index}
						src={url.src}
						id={url.id}
						isFlipped={isFlipped}
						flipcard={flipcard}
						index={index}
					/>
				);
			})}
		</div>
	);
};

export default GameBoard;
