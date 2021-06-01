import React, {Component} from 'react';

type Props = {
    moveBook: () => void,
    id: string,
    shelf?: {shelf: string}
}

class BookSwitcher extends Component<Props> {
    render() {
        const {id, moveBook, shelf} = this.props;
        return (
            <div>
                <select value={shelf} onChange={(event)=>moveBook(id, event.target.value)}>
                    <option value='move'>None</option>
                    <option value='currentlyReading'>Currently Reading</option>
                    <option value='wantToRead'>Want to Read</option>
                    <option value='read'>Read</option>
                </select>
            </div>
        )
    }
}

export default BookSwitcher;
