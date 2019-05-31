import React from 'react';
import '../../App.css';

export default function Spinner() {
	return (
		<React.Fragment>
			<h1 style={{ width: '200px', margin: 'auto', display: 'block' }}>
				<div className="loader" />
			</h1>
		</React.Fragment>
	);
}
