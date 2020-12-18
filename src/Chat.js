import React, { useEffect, useState } from 'react'
import ChatHeader from './ChatHeader'
import './Chat.css';
import Message from './Message';
import { useSelector, } from 'react-redux';
import { selectChannelId, selectChannelName } from './features/appSlice';
import { selectUser } from './features/userSlice';
import db from './firebase';
import firebase from 'firebase';

function Chat() {
    const channelId = useSelector(selectChannelId);
    const user = useSelector(selectUser);
    const channelName = useSelector(selectChannelName);
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (channelId) {
            db.collection('channels')
            .doc(channelId)
            .collection("messages")
            .orderBy('timestamp', 'desc')
            .onSnapshot(snapshot => 
                setMessages(snapshot.docs.map(doc => doc.data())));
        }
        
    }, [channelId]);

    const sendMessage = e => {
        e.preventDefault();

        db.collection('channels').doc(channelId).collection('messages')
        .add({
            message: input,
            user: user,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });

        setInput("");
    }

    return (
        <div className="chat">
            <ChatHeader channelName={channelName}/>
            
            <div className="chat__messages">
                {messages.map(message => (
                    <Message 
                    timestamp={message.timestamp}
                    message={message.message}
                    user={message.user}
                    />
                ))}
            </div>

            <div className="chat__input">
                <form>
                    <input 
                    value={input}
                    disabled={!channelId}
                    onChange={e => setInput(e.target.value)}
                    placeholder={`Message #${channelName}`}/>
                    <button 
                    disabled={!channelId}
                    className= "chat__inputButton" 
                    type='submit'
                    onClick={sendMessage}
                    >Send Message</button>
                </form>
            </div>
            </div>
    )
}

export default Chat
