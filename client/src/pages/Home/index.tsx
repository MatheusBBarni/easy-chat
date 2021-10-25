/* eslint-disable react-hooks/exhaustive-deps */
import { CaretRightSquareFill } from '@styled-icons/bootstrap/CaretRightSquareFill'
import { useEffect, useState } from 'react';
import { useSocketContext } from '../../context/socket-context';
import { useUsersContext } from '../../context/user-context';
import { Actions } from '../../models/Actions';

import * as S from './styles';

const Home = () => {
  const socket = useSocketContext();
  const { users, setUsers } = useUsersContext();
  const [user, setUser] = useState<string>('')
  const [message, setMessage] = useState<string>('')
  const [selectedUser, setSelectedUser] = useState<string>('');

  useEffect(() => {
    socket.on("users", users => {
      setUsers(users)
    })
    socket.emit(Actions.NEW_USER, (user: string) => setUser(user))

    window.addEventListener('beforeunload', () => {
      socket.emit(Actions.DISCONNECT, user);
    })

    return () => {
      socket.emit(Actions.DISCONNECT, user);
    }
  }, [])

  const handleUserSelect = (userId: string) => {
    setSelectedUser(userId);
  }

  const handleSendMessage = () => {
    console.log(message);
  }

  return (
    <S.Wrapper>
      <S.Title>Easy Chat</S.Title>
      <S.Label>Your ID</S.Label>
      <S.Username>{user}</S.Username>
      <S.ChatWrapper>
        <S.UsersList>
          <p className="title">Users connected:</p>
          {users.map((user, index) => (
            <S.User key={index} isSelected={selectedUser === user} onClick={() => handleUserSelect(user)}>
              {user}
            </S.User>
          ))}
        </S.UsersList>
        <S.ChatForm>
          <div className="messages"></div>
          <div className="chat-control">
            <textarea 
              name="message" 
              id="message" 
              rows={2} 
              value={message}
              onChange={(event) => setMessage(event.target.value)} 
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
      </S.ChatWrapper>
    </S.Wrapper>
  );
}

export default Home;