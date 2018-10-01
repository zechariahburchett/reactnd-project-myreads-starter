import React from 'react';
import Book from './Book';

class Shelf extends React.Component {
  render(){
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.name}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {
              this.props.books.map((book, key) => <Book updateAppState={this.props.updateAppState} book={book} key={key} updateShelf={this.props.updateShelf} />)
            }
          </ol>
        </div>
      </div>
    );
  }
}

export default Shelf;
