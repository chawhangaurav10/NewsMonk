import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 15,
    category: "general",
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
  response = {
    articles: [],
  };
  constructor(props) {
    super(props);
    this.state = {
      articles: this.response.articles,
      loading: true,
      page: 1,
      totalResults: 0,
    };
  }
  capitalize = (word) => {
    return word[0].toUpperCase() + word.slice(1).toLowerCase();
  };
  updateNews = async () => {
    this.props.setProgress(30)
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&pageSize=${this.props.pageSize}&page=${this.state.page}`;

    let data = await fetch(url);
    this.props.setProgress(50)
    let response = await data.json();
    this.props.setProgress(70)
    this.setState({
      articles: response.articles,
      totalResults: response.totalResults,
      loading: false,
    });
    document.title = `${this.capitalize(this.props.category)} - News Monk  `;
    this.props.setProgress(100)
  };
  componentDidMount() {
    this.updateNews();
  }

  fetchMoreData = async () => {
    this.setState({
      page: this.state.page + 1,
    });
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&pageSize=${this.props.pageSize}&page=${this.state.page+1}`;

    let data = await fetch(url);
    let response = await data.json();
    this.setState({
      articles: this.state.articles.concat(response.articles),
      totalResults: response.totalResults,
      loading: false,
    });
    document.title = `${this.capitalize(this.props.category)} - News Monk  `;
  };

  render() {
    return (
      <>
        <h3>Top Headlines..</h3>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          style={{ overflow: "inherit" }}
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container my-3 ">
            <div className="row">
              {this.state.articles.map((atricle) => {
                return (
                  <div className="col-md-4 my-3" key={atricle.url}>
                    <NewsItem
                      title={atricle.title}
                      description={atricle.description}
                      imageUrl={atricle.urlToImage}
                      newsUrl={atricle.url}
                      date={atricle.publishedAt}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
      </>
    );
  }
}

export default News;
