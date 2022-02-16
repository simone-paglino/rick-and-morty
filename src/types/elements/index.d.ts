// Types
import { EventOnClickButton } from '../general'

export type IconMoreLessProps = {
  onClick: () => void;
  show?: boolean;
  className?: string;
}

export type ButtonProps = {
  onClick: (event?: EventOnClickButton) => void;
  className?: string;
  disabled?: boolean;
}