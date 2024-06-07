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
    <RootLayout>
      <PostDetail post={post} />
    </RootLayout>
  );
};

// export async function generateStaticParams() {
//   const response = await axiosInstance.get('auth/posts');
//   const posts: Post[] = response.data.posts;

//   return posts.map((post: Post) => ({
//     id: post.id.toString(),
//   }));
// }

export default PostPage;
