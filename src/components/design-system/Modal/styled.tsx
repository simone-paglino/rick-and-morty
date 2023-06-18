import styled, { createGlobalStyle } from 'styled-components'

export const BlockOverflow = createGlobalStyle`
  html, body, div:root {
    overflow: hidden;
  }
`

export const ModalStyled = styled.div`
  width: 600px;
  max-height: 80vh;
  background-color: hsl(0, 100%, 100%);
  padding: 32px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  overflow: hidden;
  overflow-y: auto;
  border-radius: 8px;
`
