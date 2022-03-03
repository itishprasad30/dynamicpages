import React from "react";
import useSWR from "swr";
import Person from "../component/Person";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import PostCard from "../component/PostCard";
import Link from "next/link";
import style from "../styles/Post.module.css";

const fetcher = (url) => fetch(url).then((res) => res.json());

function Home({ posts }) {
  const { data, error } = useSWR("/api/people", fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;
  console.log(posts);

  return (
    <div className=" mx-auto flex flex-col justify-center items-center ">
      {data.map((val) => (
        <Person key={val.id} value={val} />
      ))}

      <div className="container w-[80%] md:w-[60%] mx-auto">
        <h1 className="text-blue-700 text-3xl font-bold my-12">Blog Test📙</h1>
        <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 ">
          {posts.map((post) => (
            <Link href={`/posts/${post.slug}`} key={post.slug}>
              <a>
                <PostCard post={post} />
              </a>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
export async function getStaticProps() {
  // Read the posts dir
  let files = fs.readdirSync(path.join("pages/posts"));
  // get only mdx files

  files = files.filter((file) => file.split(".")[1] === "mdx");

  // read each file and extract font matter
  const posts = await Promise.all(
    files.map((file) => {
      const mdWithData = fs.readFileSync(
        path.join("pages/posts", file),
        "utf-8"
      );

      const { data: frontMatter } = matter(mdWithData);

      return {
        frontMatter,
        slug: file.split(".")[0],
      };
    })
  );
  return {
    props: {
      posts,
    },
  };
}

// export async function getStaticProps() {
//   // Read the pages/posts dir
//   let files = fs.readdirSync(path.join("pages/posts"));

//   // Get only the mdx files
//   files = files.filter((file) => file.split(".")[1] === "mdx");

//   // Read each file and extract front matter
//   const posts = await Promise.all(
//     files.map((file) => {
//       const mdWithData = fs.readFileSync(
//         path.join("pages/posts", file),
//         "utf-8"
//       );

//       const { data: frontMatter } = matter(mdWithData);

//       return {
//         frontMatter,
//         slug: file.split(".")[0],
//       };
//     })
//   );

//   // Return all the posts frontMatter and slug as props
//   return {
//     props: {
//       posts,
//     },
//   };
// }

//1 first way to fech the data using Fetch ()

// const fetchData = () => {
//   return fetch("/api/people")
//     .then((response) => response.json())
//     .then((data) => console.log(data));
// };
