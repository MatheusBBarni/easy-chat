import { useEffect, useState } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import { CaretRightSquareFill } from '@styled-icons/bootstrap/CaretRightSquareFill';

import * as S from './styles';
import { useSocketContext } from '../../context/socket-context';
import { Message } from '../../models/Message';
import MessageCard from '../MessageCard';
import { useUsersContext } from '../../context/user-context';
import { Actions } from '../../models/Actions';

export type ChatFormProps = {
  userSelected: string
}

const ChatForm = ({ userSelected }: ChatFormProps) => {
  const socket = useSocketContext();
  const { loggedUser } = useUsersContext();
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageValue, setMessageValue] = useState<string>('');

  useEffect(() => {
    if(userSelected) {
      socket.emit(Actions.GET_MESSAGES, userSelected, (chatMessages: Message[]) => setMessages(chatMessages))
    }
  }, [userSelected, socket])

  const handleSendMessage = () => {
    const message = {
      value: messageValue,
      receiver: userSelected,
      sender: loggedUser,
      users: [
        userSelected,
        loggedUser
      ]
    }    
    socket.emit(Actions.ADD_MESSAGE, message, (chatMessages: Message[]) => setMessages(chatMessages));
  }

  return (
    <S.ChatForm>
      <ScrollToBottom className="messages" scrollViewClassName="scroll-view" debug={false}>
        {messages.length > 0 ? 
          messages.map((message, index) => (
            <MessageCard key={index} message={message} />
          )) 
          : <p>No messages yet!</p>}
      </ScrollToBottom>
      <div className="chat-control">
        <textarea 
          name="message" 
          id="message" 
          rows={2}
          placeholder="Type here your message..."
          value={messageValue}
          onChange={(event) => setMessageValue(event.target.value)} 
        />
        <CaretRightSquareFill 
          title="Send message"
          size={50} 
          color="var(--black)" 
          cursor="pointer" 
          onClick={handleSendMessage}
        />
      </div>
    </S.ChatForm>
  );
}

export default ChatForm;