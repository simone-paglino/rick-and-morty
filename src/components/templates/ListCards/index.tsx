import React, { useEffect, useState } from 'react'
// Organisms
import Card from '../../organisms/Card'
import PaginationBar from '../../organisms/PaginationBar'
// Hooks
import useAPI from '../../../hooks/useAPI'
// Types
import {
	CardsState,
	DataFetchedCardsAPI,
	PaginationDetailsType
} from '../../../types/templates'
// Styles
import './index.scss'
import useCharactersPagination from '../../../hooks/useCharactersPagination'

const ListCards: React.FC = () => {
	const {
		getLocationsAndEpisodesForCharacters,
		getAllLocationsAndEpisodesForCharacter,
		getIdsLocationOrEpisodeNotFetchedYet,
		getLocationsFetched,
		getEpisodesFetched,
		getArrayCardsProps
	} = useCharactersPagination()
	const { fetchPageCharacters} = useAPI()

	const [paginationDetails, setPaginationDetails] = useState<PaginationDetailsType>({
		maxPages: 1,
		currentPage: 1
	})
	const [charactersPages, setCharactersPages] = useState<CardsState>({})
	const [dictionaryDataFetched, setDictionaryDataFetched] = useState<DataFetchedCardsAPI>({
		locations: {},
		episodes: {}
	})

	const isPreviousDisabled = (currentPage: number): boolean => currentPage < 2
	const isNextDisabled = (currentPage: number, maxPages: number): boolean => currentPage === maxPages

	const handleGoToPreviousPage = (): void => {
		setPaginationDetails(({ currentPage, maxPages }) => ({
			maxPages,
			currentPage: isPreviousDisabled(currentPage) ? currentPage : currentPage - 1
		}))
	}

	const handleGoToNextPage = (): void => {
		setPaginationDetails(({currentPage, maxPages}) => ({
			maxPages,
			currentPage: isNextDisabled(currentPage, maxPages) ? currentPage : currentPage + 1
		}))
	}
  
	

	const updatePage = async (): Promise<void> => {
		if (!charactersPages[paginationDetails.currentPage]) {
			const { data } = await fetchPageCharacters(paginationDetails.currentPage)

			if (data) {
				const { info, results: charactersFromAPI } = data

				setPaginationDetails(previousState => ({
					...previousState,
					maxPages: info.pages
				}))

				const locationsIdsAndEpisodesIds = getLocationsAndEpisodesForCharacters(charactersFromAPI)

				const allLocationsAndEpisodes = getAllLocationsAndEpisodesForCharacter(locationsIdsAndEpisodesIds)

				const locationIdsToFetch = getIdsLocationOrEpisodeNotFetchedYet(
					allLocationsAndEpisodes.idsLocation,
					dictionaryDataFetched.locations
				)
        
				const episodeIdsToFetch = getIdsLocationOrEpisodeNotFetchedYet(
					allLocationsAndEpisodes.idsEpisodes,
					dictionaryDataFetched.episodes
				)

				const locationsFetchedForCurrentPage = await getLocationsFetched(locationIdsToFetch)
				const episodesFetchedForCurrentPage = await getEpisodesFetched(episodeIdsToFetch)

				const allLocationsFetched = { ...dictionaryDataFetched.locations, ...locationsFetchedForCurrentPage }
				const allEpisodesFetched = { ...dictionaryDataFetched.episodes, ...episodesFetchedForCurrentPage }

				setDictionaryDataFetched({
					locations: allLocationsFetched,
					episodes: allEpisodesFetched
				})

				const charactersCurrentPage = getArrayCardsProps(
					charactersFromAPI,
					locationsIdsAndEpisodesIds,
					allLocationsFetched,
					allEpisodesFetched,
					paginationDetails.currentPage
				)

				setCharactersPages(previousState => ({
					...previousState,
					...charactersCurrentPage
				}))
			}
		}
	}

	useEffect(() => {
		updatePage()
	}, [paginationDetails.currentPage])

	return (
		<div>
			<div className='list-cards'>
				{
					charactersPages[paginationDetails.currentPage]
				&& charactersPages[paginationDetails.currentPage].map((cardProps, index) => <Card key={index} {...cardProps} />)
				}
			</div>
			<PaginationBar
				disableNext={isNextDisabled(paginationDetails.currentPage, paginationDetails.maxPages) || !charactersPages[paginationDetails.currentPage]}
				disablePrevious={isPreviousDisabled(paginationDetails.currentPage)}
				onClickPrevious={handleGoToPreviousPage}
				onClickNext={handleGoToNextPage}
				pageNumber={paginationDetails.currentPage}
			/>
		</div>
	)
}

export default ListCards
