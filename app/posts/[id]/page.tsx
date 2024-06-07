import axiosInstance from '../../axiosInstance';
import PostDetail from '../../components/PostDetail';
import { Post } from '../../types';
import RootLayout from '../../layout';

const fetchPost = async (id: string): Promise<Post> => {
  const response = await axiosInstance.get(`/posts/${id}`);
  return response.data;
};

interface Params {
  params: { id: string };
}

const PostPage = async ({ params }: Params) => {
  const { id } = params;
  const post = await fetchPost(id);

  return (
    <PostDetail post={post} />
  );
};


export default PostPage;
