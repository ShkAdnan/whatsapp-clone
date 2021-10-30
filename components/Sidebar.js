import styled from "styled-components";
import { Avatar, Button, IconButton } from '@material-ui/core'
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert'
import  SearchIcon  from "@material-ui/icons/Search";
import * as EmailValidator from 'email-validator';
import { signOut } from "firebase/auth"
import { db, auth } from "../firebase";
import { collection, doc, addDoc, query, where, getDocs, onSnapshot } from "firebase/firestore"; 
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from 'react';
import Chat from "./Chat";

const Sidebar = () => {
    const [ user ] = useAuthState( auth );
    //Checking if chat already exists
    const userChatRef = query(collection(db, "chats"), where("users", "array-contains", user.email));
    const [ chats , setChat ] = useState([]);

    useEffect( async ()=> {
        setChat([]);
        setTimeout( async ()=>{
            const chatSnapShot = onSnapshot(userChatRef , (querySnapShot) => {
                querySnapShot.forEach((doc) => {
                    setChat((pre) => [...pre, ...doc.data().users]);
                })
            });
            
        },200)
    },[db]);

    const createChat = async () => {

        const input = prompt("Please enter email you wish to chat with");
     
        if(!input) return null;
        const chatExists = await chatAlreadyExists(input);
        
        if(EmailValidator.validate(input) && !chatExists  && input != user.email ){
            const chats = collection( db , "chats");
            await addDoc(chats, {
                users : [ user.email, input ]
            });

        }
    }

    const chatAlreadyExists = async (repcipientEmail) => {
        const chatSnapShot = await getDocs(userChatRef);
        const result = [];

        chatSnapShot?.forEach((doc) => {
            result.push (!!(doc.data().users.find(user => user === repcipientEmail)?.length > 0 )) ;
        });
        return result.includes(true) ? true : false
        //return !!chatSnapShot?.doc?.find(chat => chat.data().users.find(user => user === repcipientEmail)?.length > 0)
    }

    return (
    <Container>
        <Header>
            <UserAvatar src={user.photoURL} onClick={() => signOut(auth) } />

            <IconContainer>
                <IconButton>
                    <ChatIcon />
                </IconButton>
                <IconButton>
                    <MoreVertIcon />
                </IconButton>
            </IconContainer>
        </Header>

        <Search >
            <SearchIcon />
            <SearchInput placeholder="Search in chats"/>
        </Search>

        <SidebarButton onClick={createChat}>Start new chat</SidebarButton>

        {/* List of chats */}
        { chats.length > 0 && (
            chats.map( (chat , index) => (
                 <Chat key={index} user={chat} auth={user} db={db} />       
            ))
        )}
    </Container>
    )
}

export default Sidebar;

const Container = styled.div``;

const Search = styled.div`
    display:flex;
    align-items: center;
    padding : 20px;
    border-radius: 2px;
`;

const SearchInput = styled.input`
    outline-width: 0;
    border : none;
    flex: 1
`;

const SidebarButton = styled(Button)`
    width: 100%;
    &&& {
        border-top :1px solid whitesmoke;
        border-bottom :1px solid whitesmoke;
    }
`;

const Header = styled.div`
    display:flex;
    position: sticky;
    top:0;
    background-color:white;
    z-index : 1;
    justify-content :space-between;
    align-items:center;
    padding: 15px;
    height :80px;
    border-bottom: 1px solid whitesmoke
`;

const UserAvatar = styled(Avatar)`
    cursor : pointer;
    :hover {
        opacity : 0.8
    }
`;

const IconContainer = styled.div``;