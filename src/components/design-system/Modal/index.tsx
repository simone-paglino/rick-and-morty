import React, { FC } from 'react'
import { createPortal } from 'react-dom'
// Components
import FlexBox from '../FlexBox'
import Spacer from '../Spacer'
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
    <FlexBox justifyContent={header ? 'space-between' : 'flex-end'}>
      {header ?? null}
      <button onClick={closeModal}>&#10005;</button>
    </FlexBox>
  )
}

const ModalFooter: FC<ModalFooterProps> = ({ footer }) => {
  if (!footer) {
    return null
  }

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
        <ModalHeader header={header} closeModal={closeModal} />
        <Spacer level={header ? 4 : 2} />
        <main>{body}</main>
        {footer && <Spacer level={4} />}
        <ModalFooter footer={footer} />
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
