import React, { Component } from 'react';
import Book from './Book'

class BookList extends Component{

    render(){
        const books = Object.keys(this.props.state.books)
        .map(key=>{
            return <Book title={this.props.state.books[key].Title}
                        pic = {this.props.state.books[key].img}
                        author = {this.props.state.books[key].Author}
                        price ={this.props.state.books[key].Price}
                        description={this.props.state.books[key].Description}/>
        })
        return books;
    }
}

export default BookList;