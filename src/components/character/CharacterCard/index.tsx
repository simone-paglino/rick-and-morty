import React, { FC } from 'react'
import CharacterStatus from '../Status'
import { CharacterGender, CharacterStatusType } from '../../../types/characters'
import Spacer from '../../design-system/Spacer'
import FlexBox from '../../design-system/FlexBox'
import Text from '../../design-system/Text'
import LabelAndDescription from '../../design-system/LabelAndDescription'
import { CardStyledNew, Line } from './styled'
import Image from '../../design-system/Image'
import Center from '../../layout/Center'

type CharacterCardProps = {
  id: number
  characterName: string
  episodeIndexes: Array<number>
  gender: CharacterGender
  imageUrl: string
  locationName: string
  originName: string
  species: string
  status: CharacterStatusType
}

const CharacterCard: FC<CharacterCardProps> = ({
  id,
  characterName,
  gender,
  imageUrl,
  locationName,
  originName,
  species,
  status,
}) => {
  return (
    <CardStyledNew>
      <Center>
        <Image
          borderRadius="50%"
          src={imageUrl}
          title={`${characterName} image`}
          height={150}
          width={150}
        />
      </Center>
      <Spacer level={2.5} />
      <FlexBox alignItems="center" justifyContent="space-between">
        <div>
          <Text typography="subtitle" usage="extra-bold">
            {characterName}
          </Text>
        </div>
        <Spacer level={2} isHorizontal />
        <CharacterStatus status={status} />
      </FlexBox>
      {species && (
        <>
          <Spacer level={1} />
          <FlexBox alignItems="center">
            <Line />
            <Spacer level={0.5} isHorizontal />
            <Text typography="normal">{species}</Text>
            <Spacer level={0.5} isHorizontal />
            <Line />
          </FlexBox>
        </>
      )}
      <Spacer level={2.5} />
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
    </CardStyledNew>
  )
}

export default CharacterCard
