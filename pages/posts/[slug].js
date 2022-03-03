import fs from "fs";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote";
import path from "path";
import { serialize } from "next-mdx-remote/serialize";
import styles from "../../styles/Post.module.css";

const Post = ({ frontMatter, slug, mdxSource }) => {
  return (
    <div title={frontMatter.title}>
      <div className={styles.post}>
        <h1 className="font-semibold my-8 text-3xl text-blue-700">
          {frontMatter.title}
        </h1>
        <img src={frontMatter.image} alt="image" />
        <MDXRemote {...mdxSource} />
      </div>
    </div>
  );
};

export default Post;

export async function getStaticPaths() {
  // Read the files inside the pages/posts dir
  const files = fs.readdirSync(path.join("pages/posts"));

  // Generate path for each file
  const paths = files.map((file) => {
    return {
      params: {
        slug: file.replace(".mdx", ""),
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
}
export async function getStaticProps({ params: { slug } }) {
  // read each file
  const markdown = fs.readFileSync(
    path.join("pages/posts", slug + ".mdx"),
    "utf-8"
  );

  // Extract front matter
  const { data: frontMatter, content } = matter(markdown);

  const mdxSource = await serialize(content);

  return {
    props: {
      frontMatter,
      slug,
      mdxSource,
    },
  };
}
