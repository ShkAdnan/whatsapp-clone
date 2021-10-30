import { Avatar } from "@material-ui/core";
import styled from "styled-components";
import { collection, doc, addDoc, query, where, getDocs, onSnapshot } from "firebase/firestore"; 
import { useEffect, useState } from "react";
import { useRouter  } from "next/dist/client/router";

const Chat = ({key, user, auth, db }) => {

    const [ authUser, setAuthUser ] = useState([]);
    const router = useRouter();

    if( auth.email == user ) return null;
    //Getting Details of chat users
    const userRef = collection(db, "users") ;


    const enterChat = () => {
        router.push(`/chat/${key}`)
    };

    useEffect(() => {
        setTimeout(()=>{
            setAuthUser([])
            const unsubscribe  = onSnapshot( userRef , (userSnapShot) => {
                //if no record found
                if (userSnapShot.empty) {
                    console.log('No matching documents...');
                    return;
                }
                userSnapShot.forEach((doc)=>{
                    //doc.data().find( (userData) => { if(userData === user) { setAuthUser(userData)} })
                    if(doc.data().email == user){
                        setAuthUser(doc.data())
                    }
                })
            })
        },300); 
    }, [db])

    return (
        <Container onClick={enterChat}>
            {
                authUser.photoUrl ? (
                    <UserAvatar src={authUser?.photoUrl} />
                ) : (
                    <UserAvatar >{ user.charAt(0) }</UserAvatar>
                )
            }
            <p>{user}</p>
        </Container>    
    )
}

export default Chat;

const Container = styled.div`
    display : flex;
    align-items : center;
    cursor : pointer;
    padding : 15px;
    word-break:break-word;

    :hover{
        background-color: #e9eaeb
    }
`;

const UserAvatar = styled(Avatar)`
    margin: 5px;
    margin-right : 15px
`;