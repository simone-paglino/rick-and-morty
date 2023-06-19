import React, { FC, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useCharacters } from '../../hooks/useCharacters'
import PageWrapper from '../layout/PageWrapper'
import Pagination from '../design-system/Pagination'
import CharacterCard from './CharacterCard'
import Text from '../design-system/Text'
import { ListCardsStyled } from './styled'
import Spacer from '../design-system/Spacer'

const LandingPage: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const pageParam = searchParams.get('page')

  const [currentPage, setCurrentPage] = useState<number | undefined>()

  useEffect(() => {
    const pageParamNum = Number.parseInt(pageParam ?? '0')

    if (pageParamNum > 0) {
      setCurrentPage(pageParamNum)
    } else {
      setSearchParams({ page: '1' })
    }
  }, [pageParam])

  const { data, status: apiStatus } = useCharacters({
    pagination: currentPage,
  })

  const { charactersPageList, isNext, isPrevious, lastPage } = data ?? {}

  if (!currentPage || ['IDLE', 'LOADING'].includes(apiStatus)) {
    return <h1>Loading...</h1>
  }

  if (!charactersPageList?.length) {
    return <Text typography="subtitle-small">There are no cards here...</Text>
  }

  return (
    <PageWrapper maxWidth={1440}>
      <ListCardsStyled>
        {charactersPageList.map(
          (
            {
              id,
              image,
              gender,
              episode,
              name,
              species,
              status,
              origin,
              location,
            },
            index
          ) => (
            <CharacterCard
              key={index}
              characterName={name}
              episodeIndexes={episode}
              imageUrl={image}
              id={id}
              gender={gender}
              status={status}
              originName={origin.name}
              locationName={location.name}
              species={species}
            />
          )
        )}
      </ListCardsStyled>
      <Spacer level={12.5} />
      <Pagination
        currentPage={currentPage}
        isNextDisabled={!isNext}
        isPreviousDisable={!isPrevious}
        lastPage={lastPage}
        onClickPrevious={() => setSearchParams({ page: `${currentPage - 1}` })}
        onClickNext={() => setSearchParams({ page: `${currentPage + 1}` })}
      />
    </PageWrapper>
  )
}

export default LandingPage
