import axios from 'axios';
import PostList from './components/PostList';
import { Post } from './types';
import RootLayout from './layout';
import Header from './components/Header';

const fetchPosts = async (): Promise<Post[]> => {
  const response = await axios.get('https://dummyjson.com/posts');
  return response.data.posts;
};

const HomePage = async () => {
  const posts = await fetchPosts();

  return (
    <RootLayout>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Hello, world!</h1>
        <PostList posts={posts} />
      </div>
    </RootLayout>
  );
};

export default HomePage;
