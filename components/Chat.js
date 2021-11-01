import { Avatar } from "@material-ui/core";
import styled from "styled-components";
import { collection, doc, addDoc, query, where, getDocs, onSnapshot } from "firebase/firestore"; 
import { useEffect, useState } from "react";
import { useRouter  } from "next/dist/client/router";

const Chat = ({id, user, auth, db }) => {
    const [ authUser, setAuthUser ] = useState([]);
    const router = useRouter();
   
    //Getting Details of chat users
    const userRef = query(collection(db, "users"),where('email' , '==' , user[2])) ;


    const enterChat = () => {
        router.push(`/chat/${id[0]}`)
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
                    if(doc.data().email == user[2]){
                        setAuthUser( doc.data() )
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
                    <UserAvatar >{ user[2].charAt(0)}</UserAvatar>
                )
            }
            <p>{user[2]}</p>
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