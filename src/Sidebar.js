import {React, useEffect, useState} from 'react'
import "./Sidebar.css"
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from "@material-ui/icons/Add"
import { useSelector } from "react-redux";
import SidebarChannel from "./SidebarChannel"
import { Avatar } from '@material-ui/core';
import { selectUser } from './features/userSlice';
import db, { auth } from './firebase';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

function Sidebar() {
    const user = useSelector(selectUser);
    const [channels, setChannels] = useState([]);

    useEffect(() => {
        db.collection('channels').onSnapshot(snapshot => (
            setChannels(snapshot.docs.map(doc => ({
                id: doc.id,
                channel: doc.data()
            })))
        ));
      }, []);

      const handleAddChannel = () => {
          const channelName = prompt("Enter a new subject name"); 

          if (channelName) {
              db.collection('channels').add({
                  channelName: channelName
              })
          }
      }

    return (<div className="sidebar">
        <div className="sidebar__top">
        <ArrowBackIosIcon />
        <span> <h3>&nbsp;&nbsp;IBuddy Chat</h3></span>
        </div>

        <div className="sidebar__channels">
            <div className="sidebar__channelsHeader">
                <div className="sidebar__header">
                    <ExpandMoreIcon />
                    <h4>Subjects</h4>
                </div>

                <AddIcon onClick={handleAddChannel} 
                className="sidebar__addChannel"/>
            </div>

            <div className="sidebar__channelsList">
                {channels.map(({id, channel}) => (
                    <SidebarChannel key={id} id={id} channelName={channel.channelName} />
                ))}
        </div>
        </div>

        <div className="sidebar__profile">
            <Avatar onClick={() => auth.signOut()} src = {user.photo}/>
            <div className="sidebar__profileInfo">
                <h3>{user.displayName}</h3>
                <p>#{user.uid.substring(0, 5)}</p>
            </div>
            </div>
            

    </div>
    )
}

export default Sidebar
