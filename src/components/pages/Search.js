import React from 'react';
import { Link } from 'react-router-dom'
import * as BooksAPI from '../../BooksAPI'
import Book from '../Book';
class Search extends React.Component {

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
      books:[],
      searchResults: [],
      query: ''
    }
  }

  updateBookShelf = (book, shelf) => {
    BooksAPI.update(book, shelf)
    .then(response => {
      book.shelf = shelf;
      this.getBooks();
    });
  }

  updateQuery = (query) => {
    this.setState({query: query}, this.processSearch);
  }

  processSearch(){
    if(this.state.query.length === 0 || this.state.query === undefined){
      return this.setState({ searchResults: [] });
    }
    BooksAPI.search(this.state.query.trim()).then(response => {
      if(response.error){
        return this.setState({ searchResults: [] });
      }
      else{
        response.forEach(book => {
          let filteredBooks = this.state.books.filter(Book => Book.id === book.id);
          if (filteredBooks[0]){
            book.shelf = filteredBooks[0].shelf;
          }
        });
        return this.setState({ searchResults: response });
      }
    });
  }

  render(){
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/"className="close-search">Close</Link>
          <div className="search-books-input-wrapper">

            <input
              type="text"
              placeholder="Search by title or author"
              value = {this.state.query}
              onChange = {(event) => this.updateQuery(event.target.value)}
            />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {
              this.state.searchResults.map((book, key)=> <Book key={key} book={book} updateBookShelf={this.updateBookShelf}/>)
            }
          </ol>
        </div>
      </div>
    );
  }
}

export default Search;
