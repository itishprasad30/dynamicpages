import fs from "fs";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote";
import path from "path";
import { serialize } from "next-mdx-remote/serialize";
import styles from "../../styles/Post.module.css";
import Link from "next/link";


const Post = ({ frontMatter, slug, mdxSource }) => {
  
  return (
    <div title={frontMatter.title}>
      <div className={styles.post}>
        <Link href="/">
          <a className="font-bold text-3xl text-red-500 "> Back</a>
        </Link>
        <div className="  aspect-video  rounded-lg overflow-hidden ">
          <img className="bg-cover" src={frontMatter.image} alt="image" />
        </div>
        <h1 className="font-bold my-8 text-5xl ">{frontMatter.title}</h1>

        <main>
          <article className="prose dark:prose-xl">
            <MDXRemote {...mdxSource} className="prose dark:prose-xl" />
          </article>
        </main>
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
