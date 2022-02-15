import React, { useEffect, useState } from 'react'
// Organisms
import Card from '../../organisms/Card'
import PaginationBar from '../../organisms/PaginationBar'
// Hooks
import useAPI from '../../../hooks/useAPI'
// Types
import { CardProps, CharacterDetails, EpisodeDetails, LocationDetails } from '../../../types/organisms'
import { CardsState, DataFetchedCardsAPI, DictionaryByIndex, PaginationDetailsType } from '../../../types/templates'
import { SingleCharacterDetailsAPIResponse } from '../../../types/hooks'
// Utils
import { omit } from '../../../utils'
// Styles
import './index.scss'

export type getLocationsAndEpisodesForCharactersType = DictionaryByIndex<{
  idsLocation: [number, number],
  idsEpisodes: number[]
}>

export type AllLocationsAndEpisodesForCharacterType = {
  idsLocation: number[],
  idsEpisodes: number[]
}

const ListCards: React.FC = () => {
	const { fetchPageCharacters, fetchMultipleLocations, fetchMultipleEpisodes } = useAPI()

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
  
	const getIdFromUrl = (url: string): number => {
		const regexToExtractIdFromUrl = /\d+$/
		return parseInt(regexToExtractIdFromUrl.exec(url)?.[0] ?? '-1')
	}

	const getLocationsAndEpisodesForCharacters = (characters: SingleCharacterDetailsAPIResponse[]): getLocationsAndEpisodesForCharactersType => {
		return characters.reduce((acc, { id, location, origin, episode }) => {
			const idLocation = getIdFromUrl(location.url)
			const idOrigin = getIdFromUrl(origin.url)
			const idsEpisodes = episode.map(urlEpisode => getIdFromUrl(urlEpisode))

			return { ...acc, [id]: { idsLocation: [idLocation, idOrigin], idsEpisodes } }
		}, {})
	}

	const getAllLocationsAndEpisodesForCharacter = (
		locationsAndEpisodes: getLocationsAndEpisodesForCharactersType
	): AllLocationsAndEpisodesForCharacterType => {
		return Object.values(locationsAndEpisodes).reduce((acc, { idsLocation, idsEpisodes }) => {
			return {
				idsLocation: [
					...acc.idsLocation,
					...idsLocation,
				],
				idsEpisodes: [
					...acc.idsEpisodes,
					...idsEpisodes,
				]
			}
		}, { idsLocation: [], idsEpisodes: [] } as AllLocationsAndEpisodesForCharacterType)
	}
  
	const getIdsLocationOrEpisodeNotFetchedYet = (
		ids: number[],
		dictionary: DictionaryByIndex<LocationDetails | EpisodeDetails>
	): number[] => {
		return ids.filter(idToCheck => !dictionary[idToCheck])
	}

	const getLocationsFetched = async (idsLocations: number[]): Promise<DictionaryByIndex<LocationDetails>> => {
		if (idsLocations.length > 0) {
			const { data: locationData } = await fetchMultipleLocations(idsLocations)
    
			if (locationData) {
				return locationData.reduce((acc, { id, name, type, dimension, residents }) => {
					return { ...acc, [id]: { id, name, type, dimension, residents: residents.length } }
				}, {})
			}
		}
		return {}
	}

	const getEpisodesFetched = async (idsEpisodes: number[]): Promise<DictionaryByIndex<EpisodeDetails>> => {
		if (idsEpisodes.length > 0) {
			const { data: episodesData } = await fetchMultipleEpisodes(idsEpisodes)
        
			if (episodesData) {
				return episodesData.reduce((acc, { id, name }) => {
					return { ...acc, [id]: { id, name } }
				}, {})
			}
		}
		return {}
	}

	const getArrayCardsToRender = (
		characters: SingleCharacterDetailsAPIResponse[],
		locationsAndEpisodes: getLocationsAndEpisodesForCharactersType,
		locationsFormatted: DictionaryByIndex<LocationDetails>,
		episodesFormatted: DictionaryByIndex<EpisodeDetails>,
		paginationNum: number
	): DictionaryByIndex<CardProps[]> => {
		const cardProps = characters.map((character) => {
			const { idsLocation, idsEpisodes } = locationsAndEpisodes[character.id]

			const location: LocationDetails = locationsFormatted[idsLocation[0]]
			const origin: LocationDetails = locationsFormatted[idsLocation[1]]

			const episodes = idsEpisodes.map(id => episodesFormatted[id].name)

			const characterForCard = omit(character, ['location', 'episode', 'url', 'created', 'origin'])

			return {
				character: characterForCard as CharacterDetails,
				location,
				origin,
				episodes
			}
		})

		return { [paginationNum]: cardProps }
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

				const charactersCurrentPage = getArrayCardsToRender(
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
		<div className='list-cards'>
			{
				charactersPages[paginationDetails.currentPage]
				&& charactersPages[paginationDetails.currentPage].map((cardProps, index) => <Card key={index} {...cardProps} />)
			}
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