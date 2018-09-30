import React from 'react';
import { Link } from 'react-router-dom';
import Shelf from '../Shelf';
import * as BooksAPI from '../../BooksAPI'

class Main extends React.Component {

  componentDidMount(){
    BooksAPI.getAll()
    .then(books => {
      console.log(books);
      this.setState({ books });
    });
  }

  constructor(props){
    super(props);
    this.state={
      books:[]
    }
  }

  render(){
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <Shelf name="Currently Reading" books={this.state.books.filter(book => book.shelf === "currentlyReading")} />
            <Shelf name="Want To Read" books={this.state.books.filter(book => book.shelf === "wantToRead")} />
            <Shelf name="Read" books={this.state.books.filter(book => book.shelf === "read")} />
          </div>
        </div>
        <div className="open-search">
          <Link to="search">Add a book</Link>
        </div>
      </div>
    );
  }
}

export default Main;
