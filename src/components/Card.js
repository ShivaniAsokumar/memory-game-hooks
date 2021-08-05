import React, { useState } from 'react';
import ReactCardFlip from 'react-card-flip';
import frontCard from '../images/front.jpg';
import '../style/style.css';

const Card = ({ src, id, parentCallback }) => {
	const [ isFlipped, setFlipped ] = useState(false);
	const [ flipSpeedFrontToBack, setFlipSpeedFrontToBack ] = useState(0.4);
	const [ flipSpeedBackToFront, setFlipSpeedBackToFront ] = useState(0.4);
	const [ flipDirection, setFlipDirection ] = 'horizontal';

	const handleClick = (e) => {
		e.preventDefault();
		console.log(isFlipped);
		setFlipped(!isFlipped);
		parentCallback(isFlipped);
	};

	return (
		<ReactCardFlip
			key={id}
			isFlipped={isFlipped}
			flipDirection={flipDirection}
			flipSpeedBackToFront={flipSpeedBackToFront}
			flipSpeedFrontToBack={flipSpeedFrontToBack}>
			<div className="flex-item" onClick={handleClick}>
				<img className="front-image" src={frontCard} />
			</div>
			<div className="flex-item" onClick={handleClick}>
				<img src={src} alt="back" />
			</div>
		</ReactCardFlip>
	);
};

export default Card;
