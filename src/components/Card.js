import React, { useState } from 'react';
import ReactCardFlip from 'react-card-flip';
import frontCard from '../images/front.jpg';
import '../style/style.css';

const Card = ({ src, id, isFlipped, flipcard, index }) => {
	const flipSpeedFrontToBack = 0.4;
	const flipSpeedBackToFront = 0.4;
	const flipDirection = 'horizontal';

	return (
		<ReactCardFlip
			key={id}
			isFlipped={isFlipped}
			flipDirection={flipDirection}
			flipSpeedBackToFront={flipSpeedBackToFront}
			flipSpeedFrontToBack={flipSpeedFrontToBack}>
			<div className="flex-item" onClick={() => flipcard(index)}>
				<img className="front-image" src={frontCard} />
			</div>
			<div className="flex-item">
				<img src={src} alt="back" />
			</div>
		</ReactCardFlip>
	);
};
export default Card;
