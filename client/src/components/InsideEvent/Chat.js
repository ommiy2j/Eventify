import { Card, Box } from '@mui/material';
import { Button } from '@material-ui/core';
import { useState, useRef, useEffect } from 'react';
import firebase from 'firebase';
import { db } from '../../firebase';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import styled from 'styled-components';
import Message from './Messege';

const Chat = ({ theme, refId }) => {
    const chatRef = useRef(null);
    // const [user] = localStorage.getItem('user');
    const roomID=localStorage.getItem('currentRoom');
    const channelId = refId;
    const [input, setInput] = useState('');

    const sendMessage = (e) => {
        e.preventDefault();
        if (!channelId) {
            return false;
        }
        console.log(channelId);
        db.collection('servers')
            .doc(channelId)
            .collection('rooms').doc(roomID)
            .collection('messages')
            .add({
                message: input,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                user: localStorage.getItem('username'),
                userImage: localStorage.getItem('picture'),
            });

        chatRef?.current?.scrollIntoView({
            behavior: 'smooth',
        });

        setInput('');
    };

    const roomId = refId;

    const [roomDetails] = useDocument(
        roomId && roomID && db.collection('servers').doc(roomId)
    );

    const [roomMessages, loading] = useCollection(
        roomId && roomID &&
            db
            .collection('servers').doc(roomId)
                .collection('rooms')
                .doc(roomID)
                .collection('messages')
                .orderBy('timestamp', 'asc')
    );
    console.log(roomMessages);
    useEffect(() => {
        chatRef?.current?.scrollIntoView({
            behavior: 'smooth',
        });
    }, [roomId,roomID, loading]);

    return (
        <ChatContainer
            theme={theme}
            variant='outlined'
            sx={{
                bgcolor: (theme) =>
                    theme === 'dark' ? 'rgb(54, 53, 58)' : '#fff',
                color: (theme) => (theme === 'dark' ? '#ffff' : '#000'),
            }}
        >
            <ChatMessages>
                {roomMessages?.docs.map((doc) => {
                    const { message, timestamp, user, userImage } = doc.data();

                    return (
                        <Message
                            key={doc.id}
                            message={message}
                            timestamp={timestamp}
                            user={user}
                            userImage={userImage}
                        />
                    );
                })}
                <ChatBottom ref={chatRef} />
            </ChatMessages>
            <ChatInputContainer>
                <form>
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={`Message `}
                    />
                    <Button hidden type='submit' onClick={sendMessage}>
                        SEND
                    </Button>
                </form>
            </ChatInputContainer>
        </ChatContainer>
    );
};

export default Chat;

// const ChaTContainer = styled.div`
//     position: fixed;
//     right: 20vw;
//     width: calc(100vw - 45vw);
//     height: calc(100vh - 10vh);
// `;
const ChatContainer = styled.div`
    /* flex: 0.7;
    flex-grow: 1; */
    -ms-overflow-style: none;
    scrollbar-width: none;

    position: fixed;
    right: 20vw;
    width: calc(100vw - 45vw);
    height: calc(100vh - 10vh);
    overflow-y: scroll;
    overflow-x: hidden;
    &::-webkit-scrollbar {
        display: none;
    }
    /* margin-top: 60px; */
`;

const ChatMessages = styled.div``;
const ChatBottom = styled.div`
    padding-bottom: 200px;
`;
const ChatInputContainer = styled.div`
    border-radius: 20px;
    > form {
        position: relative;
        justify-content: center;
        display: flex;
    }
    > form > input {
        position: fixed;
        bottom: 30px;
        width: 50%;
        border: 1px solid gray;
        border-radius: 3px;
        padding: 20px;
        outline: none;
    }
    > form > button {
        display: none !important;
    }
`;