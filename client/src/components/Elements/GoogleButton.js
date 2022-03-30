import React from 'react';
import styled from 'styled-components';

const GoogleButton = ({ children, onClick }) => {
	return (
		<StyledGoogleButton onClick={onClick}>
			<GoogleIcon src='/assests/google.png' />
			<Text> {children}</Text>
		</StyledGoogleButton>
	);
};

export default GoogleButton;

const StyledGoogleButton = styled.button`
	height: 40px;
	width: 300px;
	border-width: 0;
	margin: 0 auto;
	background: #000;
	color: #737373;
	border-radius: 5px;
	white-space: nowrap;
	box-shadow: 1px 1px 0px 1px rgba(0, 0, 0, 0.05);
	transition-property: background-color, box-shadow;
	transition-duration: 150ms;
	transition-timing-function: ease-in-out;
	padding: 0;
	cursor: pointer;

	&:focus,
	&:hover {
		box-shadow: 1px 4px 5px 1px rgba(0, 0, 0, 0.1);
	}

	&:active {
		background-color: #e5e5e5;
		box-shadow: none;
		transition-duration: 10ms;
	}
`;

const GoogleIcon = styled.img`
	display: inline-block;
	vertical-align: middle;
	margin: 8px 20px 8px 0px;
	width: 25px;
	height: 25px;
	box-sizing: border-box;
`;
const Text = styled.p`
	display: inline-block;
	vertical-align: middle;
	padding: 0 4px 0 24px;
	font-size: 14px;
	font-weight: bold;
	font-family: 'Dancing Script', cursive;
`;
