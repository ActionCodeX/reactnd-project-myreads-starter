import React from 'react';
import Book from '../Book/Book';
import {Titles} from '../../javascript/enums';
import './BookCase.css';

type Props = {
    library: Array<{title: string, author: string, imageLinks: {thumbnail: string}, shelf: string}>,
    moveBook: () => void
}
class BookCase extends React.Component<Props> {

    shelfTitles = {
        [Titles.CURRENTLY_READING]: 'Currently Reading',
        [Titles.WANT_TO_READ]: 'Want to Read',
        [Titles.READ]: 'Read'
    }

    renderShelves = (shelf: Array<*>, shelfID: string) => {
        const title = this.shelfTitles[shelfID];
        return (
            <div>
                <h2 className='bookshelf-title'>{title}</h2>
                <div className='shelfWrapper'>
                    {shelf.map(this.renderShelf)}
                </div>
            </div>
        )
    }

    renderShelf = (book: {id: string, title: string, authors: Array<string>, imageLinks: {thumbnail: string}, shelf: string}) => {
        const {moveBook} = this.props;
        return  <Book id={book.id} moveBook={moveBook} authors={book.authors} title={book.title} url={book.imageLinks.thumbnail} shelf={book.shelf} key={book.title} />
    }

    render() {
        const {library} = this.props;
        const currentlyReading = library.filter(book => book.shelf === 'currentlyReading');
        const wantToRead = library.filter(book => book.shelf === 'wantToRead');
        const read = library.filter(book => book.shelf === 'read');
        return (
            <div>
                <div className='list-books-title'>
                    <h1>MyReads</h1>
                </div>
                    <div className='wrapper'>
                        {this.renderShelves(currentlyReading, [Titles.CURRENTLY_READING])}
                        {this.renderShelves(wantToRead, [Titles.WANT_TO_READ])}
                        {this.renderShelves(read, [Titles.READ])}
                    </div>

            </div>
        )
    }
}

export default BookCase;
