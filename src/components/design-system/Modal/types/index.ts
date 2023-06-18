import { ReactNode } from 'react'

export type ModalContainerProps = {
  body: ReactNode
  closeModal: () => void
  footer?: ReactNode
  header?: ReactNode
  isOpen: boolean
}

export type ModalProps = Pick<
  ModalContainerProps,
  'body' | 'closeModal' | 'footer' | 'header'
>

export type ModalHeaderProps = Pick<ModalProps, 'closeModal' | 'header'>
export type ModalFooterProps = Pick<ModalProps, 'footer'>
