import React from 'react';
import { Link } from 'react-router-dom';
import Shelf from '../Shelf';
import * as BooksAPI from '../../BooksAPI'

class Main extends React.Component {

  componentDidMount(){
    this.getBooks();
  }

  getBooks = () => {
    BooksAPI.getAll()
    .then(response => {
      this.setState({ books: response });
    });
  }

  constructor(props){
    super(props);
    this.state={
      books:[]
    }
  }

  updateBookShelf = (book, shelf) => {
    BooksAPI.update(book, shelf)
    .then(response => {
      book.shelf = shelf;
      this.getBooks();
    });
  }

  render(){
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <Shelf
              updateBookShelf={this.updateBookShelf}
              name="Currently Reading"
              books={this.state.books.filter(book => book.shelf === "currentlyReading")}
            />
            <Shelf
              updateBookShelf={this.updateBookShelf}
              name="Want To Read"
              books={this.state.books.filter(book => book.shelf === "wantToRead")}
            />
            <Shelf
              updateBookShelf={this.updateBookShelf}
              name="Read"
              books={this.state.books.filter(book => book.shelf === "read")}
            />
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
