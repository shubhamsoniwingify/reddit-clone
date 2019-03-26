import React, { Component } from 'react';
import Post from './components/Post'
import Lightbox from 'react-image-lightbox';
import Selector from './components/Selector'
import Header from './components/Header'
import loader from './loader.gif'
import './App.css';
import 'react-image-lightbox/style.css';
import { connect } from 'react-redux'

class App extends Component {
  constructor(props) {
    super(props)
    this.hideModal = this.hideModal.bind(this)
  }
  componentDidMount() {
    this.props.fetchPosts('cats')
  }
  hideModal() {
    this.props.hideModal()
  }
  render() {
    const { fetching, posts, error, image, isModalVisible } = this.props;
    let postsList = []
    if (posts) {
      postsList = posts.filter((post) => 
        post.data.url !== ''
      ).map((post) => 
        <Post title={post.data.title} imageUrl={post.data.thumbnail} upvotesCount={post.data.score} commentsCount={post.data.num_comments} key={post.data.url} bigImageUrl={post.data.url} />
      )
      if (postsList.length === 0) {
        postsList.push(<Post errorMessage="None of the posts returned had images in them" key="1"/>)
      }
    } else {
      postsList.push(<Post errorMessage="Api did not return any posts for the selected subreddit" key="1" />)
    }
    return (
      <div className="App">
        <Header />
        {isModalVisible && (
          <Lightbox
            enableZoom={false}
            animationDisabled={true}
            imageLoadErrorMessage="Big Image Not Available"
            mainSrc={image}
            onCloseRequest={this.hideModal}
          />
        )}
        <div className="container">
          <div className="col-lg-6 col-lg-offset-3">
          <Selector />
            {error && <p style={{ color: "red" }}>Uh oh - something went wrong!</p>}
            {fetching ? (
              <div className="col-lg-12 loader">
                <img src={loader} alt="loader" />
              </div>
            ) : (
                <div>{postsList}</div>
            )}
          </div>
        </div>
        
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    fetching: state.fetching,
    posts: state.posts,
    image: state.image,
    isModalVisible: state.isModalVisible,
    currentSubReddit: state.currentSubReddit,
    error: state.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchPosts: (currentSubReddit) => dispatch({ type: "API_CALL_REQUEST", currentSubReddit: currentSubReddit }),
    hideModal: () => dispatch({ type: "UPDATE_MODAL", isModalVisible: false })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
