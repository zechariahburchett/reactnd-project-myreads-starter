import React from 'react';
import * as BooksAPI from '../BooksAPI'

class Book extends React.Component {

  constructor(props){
    super(props);
    this.state={
      book: props.book
    }
  }

  // moveToBookshelf = (e) => {
  // const book = this.props.book
  // const shelf = e.target.value
  // console.log (book)
  // console.log (shelf)
  // BooksAPI.update(book, shelf)
  // }

  updateBookShelf(book, shelf){
    BooksAPI.update(book, shelf)
    .then(r => {
      this.props.updateAppState();
    });
  }

  render(){
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url(${this.state.book.imageLinks.thumbnail || `""`})` }}></div>
            <div className="book-shelf-changer">
              <select value={this.state.book.shelf || "none"} onChange={(e)=>{this.updateBookShelf(this.state.book, e.target.value)}}>
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{this.state.book.title}</div>
          <div className="book-authors">{this.state.book.authors.map(author => author).join(", ") || "No Author"}</div>
        </div>
      </li>
    );
  }
}

export default Book;
