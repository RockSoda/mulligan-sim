import React, { useState, useEffect } from 'react'

const API = "https://api.scryfall.com/cards/named?exact="

const Card = ({ cardCode, toggleLoading }) => {
    const [card, setCard] = useState('')

    useEffect(() => {
        const toFetch = async () => {
            toggleLoading(true)
            await fetch(`${API}${cardCode}`)
                .then(res => res.json())
                .then(result => {
                    setCard(result)
                })
        }

        toFetch()
    }, [cardCode])


    useEffect(() => {
        toggleLoading(false)
    }, [card])


    return (
        <div className="pic">
            {card && <img src={(typeof card.image_uris != "undefined") ? (card.image_uris.border_crop) : (card.card_faces[0].image_uris.border_crop)} />}
        </div>
    )
}

export default Card
