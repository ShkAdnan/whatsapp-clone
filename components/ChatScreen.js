import styled from "styled-components";
import { useRouter  } from "next/dist/client/router";
import { Avatar } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { AttachFile, InsertEmoticon, Mic } from "@material-ui/icons";  
import { collection, doc, setDoc, addDoc, getDoc ,query, where, getDocs, onSnapshot, orderBy } from "firebase/firestore"; 
import { db, auth } from "../firebase";
import Message from "./Message";
import { useEffect, useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import moment from "moment";

const ChatScreen = ({  chat, messages }) => {

    const [ user ] = useAuthState( auth );
    const endOfMessagesRef = useRef(null);
    const router = useRouter();
    const [ input , setInput ] = useState("")
    const [ currentMessages , setCurrentMessages ] = useState([]);
    const [ repEmail , setRepEmail ] = useState("");
    const [ userChat , setUserChat ] = useState("");
    
    useEffect(async () => {
        //Get Current messages
        const messageRes = query(collection(db , "chats", router.query.id, "message") , orderBy('timestamp')) ;
         await onSnapshot(messageRes , (messageSnapShot) => {
            setCurrentMessages([]);
            messageSnapShot.forEach((doc) => {
              setCurrentMessages((pre => [...pre , [doc.id , doc.data() ] ]))
            })
        });

        //Rep Email 
        if(chat.users != user) setRepEmail(chat.users[1]);

        const userChatRef = query(collection(db, "users"), where("email", "==", repEmail));
        const userDetails = await getDocs(userChatRef);

        userDetails?.forEach((doc)=>{
            setUserChat(doc.data());
        })

    },[router.query.id , db]);

    const showMessages = () => {    
        if(currentMessages){
            return currentMessages.map(( message ) => (
                <Message key={message[1].timestamp} user={message[1].user} message={message[1].message} timestamp={message[1].timestamp} />
            ));
        }else{
            return messages.map(( message ) => (
                <Message key={message.id} user={message.user} message={message.message} timestamp={message.timestamp}/>
            ));
        }
            
    }

    const scrollToBottom = () => {
        endOfMessagesRef.current.scrollIntoView({
            behavior : "smooth",
            block : "start"
        })   
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
        scrollToBottom();  
    }

    return <Container>
        <Header>
        {
             userChat.photoUrl ? (
                    <Avatar src={userChat?.photoUrl} />
                ) : (
                    <Avatar >{ repEmail.charAt(0)}</Avatar>
                )
            }
            <HeaderInformation>
                <h3>{ repEmail }</h3>
                { userChat ? (
                    <p>Last seen: { '  ' }
                {userChat?.lastSeen ? (
                    // <TimeAgo datetime={userChat?.lastSeen} />
                     moment(userChat?.lastSeen).format('LT') 
                ) : "Unavailable"}</p>
                ) : (
                    <p>Loading Last Active ...</p>
                )}
                
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
            <EndOfMessages ref={endOfMessagesRef}/>
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