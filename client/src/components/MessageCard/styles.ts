import styled from "styled-components";

export const Card = styled.div`
  width: 100%;
  border: 1px solid var(--pink);
  border-radius: 8px;
  margin-top: 10px;
  padding: 10px;

  display: flex;
  flex-flow: wrap column;
  justify-content: space-between;
`
export const CardHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;;
`

export const CardOwner = styled.label`
  color: var(--black);
  font-size: 14px;
  font-family: var(--font);
`

export const CardDate = styled.span`
  color: var(--black);
  font-size: 12px;
  font-family: var(--font);
`

export const CardMessage = styled.p`
  color: var(--black);
  font-size: 16px;
  font-family: var(--font);
  font-weight: 700;
`