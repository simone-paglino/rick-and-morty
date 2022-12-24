type GetCachedItem = <ResultType>(params: {
  key: string
  parse?: boolean
}) => (ResultType | null) | (string | null)

type UpdateCache = <ValueType>(key: string, value: ValueType) => void

type UseCache = () => {
  getCachedItem: GetCachedItem
  updateCache: UpdateCache
}

export const useCache: UseCache = () => {
  const getCachedItem: GetCachedItem = ({ key, parse = true }) => {
    if (typeof window?.sessionStorage?.getItem === 'function') {
      const cachedValue = sessionStorage.getItem(key)

      if (!cachedValue) {
        return null
      }

      return parse ? JSON.parse(cachedValue) : cachedValue
    }
    return null
  }

  const updateCache: UpdateCache = (key, value) => {
    if (typeof window?.sessionStorage?.setItem === 'function') {
      const stringifyValue = JSON.stringify(value)
      sessionStorage.setItem(key, stringifyValue)

      return true
    }

    return false
  }

  return {
    getCachedItem,
    updateCache,
  }
}
