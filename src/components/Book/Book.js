import React, {Component} from 'react';
import './Book.css';
import BookSwitcher from '../BookSwitcher/BookSwitcher';

type Props = {
    authors?: Array<string>,
    title: string,
    url: string,
    moveBook: () => void,
    id: string,
    shelf?: string
}

class Book extends Component<Props> {
    render() {
        const {title, authors, url, moveBook, id, shelf} = this.props;
        return (
            <div className='bookWrapper'>
                <div className='book'>
                    <img src={url} alt='book' />
                    <BookSwitcher title={title} moveBook={moveBook} id={id} shelf={shelf} />
                </div>
                <div className='meta'>
                    <span>{title}</span>
                </div>
                <div className='meta'>
                    <span>{authors}</span>
                </div>
            </div>
        )
    }
}

export default Book;
