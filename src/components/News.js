import React, { Component } from 'react'
import NewItems from './NewItems'
import propTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'

export class News extends Component {

  static defaultProps = {
    country : 'in',
    pageSize: 9 ,
    category: 'general',
    totalResults: 0,
  
  }

  static propTypes = {
    country: propTypes.string,
    pageSize: propTypes.number,
    category: propTypes.string
  }

  constructor() { 
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1
    }
  }


  

  async newUpdate() {
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pagesize=${this.props.pageSize}`;

    let data = await fetch(url);
    this.props.setProgress(20);
    let parseData = await data.json()
    this.props.setProgress(70);
    
    this.setState({articles : parseData.articles , totalResults: parseData.totalResults})

    this.props.setProgress(100);
  }

  async componentDidMount() {
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=62960b0c16ce4e4ca0bbe8f5b115feec&page=1&pagesize=${this.props.pageSize}`;
    // console.log(url);
    // let data = await fetch(url);
    // let parseData = await data.json()
    // console.log(data);
    // this.setState({articles : parseData.articles , totalResults: parseData.totalResults})

    this.newUpdate();
    
  }

  handleNextClick = async() => {
    // if(this.state.page + 1 >  Math.ceil(this.state.totalResults/20)) {

    // }
    // else 
    // {
    //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=62960b0c16ce4e4ca0bbe8f5b115feec&page=${this.state.page + 1}&pagesize=${this.props.pageSize}`;

    // let data = await fetch(url);
    // let parseData = await data.json()
    // this.setState({
    //   page: this.state.page + 1,
    //   articles : parseData.articles
    // })
    // }

    this.setState({
      page: this.state.page + 1
    })  
    this.newUpdate()
  }

   handlePreviousClick =async () => {
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=62960b0c16ce4e4ca0bbe8f5b115feec&page=${this.state.page - 1}&pagesize=${this.props.pageSize}`;

    // let data = await fetch(url);
    // let parseData = await data.json()
    // this.setState({
    //   page: this.state.page - 1,
    //   articles : parseData.articles
    // })

    this.setState({
      page: this.state.page - 1
    })  
    this.newUpdate()

  }

  fetchMoreData = async() => {

    this.setState({page: this.state.page + 1})
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=62960b0c16ce4e4ca0bbe8f5b115feec&page=${this.state.page}&pagesize=${this.props.pageSize}`;

    let data = await fetch(url);
    let parseData = await data.json()
    console.log(data);
    this.setState({articles : this.state.articles.concat(parseData.articles) , totalResults: parseData.totalResults})
      
  };

  render() {
    return (
      <>
        <h2 className="text-center">NewsMonkey - Top {this.props.category}</h2>

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<h4>Loading...</h4>}
        >
        <div className="container">

        
        <div className="row">
          {this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewItems
                  title={element.title}
                  description={element.description}
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                  source={element.source.name}
                />
              </div>
            );
          })}
          </div>
          </div>
          </InfiniteScroll>

          {/* <div className="container d-flex justify-content-between">
            <button
              disabled={this.state.page <= 1}
              type="button"
              className="btn btn-dark"
              onClick={this.handlePreviousClick}
            >
              {" "}
              &larr;Previous
            </button>
            <button
              disabled={
                this.state.page + 1 >
                Math.ceil(this.state.totalResults / this.props.pageSize)
              }
              type="button"
              className="btn btn-dark"
              onClick={this.handleNextClick}
            >
              Next&rarr;
            </button>
          </div> */}
        </>
      
    );
  }
}

export default News