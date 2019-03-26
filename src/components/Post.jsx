import React from 'react'
import dummy from '../dummy.png'
import { connect } from 'react-redux'

class Post extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    let image = event.target.getAttribute('big-image')
    this.props.updateImage(image)
    this.props.displayModal()
  }

  render () {
    let errorMessage = this.props.errorMessage || 'No Data Available'
    if (this.props.errorMessage) {
      return (
        <div>
          {errorMessage}
        </div>
      )
    } else {
      return (
        <div className="media post">
          <div className="media-left">
          {/* eslint-disable-next-line */}
            <a href="#" onClick={this.handleChange}>
              <img className="media-object" src={this.props.imageUrl.startsWith('http') ? this.props.imageUrl : dummy} alt={this.props.title} big-image={this.props.bigImageUrl} />
            </a>
          </div>
          <div className="media-body">
            <h4 className="media-heading">{this.props.title}</h4>
            <div>{this.props.upvotesCount} Upvotes</div>
            <div>{this.props.commentsCount} Comments</div>
          </div>
        </div>
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    currentSubReddit: state.currentSubReddit
  };
};
const mapDispatchToProps = dispatch => {
  return {
    updateImage: (image) => dispatch({ type: "UPDATE_IMAGE", image: image }),
    displayModal: () => dispatch({ type: "UPDATE_MODAL", isModalVisible: true })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);