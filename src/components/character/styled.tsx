import styled from 'styled-components'

export const ListCardsStyled = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: 1fr 1fr;
  align-items: center;

  @media screen and (max-width: 720px) {
    grid-template-columns: 1fr;
    justify-items: flex-start;
  }
`
