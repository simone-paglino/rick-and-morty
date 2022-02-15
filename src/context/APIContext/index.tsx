import React, { createContext, useContext, useState } from 'react'
// Enums
import { REQUEST_STATE } from '../../enums'
// Types
import { useAPIContextReturnType } from '../../types/context'

const APIContext = createContext<useAPIContextReturnType>({
	requestState: REQUEST_STATE.INIT,
	setRequestState: () => undefined
})

const APIContextProvider: React.FC = ({ children }) => {
	const [requestState, setRequestState] = useState(REQUEST_STATE.INIT)

	return (
		<APIContext.Provider value={{ requestState, setRequestState }}>
			{children}
		</APIContext.Provider>
	)
}

const useAPIContext = (): useAPIContextReturnType => {
	const context = useContext(APIContext)
	return {...context}
}

export { APIContextProvider, useAPIContext }