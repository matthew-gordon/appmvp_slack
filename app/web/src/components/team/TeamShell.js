import styled from 'styled-components';

const TeamShellStyles = styled.div`
  .box {
    color: #fff;
    padding: 1em;
    text-align: center;
  }

  input {
    width: 100%;
    padding: 1em;
    outline: none;
    border: 1px solid #f2f2f2;
  }

  .message-list {
    margin: 0;
    padding: 0;
  }

  .message-list li {
    padding: 0.2em;
    margin-top: 1em;
    margin-bottom: 1em;
    background-color: #f2f2f2;
  }

  /* Our Grid Code */

  .app-layout {
    display: grid;
    height: 100vh;
    grid-template-columns: 100px 250px 1fr;
    grid-template-rows: auto 1fr auto;
  }

  .header {
    background-color: #ffffff;
  }
  .teams {
    background-color: #362233;
  }
  .channels {
    background-color: #52364e;
  }
  .messages {
    background-color: #ffffff;
  }
  .write {
    background-color: #f2f2f2;
  }

  .teams {
    grid-column: 1;
    grid-row: 1 / 4;
  }

  .channels {
    grid-column: 2;
    grid-row: 1 / 4;
  }

  .header {
    grid-column: 3;
    grid-row: 1;
    color: #333;
    border-bottom: 1px solid #f2f2f2;
  }

  .messages {
    grid-column: 3;
    grid-row: 2;
    padding: 0 1em;
    overflow-y: scroll;
  }

  .input {
    grid-column: 3;
    grid-row: 3;
  }
`;

const TeamShell = () => {
  return (
    <TeamShellStyles>
      <div class="app-layout">
        <div class="teams box">Teams</div>
        <div class="channels box">Channels</div>
        <div class="header box">Header</div>
        <div class="messages box">
          <ul class="message-list">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
        <div class="input box">
          <input
            type="text"
            placeholder="Have you tried the CSS Grid Layout Module?"
          />
        </div>
      </div>
    </TeamShellStyles>
  );
};

export default TeamShell;
