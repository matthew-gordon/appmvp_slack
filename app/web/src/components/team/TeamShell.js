import styled from 'styled-components';

const TeamShell = () => {
  return (
    <Container>
      <Teams>Teams</Teams>
      <Channels>Channels</Channels>
      <Header>Header</Header>
      <Messages>
        <MessageList>
          {[{ content: 'message 1' }, { content: 'message 2' }].map(
            (message, idx) => (
              <MessageListItem key={idx}>{message.content}</MessageListItem>
            )
          )}
        </MessageList>
      </Messages>
      <Input>
        <StyledInput
          type="text"
          placeholder="Have you tried the CSS Grid Layout Module?"
        />
      </Input>
    </Container>
  );
};

export default TeamShell;

const Container = styled.div`
  display: grid;
  height: 100vh;
  grid-template-columns: 100px 250px 1fr;
  grid-template-rows: auto 1fr auto;
`;

const Teams = styled.div`
  background-color: #362233;
  grid-column: 1;
  grid-row: 1 / 4;
  color: #fff;
  padding: 1em;
  text-align: center;
`;

const Channels = styled.div`
  background-color: #52364e;
  grid-column: 2;
  grid-row: 1 / 4;
  color: #fff;
  padding: 1em;
  text-align: center;
`;

const Header = styled.div`
  background-color: #ffffff;
  grid-column: 3;
  grid-row: 1;
  color: #333;
  border-bottom: 1px solid #f2f2f2;
  padding: 1em;
  text-align: center;
`;

const Input = styled.div`
  background-color: #fff;
  grid-column: 3;
  grid-row: 3;
  color: #fff;
  padding: 1em;
  text-align: center;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 1em;
  outline: none;
  border: 1px solid #f2f2f2;
`;

const Messages = styled.div`
  background-color: #ffffff;
  grid-column: 3;
  grid-row: 2;
  padding: 0 1em;
  overflow-y: scroll;
  color: #fff;
  padding: 1em;
  text-align: center;
`;

const MessageList = styled.ul`
  margin: 0;
  padding: 0;
`;

const MessageListItem = styled.li`
  padding: 0.2em;
  margin-top: 1em;
  margin-bottom: 1em;
  background-color: #f2f2f2;
`;
