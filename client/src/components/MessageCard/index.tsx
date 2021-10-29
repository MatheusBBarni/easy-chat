import { format } from 'date-fns';
import { useState } from 'react';
import { useUsersContext } from '../../context/user-context';
import { Message } from '../../models/Message';
import * as S from './styles';

export type MessageCardProps = {
  message: Message;
}

const MessageCard = ({
  message: {
    value,
    sender,
    createdAt
  }
}: MessageCardProps) => {
  const { loggedUser } = useUsersContext();
  const [isUserMessage] = useState<boolean>(sender === loggedUser);

  return (
    <S.Card isUserMessage={isUserMessage}>
      <S.CardHeader>
        <S.CardOwner>
          {isUserMessage ? 'You' : 'Person'}
        </S.CardOwner>
        <S.CardDate>
          {format(new Date(createdAt), 'MM/dd/yyyy')}{' '}
          {format(new Date(createdAt), 'HH:mm')}
        </S.CardDate>
      </S.CardHeader>
      <S.CardMessage>
        {value}
      </S.CardMessage>
    </S.Card>
  );
}

export default MessageCard;