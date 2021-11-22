import {forwardRef, useImperativeHandle, useRef} from 'react'
import {DragSource, DropTarget,} from 'react-dnd'

import CardMedia from "@mui/material/CardMedia"
import iguana from "./static/contemplative-reptile.jpg"
import CardContent from "@mui/material/CardContent"
import Typography from "@mui/material/Typography"
import CardActions from "@mui/material/CardActions"
import Button from "@mui/material/Button"
import Card from "@mui/material/Card"

import {itemTypes} from './itemTypes'

const style = {
    backgroundColor: 'white',
    cursor: 'move',
    width: 345
};

const CardExample = forwardRef(function CardExample({
                                                        id,
                                                        text,
                                                        index,
                                                        moveCard,
                                                        isDragging,
                                                        connectDragSource,
                                                        connectDropTarget
                                                    }, ref) {
    const elementRef = useRef(null)
    connectDragSource(elementRef)
    connectDropTarget(elementRef)
    const opacity = isDragging ? 0 : 1
    useImperativeHandle(ref, () => ({
        getNode: () => elementRef.current,
    }))

    return (
        <div ref={elementRef} style={{...style, opacity}}>
            <Card sx={{maxWidth: 345, margin: '1rem'}}>
                <CardMedia
                    component="img"
                    height="140"
                    image={iguana}
                    alt="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Lizard {id}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {text}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Share</Button>
                    <Button size="small">Learn More</Button>
                </CardActions>
            </Card>
        </div>
    )
})

export default DropTarget(itemTypes.CARD, {
    hover(props, monitor, component) {
        if (!component) {
            return null
        }
        // node = HTML Div element from imperative API
        const node = component.getNode()
        if (!node) {
            return null
        }
        const dragIndex = monitor.getItem().index
        const hoverIndex = props.index
        // Don't replace items with themselves
        if (dragIndex === hoverIndex) {
            return
        }
        // Determine rectangle on screen
        const hoverBoundingRect = node.getBoundingClientRect()
        // Get vertical middle
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
        // Determine mouse position
        const clientOffset = monitor.getClientOffset()
        // Get pixels to the top
        const hoverClientY = clientOffset.y - hoverBoundingRect.top
        // Only perform the move when the mouse has crossed half of the items height
        // When dragging downwards, only move when the cursor is below 50%
        // When dragging upwards, only move when the cursor is above 50%
        // Dragging downwards
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            return
        }
        // Dragging upwards
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            return
        }
        // Time to actually perform the action
        props.moveCard(dragIndex, hoverIndex)
        // Note: we're mutating the monitor item here!
        // Generally it's better to avoid mutations,
        // but it's good here for the sake of performance
        // to avoid expensive index searches.
        monitor.getItem().index = hoverIndex
    },
}, (connect) => ({
    connectDropTarget: connect.dropTarget(),
}))(DragSource(itemTypes.CARD, {
    beginDrag: (props) => ({
        id: props.id,
        index: props.index,
    }),
}, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
}))(CardExample))

