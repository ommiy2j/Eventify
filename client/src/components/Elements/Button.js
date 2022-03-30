import React from 'react';
import styled, { css, keyframes } from 'styled-components';

const Button = ({ children, onClick, loading, color }) => {
	// console.log(loading);
	return (
		<StyledButton loading={loading} onClick={onClick} color={color}>
			<span>{children}</span>
		</StyledButton>
	);
};

export default Button;

const loadingKeyframes = keyframes`
  0% {
    transform: translateX(25px);
  }
  100% {
    transform: translateX(-20px);
  }
`;

const loadingButton = css`
	&::before {
		content: "";
		position: absolute;
		z-index: 1;
		top: 0;
		left: -100%;
		width: 300%;
		height: 100%;
		background: #126e82 repeating-linear-gradient(60deg, transparent, transparent 10px, #1687a7 10px, #1687a7 20px);
		animation: ${loadingKeyframes} 1s infinite linear;
	}
	& > span {
		opacity: 0.5;
	}
	cursor: wait;
`;

const StyledButton = styled.button`
	position: relative;
	overflow: hidden;
	width: 150px;
	height: 37px;
	background-color: ${(p) => p.color};

	border: 2px solid #1687a7;
	border-radius: 2px;
	color: #1687a7;
	font-size: 1rem;
	cursor: pointer;
	letter-spacing: 0.8px;
	transition: background-color transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
	margin: 0 auto;
	transition-duration: 0.35s;
	margin: 0 auto;
	&:active {
		transform: scale(0.9);
	}

	& > span {
		position: relative;
		align-items: center;
		z-index: 1;
		text-align: center;
	}
	${(p) => p.loading && loadingButton};
`;
