/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import ChatForm from '../../components/ChatForm';
import { useSocketContext } from '../../context/socket-context';
import { useUsersContext } from '../../context/user-context';
import { Actions } from '../../models/Actions';
import generateUsername from '../../util/generate-username';

import * as S from './styles';

const Home = () => {
  const socket = useSocketContext();
  const { users, setUsers, loggedUser, setLoggedUser } = useUsersContext();
  const [selectedUser, setSelectedUser] = useState<string>('');

  useEffect(() => {
    socket.on("users", users => {
      setUsers(users)
    })
    socket.emit(Actions.NEW_USER, (user: string) => setLoggedUser(user))

    window.addEventListener('beforeunload', () => {
      disconnectUser();
    });

    return () => {
      disconnectUser();
    }
  }, [])

  const disconnectUser = () => {
    socket.emit(Actions.DISCONNECT, loggedUser);
  }

  const handleUserSelect = (userId: string) => {
    setSelectedUser(userId);
  }

  return (
    <S.Wrapper>
      <S.Title>Easy Chat</S.Title>
      <S.Label>Your ID</S.Label>
      <S.Username>{generateUsername(loggedUser)}</S.Username>
      <S.Content>
        <S.UsersList>
          <p className="title">Users connected:</p>
          {users.map((user, index) => {
            if (user !== loggedUser) {
              return (
                <S.User key={index} isSelected={selectedUser === user} onClick={() => handleUserSelect(user)}>
                  {generateUsername(user)}
                </S.User>
              )
            }
            return null
          })}
        </S.UsersList>
        <S.ChatWrapper>
          <ChatForm userSelected={selectedUser} />
        </S.ChatWrapper>
      </S.Content>
    </S.Wrapper>
  );
}

export default Home;