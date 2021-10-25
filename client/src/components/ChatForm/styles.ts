import styled from 'styled-components';

export const ChatForm = styled.form`
  width: 100%;
  height: 500px;
  display: flex;
  flex-flow: wrap column;
  justify-content: space-between;
  .messages {
    width: 100%;
    height: 350px;
    border-radius: 8px;
    background-color: var(--white);
    .scroll-view {
      padding: 15px;
    }
  }
  .chat-control {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    textarea {
      width: 85%;
      height: 120px;
      background-color: var(--white);
      border-radius: 8px;
      font-size: 16px;
      font-family: var(--font);
      color: var(--black);
      border: none;
      padding: 10px;
      :focus {
        outline: none;
      }
    }
  }
`
