import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  padding: 10px 20px;
`;

export const Title = styled.h1`
  color: var(--black);
  font-size: 30px;
  font-family: var(--font);
  margin-bottom: 15px;
`

export const Label = styled.label`
  color: var(--black);
  font-size: 14px;
  font-family: var(--font);
  padding-left: 5px;
`
export const Username = styled.h2`
  color: var(--black);
  font-size: 20px;
  font-family: var(--font);
  font-weight: 700;
  width: 415px;
  height: 30px;
  background-color: var(--white);
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
`

export const Content = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`

export const UsersList = styled.div`
  width: 18%;
  height: 500px;
  background-color: var(--white);
  border-radius: 8px;
  padding: 10px;
  .title {
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 15px;
  }
`

export const User = styled.p<{ isSelected: boolean }>`
  font-size: 14px;
  font-family: var(--font);
  color: var(--black);
  margin-bottom: 10px;
  line-height: 20px;
  cursor: pointer;
  font-weight: ${({ isSelected = false }) => isSelected ? '700' : '400'};
`

export const ChatWrapper = styled.div`
  width: 80%;
`
