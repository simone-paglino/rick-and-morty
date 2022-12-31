import React, { FC } from 'react'
import { createPortal } from 'react-dom'
// Components
import { FlexBox } from '../FlexBox'
import BackDrop from './BackDrop'
import { BlockOverflow, ModalStyled } from './styled'
// Types
import {
  ModalContainerProps,
  ModalFooterProps,
  ModalHeaderProps,
  ModalProps,
} from './types'

const ModalHeader: FC<ModalHeaderProps> = ({ header, closeModal }) => {
  return (
    <header>
      <FlexBox>
        {header}
        <button onClick={closeModal}>&#10005;</button>
      </FlexBox>
    </header>
  )
}

const ModalFooter: FC<ModalFooterProps> = ({ footer }) => {
  return <footer>{footer}</footer>
}

const Modal: FC<ModalProps> = ({ body, closeModal, footer, header }) => {
  const leaveModalOpened = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()
  }

  return (
    <BackDrop onClick={closeModal}>
      <BlockOverflow />
      <ModalStyled onClick={leaveModalOpened}>
        {header && <ModalHeader header={header} closeModal={closeModal} />}
        <main>{body}</main>
        {footer && <ModalFooter footer={footer} />}
      </ModalStyled>
    </BackDrop>
  )
}

const ModalContainer: FC<ModalContainerProps> = ({
  body,
  closeModal,
  footer,
  header,
  isOpen,
}) => {
  const rootElement = document.getElementById('root') as HTMLDivElement

  return isOpen
    ? createPortal(
        <Modal
          body={body}
          closeModal={closeModal}
          footer={footer}
          header={header}
        />,
        rootElement
      )
    : null
}

export default ModalContainer
