export const getPosts = async() => {
  const response = await fetch('https://simple-blog-api.crew.red/posts');
  const posts = await response.json();

  return posts;
};

export const getPostWithComments = async(id) => {
  const response = await fetch(
    `https://simple-blog-api.crew.red/posts/${id}?_embed=comments`
  );
  const post = await response.json();

  return post;
};

export const createComment = async(body, postId) => {
  const response = await fetch('https://simple-blog-api.crew.red/comments', {
    method: 'post',
    body: JSON.stringify({ postId, body }),
    headers: {
      'content-type': 'application/json',
    },
  });
  const post = await response.json();

  return post;
};

export const createPost = async(title, body, creator) => {
  const response = await fetch('https://simple-blog-api.crew.red/posts', {
    method: 'post',
    body: JSON.stringify({
      title,
      body,
      creator,
      date: new Date(),
    }),
    headers: {
      'content-type': 'application/json',
    },
  });
  const post = await response.json();

  return post;
};
