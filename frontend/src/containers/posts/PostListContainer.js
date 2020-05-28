import React, { useEffect } from 'react';
import qs from 'qs';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PostList from '../../components/post/PostList';
import { listPosts } from '../../modules/posts';

const PostListContainer = ({ location, match }) => {
  const dispatch = useDispatch();
  const { posts, error, loading, user } = useSelector(
    ({ posts, loading, user }) => ({
      posts: posts.posts,
      error: posts.error,
      loading: loading['post/LIST_POST'],
      user: user.user,
    }),
  );
  useEffect(() => {
    const { username } = match.params;//:username같은 parameter
    //?tag=tag1 같은 query
    const { tag, page } = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });
    dispatch(listPosts({tag, username, page}));
  }, [dispatch, location.search,match.params]);
  return <PostList posts={posts} loading={loading} error={error} showWriteButton={user}/>;
};
export default withRouter(PostListContainer);
