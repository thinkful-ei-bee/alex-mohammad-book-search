import React, { Component } from 'react';
import './App.css';
import 'font-awesome/css/font-awesome.min.css';
import BookList from './BookList';

class App extends Component {
  constructor(props){
    super(props);
    this.state ={
      books:[],
      print_filterOpen:false,
      book_filterOpen:false,
      filterPrint:"all",
      filterBook:"",
      search:"",
    }
  }

  togglePrintList(){
    this.setState(prevState => ({
      print_filterOpen: !prevState.print_filterOpen
    }))
  }

  toggleBookList(){
    this.setState(prevState => ({
      book_filterOpen: !prevState.book_filterOpen
    }))
  }

  handleSearchChange(search){
    this.setState({search});
  }

  filterPrintItem(string){
    this.setState({
      filterPrint:string
    })
  }

  filterBookItem(string){
    this.setState({
      filterBook:string
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    let url ='https://www.googleapis.com/books/v1/volumes?q=';
    url += this.state.search
    if(this.state.filterBook!==""){
      url +='&filter='
      url +=this.state.filterBook
    }
    url +='&printType='
    url += this.state.filterPrint
    url += '&key=AIzaSyCnR4rW94c-lhGoEa_4R_ugMAPOx2HJmFY'

    fetch(url)
      .then(res => {
        if(!res.ok) {
          throw new Error('Something went wrong, please try again later');
        }
        return res.json();
      })
      .then(data => {
        this.setState({
          books:[],
        })
        data.items.map(book=>{
          this.setState({
           books:this.state.books.concat({
              Title:book.volumeInfo.title,
              Author:book.volumeInfo.authors,
              Price:(book.saleInfo.saleability==="FOR_SALE" && book.saleInfo.listPrice.amount) 
                    || (book.saleInfo.saleability==="NOT_FOR_SALE" && "This book is not for sale"),
              Description:book.volumeInfo.description,
              img:book.volumeInfo.imageLinks.smallThumbnail,
            })
          })

        })
 
      })
      .catch(err => {
        this.setState({
          error: err.message
        });
      });
  }


  render() {
    const{list} = this.props
    const print_filterOpen = this.state.print_filterOpen
    const book_filterOpen = this.state.book_filterOpen
    return (
      <div className="App">
        <header className="App-header">
          <h1>Google Book Search</h1>
        </header>

        <div className="search">
          <form className="searchBooks_form" onSubmit={e => this.handleSubmit(e)}>
            <label htmlFor="title">Search:</label>
            <input type="text" name="title" placeholder="henry" value={this.state.search} onChange={e=>this.handleSearchChange(e.target.value)}/>
            <button type="search_button">Search</button>
          </form>
        </div>
            <div className="filterBar">
              <div className="print_type_filter">
                <div className="print_type" onClick={() => this.togglePrintList()}>
                  <div className="print_type-title">Print Type:</div>
                    {print_filterOpen
                      ? <i className="fa fa-angle-up" size="2x"></i>
                      : <i className="fa fa-angle-down" size="2x"></i>
                    }
                </div>
                {print_filterOpen && <ul className="print_type-list">
                <button className="filter_item" onClick={() => this.filterPrintItem('all')}>all{this.state.filterPrint==="all" && <i className="fa fa-check"></i>}</button>
                <button className="filter_item" onClick={() => this.filterPrintItem('books')}>book{this.state.filterPrint==="books" && <i className="fa fa-check"></i>}</button>
                <button className="filter_item" onClick={() => this.filterPrintItem('magazines')}>magazinebook{this.state.filterPrint==="magazines" && <i className="fa fa-check"></i>}</button>
                </ul>}
              </div>

              <div className="book_type_filter">
                <div className="book_type" onClick={() => this.toggleBookList()}>
                  <div className="book_type-title">Book Type:</div>
                    {book_filterOpen
                      ? <i className="fa fa-angle-up" size="2x"></i>
                      : <i className="fa fa-angle-down" size="2x"></i>
                    }
                </div>
                {book_filterOpen && <ul className="print_type-list">
                <button className="filter_item" onClick={() => this.filterBookItem("")}>none{this.state.filterBook==="" && <i className="fa fa-check"></i>}</button>
                <button className="filter_item" onClick={() => this.filterBookItem('ebooks')}> all ebooks{this.state.filterBook==="ebooks" && <i className="fa fa-check"></i>}</button>
                <button className="filter_item" onClick={() => this.filterBookItem('free-ebooks')}>free ebooks{this.state.filterBook==="free-ebooks" && <i className="fa fa-check"></i>}</button>
                <button className="filter_item" onClick={() => this.filterBookItem('full')}>full ebook available{this.state.filterBook==="full" && <i className="fa fa-check"></i>}</button>
                <button className="filter_item" onClick={() => this.filterBookItem('paid-ebooks')}>Paid ebooks{this.state.filterBook==="paid-ebooks" && <i className="fa fa-check"></i>}</button>
                <button className="filter_item" onClick={() => this.filterBookItem('partial')}>partial ebook{this.state.filterBook==="partial" && <i className="fa fa-check"></i>}</button>
                </ul>}
              </div>
            </div>

        

        <div className="Library">
          <BookList state={this.state} />
        </div>
      </div>
    );
  }
}

export default App;
