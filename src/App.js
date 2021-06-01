import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Search from './components/Search/Search';
import BookCase from './components/BookCase/BookCase';
import {Route, Link} from 'react-router-dom';

class BooksApp extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
      showSearchPage: false,
      library: []
    }
  }

    componentDidMount() {
        this.getLibrary();
    }

  getLibrary() {
    BooksAPI.getAll().then(library => {
      this.setState({library})
  })}

  moveBook = (id, shelf) => {
    BooksAPI.update(id, shelf).then(()=>this.getLibrary());
  }

  render() {
    const {library} = this.state;
    return (
      <div className='app'>
          <Route exact path='/search' render={() => (
              <div>
                  <Search moveBook={this.moveBook} library={library} />
              </div>
                  )} />
          <Route exact path='/' render={() => (
              <div>
                  <Link to='/search'><div className='icon'/> </Link>
                  <BookCase library={library} moveBook={this.moveBook}/>
              </div>
          )} />
      </div>
    )
  }
}

export default BooksApp
