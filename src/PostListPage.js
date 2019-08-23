import React from 'react';
import { Link } from 'react-router-dom';
import { getPosts, createPost } from './sources';
import Loader from './Loader';

class PostListPage extends React.Component {
  state = {
    posts: [],
    isLoaded: false,
    postFormVisible: false,
    formValue: {
      title: '',
      body: '',
      creator: '',
    },
  };

  async componentDidMount() {
    const responsePosts = await getPosts();

    this.setState({
      posts: responsePosts,
      isLoaded: true,
    });
  }

  handleShowAddPost = () => {
    this.setState(prevState => ({
      postFormVisible: !prevState.postFormVisible,
    }));
  };

  cleanPostForm = () => {
    this.setState({
      formValue: {
        title: '',
        body: '',
        creator: '',
      },
    });
  };

  handleChange = (event, field) => {
    const inputText = event.target.value;

    this.setState(prevState => ({
      formValue: { ...prevState.formValue, [field]: inputText },
    }));
  };

  handlePostSubmit = async(event, title, body, creator) => {
    event.preventDefault();
    if (title !== '' && body !== '' && creator !== '') {
      await createPost(title, body, creator);
      this.cleanPostForm();
      const response = await getPosts();

      this.setState({
        posts: response,
      });
    }
  };

  render() {
    const { match } = this.props;
    const { posts, isLoaded, postFormVisible } = this.state;
    const { title, body, creator } = this.state.formValue;

    if (!isLoaded) {
      return <Loader />;
    }

    return (
      <>

          <div className="submit-container">
            <button
              className="show-form-button"
              onClick={this.handleShowAddPost}
              type="button"
            >
              {postFormVisible ? 'Hide form' : 'Show form'}
            </button>
            {postFormVisible && (
              <form
                onSubmit={
                  event => this.handlePostSubmit(event, title, body, creator)
                }
              >
                <input
                  onChange={event => this.handleChange(event, 'creator')}
                  value={this.state.formValue.creator}
                  name="creator"
                  className="add-post-input add-name"
                  placeholder="Enter your name"
                  type="text"
                />
                <input
                  onChange={event => this.handleChange(event, 'title')}
                  value={this.state.formValue.title}
                  name="title"
                  className="add-post-input"
                  placeholder="Title"
                  type="text"
                />
                <input
                  onChange={event => this.handleChange(event, 'body')}
                  value={this.state.formValue.body}
                  name="body"
                  className="add-post-input"
                  placeholder="Write your post here"
                  type="text"
                />
                <button className="add-post-submit" type="submit">
                  Submit
                </button>
              </form>
            )}
          </div>
          <ul className="post-container">
          {posts.map(post => (
            <Link to={`${match.path}/${post.id}`} className="link">
              <li className="post-item">
                <p>
                  <span className="topic">{post.date.slice(0, 10)}</span>
                </p>
                <p>
                  <span>creator: </span>
                  <span>{post.creator}</span>
                  <br />
                  <span>Title: </span>
                  <span>{post.title}</span>
                </p>
              </li>
            </Link>
          ))}
        </ul>
      </>
    );
  }
}

export default PostListPage;
