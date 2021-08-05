import React, { useState } from 'react';
import '../style/style.css';
import ReactCardFlip from 'react-card-flip';
import Card from './Card';

const GameBoard = ({ urls }) => {
	// Display PAIRS of cards.
	// Cards need to be in random order.
	// User clicks two cards, they both have to flip.
	// How do I access isFlipped from Card.
	const callBack = (flipped) => {
		return flipped;
	};

	return (
		<div className="flex-container">
			{urls.map((url, index) => <Card key={index} src={url.src} id={url.id} parentCallback={callBack} />)}
		</div>
	);
};

export default GameBoard;
