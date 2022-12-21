import { GenericObject } from '../types/general'

export const omit = (
  objectToRemoveFieldsFrom: GenericObject<any>,
  fieldsToRemove: string[]
): GenericObject<any> => {
  const shallowCopy = { ...objectToRemoveFieldsFrom }
  
  fieldsToRemove.forEach(fieldName => {
    delete shallowCopy[fieldName]
  })

  return shallowCopy
}