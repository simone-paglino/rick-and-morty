import React, { FC } from 'react'
// Types
import { CardProps } from '../../../types/organisms'
import IconMoreLess from '../../elements/IconMoreLess'
import TitleAndText from '../TitleAndText'
// Styles
import './index.scss'

type CardProps1 = {
  id: number
  characterName: string
  gender: 'Female' | 'Male' | 'Genderless' | 'unknown'
  imageUrl: string
  locationName: string
  originName: string
  species: string
  status: 'Alive' | 'Dead' | 'unknown'
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
  // TODO: Add link to the profile page of the single character using the id prop

  return (
    <div className="card">
      <div className="card__image-character">
        <img src={imageUrl} />
        <div className="card__image-character__info">
          <h4 className="card__image-character__info__name">{characterName}</h4>
          <p className="card__content__status-type">
            <span
              className={`card__content__status-type--${status.toLocaleLowerCase()}`}
            ></span>
            <span className="card__content__status-type__text">
              {status}
              {species && ` - ${species}`}
            </span>
          </p>
          <TitleAndText
            boldText="Gender:"
            standardText={gender}
            className="mt--1"
          />
          {location ? (
            <>
              <TitleAndText
                boldText="Location name:"
                standardText={locationName}
                className="mt--2"
              />
            </>
          ) : (
            <b className="mt--2">Location unknown</b>
          )}
          <div>
            {origin ? (
              <TitleAndText boldText="Origin name:" standardText={originName} />
            ) : (
              <b>Origin unknown</b>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

/*
const Card: React.FC<Pick<CardProps, 'character'> & Partial<Omit<CardProps, 'character'>>> = ({
	character,
	location,
	origin,
	episodes
}) => {
	const [showMoreInfo, setShowMoreInfo] = useState(false)

	const { name: characterName, type: characterType, status, gender, image } = character
	const { name: locationName, type: locationType, dimension, residents } = location ?? {}
	const { name: originName, type: originType, dimension: originDimension, residents: originResidents } = origin ?? {}

	const handleToggleShowMoreInfo = (): void => setShowMoreInfo(previousState => !previousState)

	return (
		<div className='card'>
			<div className='card__image-character'>
				<img src={image} />
				<div className='card__image-character__info'>
					<IconMoreLess show={showMoreInfo} className='card__image-character__info__icon' onClick={handleToggleShowMoreInfo} />
					<h4 className='card__image-character__info__name'>{characterName}</h4>
					<p className='card__content__status-type'>
						<span
							className={`card__content__status-type--${status.toLocaleLowerCase()}`}
						></span>
						<span className='card__content__status-type__text'>{status}{characterType && ` - ${characterType}`}</span>
					</p>
					<TitleAndText boldText='Gender:' standardText={gender} className='mt--1' />
					{
						location ? (
							<>
								<TitleAndText boldText='Location name:' standardText={locationName} className='mt--2' />
								<TitleAndText boldText='Location type:' standardText={locationType} className='mt--1' />
								<TitleAndText boldText='Dimension:' standardText={dimension} className='mt--1' />
								<TitleAndText boldText='N° of residents:' standardText={residents} className='mt--1' />
							</>
						) : <b className='mt--2'>Location unknown</b>
					}
				</div>
			</div>
			<div className={`card__more-info collapse--${showMoreInfo ? 'open' : 'close'}`} aria-hidden={!showMoreInfo}>
				<div>
					{
						origin ? (
							<>
								<TitleAndText boldText='Origin name:' standardText={originName} />
								<TitleAndText boldText='Origin type:' standardText={originType} className='mt--1' />
								<TitleAndText boldText='Origin dimension:' standardText={originDimension} className='mt--1' />
								<TitleAndText boldText='Origin n° of residents:' standardText={originResidents} className='mt--1' />
							</>
						) : <b>Origin unknown</b>
					}
				</div>
				<div className='card__more-info__episodes'>
					{
						episodes ? (
							<>
								<h5>Episodes appearances:</h5>
								<ul className='card__more-info__episodes__list' role='list'>
									{episodes?.map((item, index) => <li key={index} role='listitem'>{item}</li>)}
								</ul>
							</>
						) : <p>No episodes</p>
					}
				</div>
			</div>
		</div>
	)
}

*/

export default Card
