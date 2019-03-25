import React, { Component } from 'react';

class Book extends Component{

    render(){
        return(
            <div className="bookEntry">
                <img src={this.props.pic}/>
                <h3>{this.props.title}</h3>
                <h4>Author:{this.props.author}</h4>
                <h4>Price:{this.props.price}</h4>
                <h4>Description:{this.props.description}</h4>
            </div>
        )
    }
}

export default Book;