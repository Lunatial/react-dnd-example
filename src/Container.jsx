import {useState} from "react"
import update from 'immutability-helper'

import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Typography from '@mui/material/Typography'

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
    const [checked, setChecked] = useState(true)

    const handleChange = (event) => {
        setChecked(event.target.checked)
    }

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
        <div style={{margin: '1rem'}}>
            <Typography align="center" component="h1" variant="h4" gutterBottom color="primary">React DND example</Typography>
            <FormGroup>
                <FormControlLabel
                    control={<Checkbox
                        checked={checked}
                        onChange={handleChange}
                    />}
                    label={checked ? 'column' : 'row'}/>
            </FormGroup>
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                flexDirection: checked ? 'column' : 'row',
            }}>
                {
                    cards.map((card, index) => {
                        return <CardExample
                            key={card.id}
                            id={card.id}
                            text={card.text}
                            index={index}
                            moveCard={moveCard}/>
                    })
                }
            </div>
        </div>
    )
}

export default Container
