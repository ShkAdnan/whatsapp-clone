import styled from "styled-components";
import { useRouter  } from "next/dist/client/router";
import { Avatar } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { AttachFile, InsertEmoticon, Mic } from "@material-ui/icons";  
import { collection, doc, setDoc, addDoc, getDoc ,query, where, getDocs, onSnapshot, orderBy } from "firebase/firestore"; 
import { db, auth } from "../firebase";
import Message from "./Message";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { async } from "@firebase/util";

const ChatScreen = ({  chat, messages }) => {
    const [ user ] = useAuthState( auth );
    const router = useRouter();
    const [ input , setInput ] = useState("")
    //const messageRef = collection(db, "chats" , router.query.id);
    //const mess = query( messageRef, orderBy("timestamp" , "asc") );
    //doc(messageRef, "messages", router.query.id)
  
    const showMessages = () => {    
        // <Message message={messages}/> 
        <h1>Working</h1>     
    }

    const sendMessage = async (e) => {
        e.preventDefault();

        //update last seen time
        const users = collection(db, "users");

        await setDoc(doc(users, user.uid), {
         lastSeen : new Date().getTime()
        },
        { merge : true});

        //Add message to chats
        const chats = collection(db , "chats");

        const newMessage = collection(doc(chats , router.query.id) , "message");

        await addDoc( newMessage  , {
            timestamp :  new Date().getTime(),
            message : input,
            user : user.email,
            photoUrl : user.photoURL
        });

        setInput('');
    }

    return <Container>
        <Header>
            <Avatar />
            <HeaderInformation>
                <h3>shkadnan</h3>
                <p>Last seen...</p>
            </HeaderInformation>
            <HeaderIcons>
                <IconButton>
                    <AttachFile />
                </IconButton>
                <IconButton>
                    <MoreVertIcon />
                </IconButton>
            </HeaderIcons>
        </Header>

        <MessageContainer >
            {/* Show Messages */}
            { showMessages() }
            {/* End of Messages */}
            <EndOfMessages />
        </MessageContainer>
            <InputContainer>
                <InsertEmoticon />
                <Input value={input} onChange={e => setInput(e.target.value)} />
                <button hidden type="submit" disabled={!input} onClick={sendMessage}>Send Message</button>
                <Mic />
            </InputContainer>
        
    </Container>
}

export default ChatScreen;

const Container = styled.div``;

const Header = styled.div`
    position : sticky;
    background-color : white;
    z-index : 100;
    top : 0;
    display : flex ;
    padding : 11px;
    height : 80px;
    align-items : center;
    border-bottom : 1px solid whitesmoke;
`;

const HeaderInformation = styled.div`
    margin-left : 15px;
    flex : 1;
    >h3 {
        margin-bottom : 3px
    }
    >p{
        font-size : 14px;
        color: gray
    }
`;

const HeaderIcons =  styled.div`
    display : flex
`;

const IconButton = styled.div``;

const MessageContainer = styled.div`
    padding : 30px;
    background-color: #e5ded8;
    min-height : 90vh
`;

const EndOfMessages = styled.div``;

const InputContainer =  styled.form`
    display : flex;
    align-items : center;
    padding : 10px;
    position : sticky;
    bottom : 0;
    background-color : white;
    z-index : 100;
`;

const Input = styled.input`
    flex: 1;
    outline : 0;
    border : none;
    border-radius : 10px;
    padding : 20px;
    background-color : whitesmoke;
    margin-left : 15px;
    margin-right : 15px;
`;