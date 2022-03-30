import React from 'react';
import styled from 'styled-components';

const Spinner = () => {
	return <StyledSpinner src='/images/spinner3.gif' />;
};

export default Spinner;
const StyledSpinner = styled.img`
	width: 100%;
	height: 100%;
`;
