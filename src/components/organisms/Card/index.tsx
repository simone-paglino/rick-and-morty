import React, { FC, useState } from 'react'
import { Modal } from '../../design-system'
import { useEpisodes } from '../../../hooks/useEpisodes'
import CharacterStatus from '../../character/Status'
import { CharacterStatusType } from '../../../types'
import Spacer from '../../design-system/Spacer'
import FlexBox from '../../design-system/FlexBox'
import Text from '../../design-system/Text'
import LabelAndDescription from '../../design-system/LabelAndDescription'
import './index.scss'

type CardProps1 = {
  id: number
  characterName: string
  gender: 'Female' | 'Male' | 'Genderless' | 'unknown'
  episodeIndexes: Array<number>
  imageUrl: string
  locationName: string
  originName: string
  species: string
  status: CharacterStatusType
}

const Card: FC<CardProps1> = ({
  id,
  characterName,
  gender,
  episodeIndexes,
  imageUrl,
  locationName,
  originName,
  species,
  status,
}) => {
  // TODO: Add link to the profile page of the single character using the id prop

  const [showMoreDetails, setShowMoreDetails] = useState(false)

  const { data, status: apiStatus } = useEpisodes({
    listEpisodes: episodeIndexes ?? [],
    lazyFetch: !showMoreDetails,
  })

  const openModal = () => setShowMoreDetails(true)
  const closeModal = () => setShowMoreDetails(false)

  return (
    <>
      <div className="card" onClick={openModal}>
        <FlexBox alignItems="center">
          <img className="card__image-character__image" src={imageUrl} />
          <Spacer level={2} isHorizontal />
          <div>
            <Text typography="subtitle-small">{characterName}</Text>
            <Spacer level={1} />
            <FlexBox alignItems={'center'}>
              <CharacterStatus status={status} />
              {species && (
                <>
                  <Spacer isHorizontal level={1} />
                  <Text typography="normal">{` - ${species}`}</Text>
                </>
              )}
            </FlexBox>
            <Spacer level={2} />
            {gender && (
              <>
                <LabelAndDescription
                  label="Gender: "
                  description={gender ?? 'unknown'}
                />
                <Spacer level={1} />
              </>
            )}
            {location && (
              <>
                <LabelAndDescription
                  label="Location: "
                  description={location ? locationName : 'unknown'}
                />
                <Spacer level={1} />
              </>
            )}
            {origin && (
              <LabelAndDescription
                label="Origin: "
                description={origin ? originName : 'unknown'}
              />
            )}
          </div>
        </FlexBox>
      </div>
      <Modal
        body={data?.episodes.map((episode, index) => (
          <h5 key={index}>{episode}</h5>
        ))}
        closeModal={closeModal}
        isOpen={showMoreDetails}
      />
    </>
  )
}

export default Card
