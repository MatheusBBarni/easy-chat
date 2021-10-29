/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import { CaretRightSquareFill } from '@styled-icons/bootstrap/CaretRightSquareFill';

import * as S from './styles';
import { useSocketContext } from '../../context/socket-context';
import { Message } from '../../models/Message';
import MessageCard from '../MessageCard';
import { useUsersContext } from '../../context/user-context';
import { Actions } from '../../models/Actions';
import useLocalstorage from '../../hooks/useLocalstorage';

export type ChatFormProps = {
  userSelected: string
}

const ChatForm = ({ userSelected }: ChatFormProps) => {
  const socket = useSocketContext();
  const { loggedUser } = useUsersContext();
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageValue, setMessageValue] = useLocalstorage<string>(userSelected, '');

  const isUserSelected = userSelected !== '';

  useEffect(() => {
    socket.emit(Actions.GET_MESSAGES, 'ok');
    socket.on(Actions.GET_MESSAGES, (chatMessages: Message[]) => {
      setMessages(chatMessages);
    });
  }, []);

  const handleSendMessage = () => {
    if (messageValue !== '') {
      const message = {
        value: messageValue,
        receiver: userSelected,
        sender: loggedUser,
        users: [
          userSelected,
          loggedUser
        ]
      }

      socket.emit(Actions.ADD_MESSAGE, message, (status: string) => {
        if (status === 'ok') {
          setMessageValue('')
        }
      });
    }
  }

  return (
    <S.ChatForm disabled={!isUserSelected}>
      <ScrollToBottom className="messages" scrollViewClassName="scroll-view" debug={false}>
        {(messages.length > 0 && isUserSelected) ?
          messages
            .sort((messageA, messageB) => {
              return new Date(messageA.createdAt).getTime() - new Date(messageB.createdAt).getTime()
            })
            .map((message, index) => {
              if (
                (message.users.includes(loggedUser) && message.users.includes(userSelected))
                && isUserSelected
              ) {
                return (
                  <MessageCard key={index} message={message} />
                )
              }
              return null
            })
          : <S.NoMessagesText>No messages yet!</S.NoMessagesText>}
      </ScrollToBottom>
      <div className="chat-control">
        <textarea
          name="message"
          id="message"
          rows={2}
          value={messageValue}
          disabled={!isUserSelected}
          onChange={(event) => setMessageValue(event.target.value)}
          placeholder={isUserSelected ? 'Type here your message...' : 'Please select a user...'}
        />
        <CaretRightSquareFill
          title="Send message"
          size={50}
          color="var(--black)"
          onClick={handleSendMessage}
        />
      </div>
    </S.ChatForm>
  );
}

export default ChatForm;