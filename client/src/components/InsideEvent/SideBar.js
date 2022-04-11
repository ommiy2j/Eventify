import { Card, Stack, Tabs } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import copy from 'copy-text-to-clipboard';
import { Tooltip } from '@mui/material';
import { useState } from 'react';

const SideBar = ({ theme, refId }) => {
	console.log(refId)
	const [ copyTitle, setcopyTitle ] = useState('copy');

	const handleCopy = () => {
		copy(refId);
		setcopyTitle('copied');
	};
	return (
		<Sidebar>
			<Card
				variant='outlined'
				theme={theme}
				sx={{
					bgcolor: (theme) => (theme === 'dark' ? 'rgb(54, 53, 58)' : '#fff'),
					color: (theme) => (theme === 'dark' ? '#ffff' : '#000')
				}}
			>
				<Copy>
					Copy Room Id
					<Tooltip title={copyTitle}>
						<ContentCopyIcon
							className='copyBtn'
							color='inherit'
							onClick={handleCopy}
							onBlur={() => setcopyTitle('copy')}
						/>
					</Tooltip>
				</Copy>
				<AllPeople>
					<Head>
						<Tabs>Members</Tabs>
					</Head>
					<Stack spacing={2}>Amit</Stack>
				</AllPeople>
			</Card>
		</Sidebar>
	);
};

export default SideBar;

const Sidebar = styled.div`
	position: fixed;
	top: 10vh;
	height: calc(100vh - 10vh);
	width: 25vw;
	/* border: 2px solid; */
`;

const AllPeople = styled.div``;

const Head = styled.div`
	font-size: 1.4rem;
	text-align: left;
	margin: 20px;
	border: 2px solid;
`;
const Copy = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;
