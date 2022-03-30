import styled from 'styled-components';
import { GoogleLogin } from 'react-google-login';
// import GoogleButton from './Elements/GoogleButton';

const Welcome = (props) => {
	const responseErrorGoogle = () => {};
	return (
		<WelcomeContainer>
			<Img src='./assests/eve.png' />
			<Container>
				<Title>Eventify</Title>
				<Desc>....where we help you to organise, plan and manage your events.</Desc>
				<GoogleLogin
					clientId='636149540096-lr27aufhr6hjt3ugeq31okr6m0unum9h.apps.googleusercontent.com'
					theme='light'
					className='google-btn-signUp'
					buttonText='Sign In With google'
					onSuccess={props.responseSuccessGoogle}
					onFailure={responseErrorGoogle}
					cookiePolicy={'single_host_origin'}
				/>
				{/* <GoogleButton>Google</GoogleButton> */}
			</Container>
		</WelcomeContainer>
	);
};

export default Welcome;

const WelcomeContainer = styled.div`
	background-color: ${(p) => p.theme.body};
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
`;
const Container = styled.div`
	width: 60%;
	height: 60%;
	/* border: 2px solid red; */
`;
const Img = styled.img`
	width: 60%;
	height: 60%;
`;
const Title = styled.h2`
	font-size: 6rem;
	margin-bottom: 0;
	letter-spacing: 1rem;
	font-family: 'Permanent Marker', cursive;
	color: ${(p) => p.theme.titleColor};
`;
const Desc = styled.p`
	font-size: 1.5rem;
	margin-bottom: 50px;
	font-family: 'Dancing Script', cursive;
	color: ${(p) => p.theme.fontColor};
	/* margin-left: 200px; */
`;
