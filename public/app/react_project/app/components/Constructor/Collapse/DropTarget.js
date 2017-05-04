import { DropTarget } from 'react-dnd'
import { findDOMNode } from 'react-dom'

const target = {
    drop(props, monitor, component) {
        const item = monitor.getItem()
        const index = calculateIndex(props, monitor, component)

        if (Number.isInteger(item.index)) {
            props.onChange(monitor.getItem().index)
        }

        (props.onMove||(()=>{}))(-1)

        return {
            category: props.category,
            index,
            id: props.byIndex
                ? (props.byIndex(index)||{}).id
                : null
        }
    },
    hover(props, monitor, component) {
        const item = monitor.getItem()

        if (!props.data) return

        if (item.data.id == props.data.id) return

        props.onMove(calculateIndex(props, monitor, component))
    }
}

function calculateIndex(props, monitor, component) {

    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    const parentOffsetY = monitor.getClientOffset().y - hoverBoundingRect.top;

    return parentOffsetY > hoverMiddleY
        ? props.index+1
        : props.index
}

const DropTargetDecorator = DropTarget('newsItem', target, function (connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver()
    }
})

export default component => DropTargetDecorator(component)
