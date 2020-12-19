import { React, useEffect, useState } from 'react'
import "./Sidebar.css"
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import "./script"
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

                <AddIcon
                    className="sidebar__addChannel" />
            </div>

            <div className="sidebar__channelsList">
                {channels.map(({ id, channel }) => (
                    <SidebarChannel key={id} id={id} channelName={channel.channelName} />
                ))}
            </div>
        </div>

        {/* <div className="sidebar__resources">
            <div className="sidebar__resourcesHeader">
                <div className="sidebar__header">
                    <ExpandMoreIcon />
                    <h4>Resources</h4>
                </div>

                <AddIcon
                    className="sidebar__addResource" />
            </div>

            <div data-modal-target="#modal" className="sidebar__resourcesList1">
                <h4><span className='sidebarResources__hash'>#</span>Group 1</h4>
            </div>
            <div class="modal" id="modal">
                <div class="modal-header">
                    <div class="title">Example Modal</div>
                    <button data-close-button class="close-button">&times;</button>
                </div>
                <div class="modal-body">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse quod alias ut illo doloremque eum ipsum obcaecati distinctio debitis reiciendis quae quia soluta totam doloribus quos nesciunt necessitatibus, consectetur quisquam accusamus ex, dolorum, dicta vel? Nostrum voluptatem totam, molestiae rem at ad autem dolor ex aperiam. Amet assumenda eos architecto, dolor placeat deserunt voluptatibus tenetur sint officiis perferendis atque! Voluptatem maxime eius eum dolorem dolor exercitationem quis iusto totam! Repudiandae nobis nesciunt sequi iure! Eligendi, eius libero. Ex, repellat sapiente!
    </div>
            </div>
            <div id='overlay'></div>
            <div className="sidebar__resourcesList2">
                <h4><span className='sidebarResources__hash'>#</span>Group 2</h4>
            </div>
        </div> */}


        <div className="sidebar__profile">
            <Avatar onClick={() => auth.signOut()} src={user.photo} />
            <div className="sidebar__profileInfo">
                <h3>{user.displayName}</h3>
                <p>#{user.uid.substring(0, 5)}</p>
            </div>
        </div>


    </div>
    )
}

export default Sidebar
