import React from 'react';
import Loader from './Loader';
import { getPostWithComments, createComment } from './sources';

class PostPage extends React.Component {
  state = {
    details: [],
    isLoaded: false,
    value: '',
  };

  async componentDidMount() {
    const response = await getPostWithComments(this.props.match.params.postId);

    this.setState({
      details: response,
      isLoaded: true,
    });
  }

  handleChange = (event) => {
    this.setState({
      value: event.target.value,
    });
  };

  cleanCommentForm = () => {
    this.setState({
      value: '',
    });
  };

  handleCommentSubmit = async(event, postId, value) => {
    event.preventDefault();
    if (value !== '') {
      await createComment(value, postId);
      this.cleanCommentForm();
      const response = await getPostWithComments(postId);

      this.setState({
        details: response,
      });
    }
  };

  render() {
    const {
      title,
      body,
      creator,
      date,
      comments,
      id,
    } = this.state.details;
    const { isLoaded } = this.state;

    if (!isLoaded) {
      return <Loader />;
    }

    return (
      <>
        <li className="post-item">
          <p>
            <span>date: </span>
            <span>{date}</span>
            <br />
            <span>creator: </span>
            <span>{creator}</span>
            <br />
            <span>title: </span>
            <span>{title}</span>
            <br />
            <span>body: </span>
            <span>{body}</span>
          </p>
          <p>
            <b>Comments</b>
            (
            {comments.length}
            )
          </p>
          <p>
            <form
              onSubmit={
                event => this.handleCommentSubmit(event, id, this.state.value)
              }
            >
              <textarea
                onChange={this.handleChange}
                id="comment"
                name="Add-comment"
                rows="3"
                value={this.state.value}
                placeholder="write your comment here"
              />
              <button type="submit">add comment</button>
            </form>
          </p>
          {comments.map(comment => (
            <p>
              {comment.body}
            </p>
          ))}
        </li>
      </>
    );
  }
}

export default PostPage;
