import React from 'react'
import { sortable } from 'react-sortable';

class Item extends React.Component {
    render() {
        return (
            <div {...this.props}>
                {this.props.children}
            </div>
        )
    }
}

export default sortable(Item)
