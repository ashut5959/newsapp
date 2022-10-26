// import React, { Component } from 'react'
import React , {useEffect, useState} from 'react'
import NewItems from './NewItems'
import propTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'

// export class News extends Component 


const News = (props) => {

  const [articles ,setArticles] = useState([]);
  const [loading , setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  // document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`;
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  


  

  const newUpdate =  async() => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pagesize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(20);
    let parseData = await data.json()
    props.setProgress(70);
    setArticles(parseData.articles);
    setTotalResults(parseData.totalResults);
    setLoading(false);
    props.setProgress(100);
  }

  useEffect(()=> {
    newUpdate();
  }, []);

  // const handleNextClick = async() => {

  //   setPage(page + 1)

  //   newUpdate()
  // }

  // const handlePreviousClick = async() => {

  //   setPage(page - 1)

  //   newUpdate()

  // }

  const fetchMoreData = async() => {

    setPage(page + 1);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=62960b0c16ce4e4ca0bbe8f5b115feec&page=${page}&pagesize=${props.pageSize}`;

    let data = await fetch(url);
    let parseData = await data.json()
    console.log(data);
    setArticles(articles.concat(parseData.articles))
    setTotalResults(parseData.totalResults)
      
  };


    return (
      <>
        <h2 className="text-center">NewsMonkey - Top {props.category}</h2>

        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<h4>Loading...</h4>}
        >
        <div className="container">

        
        <div className="row">
          {articles.map((element) => {
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
              disabled={state.page <= 1}
              type="button"
              className="btn btn-dark"
              onClick={handlePreviousClick}
            >
              {" "}
              &larr;Previous
            </button>
            <button
              disabled={
              page + 1 >
                Math.ceil(state.totalResults / props.pageSize)
              }
              type="button"
              className="btn btn-dark"
              onClick={handleNextClick}
            >
              Next&rarr;
            </button>
          </div> */}
        </>
      
    );
}

export default News

News.defaultProps = {
  country : 'in',
  pageSize: 9 ,
  category: 'general',
  totalResults: 0,

}

News.propTypes = {
  country: propTypes.string,
  pageSize: propTypes.number,
  category: propTypes.string
}