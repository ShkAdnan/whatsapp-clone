import styled from "styled-components";
import { useRouter  } from "next/dist/client/router";
import { Avatar } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { AttachFile } from "@material-ui/icons";  

const ChatScreen = ({  chat, user }) => {
    
    const router = useRouter();
    
    return <Container>
        <Header>
            <Avatar />
            <HeaderInformation>
                <h3>Rep Email</h3>
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

            {/* End of Messages */}
            <EndOfMessages />
        </MessageContainer>
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

const MessageContainer = styled.div``;

const EndOfMessages = styled.div``;