import React, {Component} from 'react';
import * as BooksAPI from '../../BooksAPI';
import {Link} from 'react-router-dom';
import Book from '../Book/Book';

type Props = {
    library: Array<{title: string, author: string, imageLinks: {thumbnail: string}, shelf: string}>,
    moveBook: () => void
}

class Search extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            searchResults: []
        }
    }

    updateQuery = (query) => {
        this.setState({query: query})
        if (query) {
            BooksAPI.search(query).then(books => {
                if (books.error) {
                    this.setState({searchResults: []})
                } else {
                    this.setState({searchResults: books})
                }
            })
        }

    }

    reset = () => {
        this.setState( {searchResults: [], query: ''})
    }

    render() {
        const {library, moveBook} = this.props;
        const {searchResults, query} = this.state;
        return (
            <div className='search-books'>
                <div className='search-books-bar'>
                    <Link to='/' className='close-search'>Home</Link>
                    <button onClick={this.reset} className='reset'>Reset</button>
                    <div className='search-books-input-wrapper'>
                        <input
                            type='text'
                            placeholder='Search by title or author'
                            value={query}
                            onChange={(event)=> this.updateQuery(event.target.value)}
                        />
                    </div>
                </div>
                <div className='search-books-results'>
                    <ol className='books-grid'>
                        {searchResults.map(searchResult => {
                            const shelf = library.filter(book => book.title === searchResult.title);
                            const shelfLocation = shelf.length > 0 ? shelf[0].shelf : '';
                            return  <Book id={searchResult.id} moveBook={moveBook} authors={searchResult.authors} title={searchResult.title} url={searchResult.imageLinks.thumbnail} shelf={shelfLocation} key={searchResult.title} />
                        })}
                    </ol>
                </div>
            </div>
        )
    }
}

export default Search;
