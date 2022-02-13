import React, {useState} from 'react'
// Types
import {CardProps} from '../../../types/organisms'
import TitleAndText from '../TitleAndText'
// Styles
import './index.scss'

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
		<div className='card' onClick={handleToggleShowMoreInfo}>
			<div className='card__image-character'>
				<img src={image} />
				<div className='card__image-character__info'>
					<h4>{characterName}</h4>
					<p className='card__content__status-type'>
						<span className='card__content__status-type__circle'></span>
						<span className='card__content__status-type__text'>{status} - {characterType}</span>
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
						) : <p className='mt--2'>Loading location...</p>
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
						) : <p>Loading origin...</p>
					}
				</div>
				<div className='card__more-info__episodes'>	
					{
						episodes ? (
							<>
								<h6>Episodes appearances:</h6>
								<ul role='list'>
									{episodes?.map((item, index) => <li key={index} role='listitem'>{item}</li>)}
								</ul>
							</>
						) : <p>Loading episodes...</p>
					}
				</div>
			</div>
		</div>
	)
}

export default Card