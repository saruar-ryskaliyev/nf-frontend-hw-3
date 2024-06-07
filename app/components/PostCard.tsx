import { Post } from '../types';

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden mb-6">
      <div className="md:flex">
        <div className="md:flex-shrink-0">
        </div>
        <div className="p-6">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Some Author • 22 July</div>
          <a href={`/posts/${post.id}`} className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">{post.title}</a>
          <p className="mt-2 text-gray-600">{post.body}</p>
          <div className="mt-4">
            <span className="text-gray-500 text-sm">12 min read • Selected for you</span>
            <br />
            {post.tags && Array.isArray(post.tags) && post.tags.length > 0 && (
              <div className="mt-2">
                <span className="text-gray-500 text-sm">Tags: </span>
                {post.tags.map((tag, index) => (
                  <span key={index} className="inline-block bg-gray-200 rounded-full px-2 py-1 text-sm font-semibold text-gray-700 mr-2">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
