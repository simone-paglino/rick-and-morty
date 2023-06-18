import React, { FC, useState } from 'react'
import { Modal } from '../../design-system'
import { useEpisodes } from '../../../hooks/useEpisodes'
import CharacterStatus from '../../character/Status'
import { CharacterStatusType } from '../../../types'
import Spacer from '../../design-system/Spacer'
import FlexBox from '../../design-system/FlexBox'
import Text from '../../design-system/Text'
import LabelAndDescription from '../../design-system/LabelAndDescription'
import { CardStyled, CardStyledNew, Line } from './styled'
import Image from '../../design-system/Image'
import Center from '../../layout/Center'

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

  // return (
  //   <>
  //     <CardStyled onClick={openModal}>
  //       <FlexBox alignItems="center">
  //         <Image
  //           src={imageUrl}
  //           title={`${characterName} image`}
  //           height={220}
  //           width={220}
  //         />
  //         <Spacer level={2} isHorizontal />
  //         <div>
  //           <Text typography="subtitle-small">{characterName}</Text>
  //           <Spacer level={1} />
  //           <FlexBox alignItems={'center'}>
  //             <CharacterStatus status={status} />
  //             {species && (
  //               <>
  //                 <Spacer isHorizontal level={1} />
  //                 <Text typography="normal">{` - ${species}`}</Text>
  //               </>
  //             )}
  //           </FlexBox>
  //           <Spacer level={2} />
  //           {gender && (
  //             <>
  //               <LabelAndDescription
  //                 label="Gender: "
  //                 description={gender ?? 'unknown'}
  //               />
  //               <Spacer level={1} />
  //             </>
  //           )}
  //           {location && (
  //             <>
  //               <LabelAndDescription
  //                 label="Location: "
  //                 description={location ? locationName : 'unknown'}
  //               />
  //               <Spacer level={1} />
  //             </>
  //           )}
  //           {origin && (
  //             <LabelAndDescription
  //               label="Origin: "
  //               description={origin ? originName : 'unknown'}
  //             />
  //           )}
  //         </div>
  //       </FlexBox>
  //     </CardStyled>
  //     <Modal
  //       body={data?.episodes.map((episode, index) => (
  //         <h5 key={index}>{episode}</h5>
  //       ))}
  //       closeModal={closeModal}
  //       isOpen={showMoreDetails}
  //     />
  //   </>
  // )
}

export default Card
