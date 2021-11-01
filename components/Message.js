import styled from "styled-components";

const Message = ({ message }) => {
    console.log(message);
    return <Container>
        <h1>{ message.message }</h1>
    </Container>
}

export default Message;

const Container = styled.div``;