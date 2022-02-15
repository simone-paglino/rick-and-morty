export type GenericObject<T> = {
  [fieldName: string]: T;
}

export type EventOnClickButton = React.MouseEvent<HTMLButtonElement, MouseEvent>