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
  PaginationDetailsType,
} from '../../../types/templates'
// Styles
import './index.scss'
import { useCharacters } from '../../../hooks/useCharacters'

const ListCards: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1)

  const { data, status: apiStatus } = useCharacters({
    pagination: {
      paginationNumber: currentPage,
    },
  })

  if (['IDLE', 'LOADING'].includes(apiStatus)) {
    return <h1>Loading...</h1>
  }

  return (
    <div>
      <div className="list-cards">
        {data &&
          data.charactersPageList.map(
            (
              { id, image, gender, name, species, status, origin, location },
              index
            ) => (
              <Card
                key={index}
                characterName={name}
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
      </div>
      <PaginationBar
        disableNext={!data?.isNext}
        disablePrevious={!data?.isPrevious}
        onClickPrevious={() =>
          setCurrentPage((previousState) => previousState - 1)
        }
        onClickNext={() => setCurrentPage((previousState) => previousState + 1)}
        pageNumber={currentPage}
      />
    </div>
  )
}

export default ListCards
