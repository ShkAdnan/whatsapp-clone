import styled from "styled-components";
import Head from "next/head"
import Sidebar from "../../components/Sidebar";
import ChatScreen from "../../components/ChatScreen";
import { collection, doc, addDoc,getDoc, query, where, getDocs, onSnapshot } from "firebase/firestore"; 
import { db, auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Chat = ({chat, messages}) => {
    const [ user ] = useAuthState( auth );

    return <Container>
        <Head>
            <title>Chat with { chat.users[1] }</title>
        </Head>
        <Sidebar />
        <ChatContainer>
            <ChatScreen chat={chat} messages={messages} />
        </ChatContainer>
    </Container>
}

export default Chat;

export async function getServerSideProps(context) {

    const messages = [];
    const ref = doc( db , "chats", context.query.id );

    const messageRes = collection(db , "chats", context.query.id, "message") ;

     const chatSnapShot = onSnapshot(messageRes , (querySnapShot) => {
        querySnapShot.forEach((doc) => {
            console.log(doc.data());
             messages.push(doc) ;  
        })
    });

    console.log(messages);
    
    // messages.map( doc => ({
    //     id : messages.id,
    //     ...doc.data()
    // })) .map(messages => ({
    //     ...messages,
    //     timestamp : messages.timestamp.toDate().getTime()
    // }))

    //Preparing Chats
    const chatRef = await getDoc(ref);

    const chat = {
        id : chatRef.id,
        ...chatRef.data()
    } ;

    //const messageRes = await getDoc( doc( ref, "messages") );
  
    return {
        props : {
            //messages : JSON.stringify(messages.id),
            chat :  chat
        }
    }
}

const Container = styled.div`
    display: flex;
`;

const ChatContainer = styled.div`
    flex : 1;
    overflow :  scroll;
    height : 100vh;

    ::-webkit-scrollbar {
        display: none
    }

    -ms-overflow-style : none;
    scrollbar-width : none;
`;