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
import Modal from 'react-modal';

function Sidebar() {
    const user = useSelector(selectUser);
    const [channels, setChannels] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    function myFunction()
    {

      var things = [
        "There’s ordinary, and then there’s " + "you" + ".",
        "On a scale of 1 to 10, " + "you" + " are an 11.",
        "Take the courage from Gryffindor, hardwork from Hufflepuff, intelligence from Ravenclaw, and the ambition from Slytherin. We'd get " + "you" + " after that.",
        "You" + " are like the last piece of a puzzle. Without you, I would be lost and incomplete.",
        "Hey " + "you" + ", is there anything that you can’t do?",
        "You" + " never fail to amaze me with just how briliant you are.",
        "If " + "you" + " were a vegetable, they would be a cute-cumber.",
        "If they based a movie on " + "you" + ", it would definitely win an Oscar because that's how fantastic you are.",
        "You" + " are great. I don't have anything else to say. Words fall short to describe how incredible you are.",
        "You" + " are the only person I would trust with my passwords.",
        "If Harry Potter was real, " + "you" + " would be the magical one born into a muggle family.",
        "You" + " are the most talented person I know.",
        "You" + " are the human embodiment of that feeling I get after watching a Disney movie.",
        "When I hang out with " + "you" + ", I always end up smiling.",
        "If 😊 was a person, it'd be " + "you.",
        "I bet " + "you" + " are the person everyone wants on their team.",
        "You" + " are that \"nothing\" when people ask me what I'm thinking about.",
        "You" + " are better than unicorns and sparkles combined.",
        "You" + " make me smile. Even when I'm trying not to.",
        "You" + " are the best kind of friend."
      ];

      var thing = things[Math.floor(Math.random()*things.length)];
      alert(thing);
    }


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

                <AddIcon onClick={handleAddChannel} className="sidebar__addChannel" />
            </div>

            <div className="sidebar__channelsList">
                {channels.map(({ id, channel }) => (
                    <SidebarChannel key={id} id={id} channelName={channel.channelName} />
                ))}
            </div>
        </div>

         <div className="sidebar__resources">
            <div className="sidebar__resourcesHeader">
                <div className="sidebar__header">
                    <ExpandMoreIcon />
                    <h4>Mental Health Tools (more coming soon!)</h4>
                </div>
            </div>

            <div data-modal-target="#modal" className="sidebar__resourcesList1"
            onClick={() => myFunction()}>
                <h4><span className='sidebarResources__hash'>#</span>Praise me!</h4>
                {/* <Modal isOpen={modalIsOpen}>
                    <h2>Modal title</h2>
                    <p>Modal body</p>
                    <div>
                    <button onClick={() => setModalIsOpen(false)}>Close
                    </button>
                    <button type="button" onclick={()=> myFunction()}>Generate CAS ACTIVITY</button>
                    </div>
                </Modal> */}
            </div>

            {/* <div class="modal" id="modal">
                <div class="modal-header">
                    <div class="title">Example Modal</div>
                    <button data-close-button class="close-button">&times;</button>
                </div>
                <div class="modal-body">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse quod alias ut illo doloremque eum ipsum obcaecati distinctio debitis reiciendis quae quia soluta totam doloribus quos nesciunt necessitatibus, consectetur quisquam accusamus ex, dolorum, dicta vel? Nostrum voluptatem totam, molestiae rem at ad autem dolor ex aperiam. Amet assumenda eos architecto, dolor placeat deserunt voluptatibus tenetur sint officiis perferendis atque! Voluptatem maxime eius eum dolorem dolor exercitationem quis iusto totam! Repudiandae nobis nesciunt sequi iure! Eligendi, eius libero. Ex, repellat sapiente!
    </div>
            </div>
            <div id='overlay'></div> */}
        </div>


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
