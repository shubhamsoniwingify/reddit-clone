import React from 'react'
import { connect } from 'react-redux'

class Selector extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this) 
  }
  handleChange(event) {
    this.props.fetchPosts(event.target.value)
  }
  componentDidMount() {
    this.props.fetchPosts('cats')
  }
  render() {
    return (
      <form>
        <div className="form-group">
          <label for="subreddits">Select Subreddit:</label>
          <select id="subreddits" onChange={this.handleChange} className="form-control">
            <option value="cats">Cats</option>
            <option value="alternativeart">Alternative Art</option>
            <option value="pics">Pics</option>
            <option value="gifs">Gifs</option>
            <option value="adviceanimals">Advice Animals</option>
            <option value="images">Images</option>
            <option value="photoshopbattles">Photoshop Battles</option>
            <option value="hmmm">Hmmm</option>
            <option value="all">All</option>
            <option value="aww">Aww</option>
          </select>
        </div>
      </form>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentSubReddit: state.currentSubReddit
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchPosts: (currentSubReddit) => dispatch({ type: "API_CALL_REQUEST", currentSubReddit: currentSubReddit })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Selector);
