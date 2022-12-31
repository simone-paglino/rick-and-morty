import styled, { createGlobalStyle } from 'styled-components'

export const BlockOverflow = createGlobalStyle`
	html, body, div:root {
		overflow: hidden;
	}
`

export const ModalStyled = styled.div`
  width: 600px;
  background-color: hsl(0, 100%, 100%);
  padding: 24px;
`
