import styled from "styled-components";
import { Avatar, Button, IconButton } from '@material-ui/core'
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert'
import  SearchIcon  from "@material-ui/icons/Search";
import * as EmailValidator from 'email-validator';
import { signOut } from "firebase/auth"
import { db, auth } from "../firebase";
import { collection, doc, setDoc, query, where, getDocs } from "firebase/firestore"; 
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { useEffect } from 'react';
import { async } from "@firebase/util";

const Sidebar = () => {
    const [ user ] = useAuthState( auth );
    //Checking if chat already exists
    const userChatRef = query(collection(db, "chats"), where("users", "array-contains", user.email));
    
    const createChat = async () => {

        const input = prompt("Please enter email you wish to chat with");
     
        if(!input) return null;
        const chatExists = await chatAlreadyExists(input);
        
        if(EmailValidator.validate(input) && !chatExists && input != user.email ){
            const chats = collection( db , "chats");
            await setDoc(doc(chats), {
                users : [ user.email, input ]
            });

        }
    }

    const chatAlreadyExists = async (repcipientEmail) => {
        const chatSnapShot = await getDocs(userChatRef);
        const result = true;

        chatSnapShot?.forEach((doc) => {
            result = !!(doc.data().users.find(user => user === repcipientEmail)?.length > 0 ) ;
            //if empty turns false
            if(result) return result;
        });

        return result;
       
        //return !!chatSnapShot?.doc?.find(chat => chat.data().users.find(user => user === repcipientEmail)?.length > 0)
    }

    return (
    <Container>
        <Header>
            <UserAvatar onClick={() => signOut(auth) } />

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