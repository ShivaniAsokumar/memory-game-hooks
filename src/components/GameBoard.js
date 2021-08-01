import React, { useState } from 'react';
import '../style/style.css';
import ReactCardFlip from 'react-card-flip';
import Card from './Card';

const GameBoard = ({ urls }) => {
	console.log(urls);
	return (
		<div className="flex-container">{urls.map((url, index) => <Card key={index} src={url.src} id={url.id} />)}</div>
	);
};

export default GameBoard;
