const PostCard = ({ post }) => {
  return (
    <div className="max-w-md   bg-white rounded-lg overflow-hidden shadow-lg">
      <img className="aspect-square" src={post.frontMatter.image} alt="ia" />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{post.frontMatter.title}</div>
      </div>
    </div>
  );
};

export default PostCard;
