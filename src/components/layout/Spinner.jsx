import React from 'react';
import '../../App.css';

export default function Spinner() {
	return (
		<React.Fragment>
			<h1
				style={{
					width: '200px',
					margin: 'auto',
					display: 'block',
					top: '50%',
					left: '50%',
					position: 'absolute',
				}}>
				<div className="loader" />
			</h1>
		</React.Fragment>
	);
}
