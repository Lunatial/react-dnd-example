import {useState} from "react"
import update from 'immutability-helper'

import CardExample from "./Card"

const Container = () => {
    const [cards, setCards] = useState([
        {
            id: 1,
            text: 'Géza',
        },
        {
            id: 2,
            text: 'Elemér',
        },
        {
            id: 3,
            text: 'Ottó',
        },
        {
            id: 4,
            text: 'János',
        },
        {
            id: 5,
            text: 'Márton',
        },
        {
            id: 6,
            text: 'Lőrinc',
        },
        {
            id: 7,
            text: 'Gábor',
        },
    ])

    const moveCard = (dragIndex, hoverIndex) => {
        const dragCard = cards[dragIndex]
        setCards(update(cards, {
            $splice: [
                [dragIndex, 1],
                [hoverIndex, 0, dragCard],
            ],
        }))
    }

    return (
        <>
            {
                cards.map((card, index) => {
                    return <CardExample
                        key={card.id}
                        id={card.id}
                        text={card.text}
                        index={index}
                        moveCard={moveCard} />
                })
            }
        </>
    )
}

export default Container
