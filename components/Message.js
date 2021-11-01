import styled from "styled-components";

const Message = ({ message }) => {
    
    return <Container>
        { message.length > 0 &&
                message.map((message)=>{
                  return  <h1>{message.message}</h1> 
                })
        }
    </Container>
}

export default Message;

const Container = styled.div``;