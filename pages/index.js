import React from "react";
import useSWR from "swr";
import Person from "../component/Person";

const fetcher = (url) => fetch(url).then((res) => res.json());

function Home() {
  const { data, error } = useSWR("/api/people", fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div className=" mx-auto flex flex-col justify-center items-center ">
      {data.map((val) => (
        <Person key={val.id} value={val} />
      ))}
    </div>
  );
}

export default Home;

//1 first way to fech the data using Fetch ()

// const fetchData = () => {
//   return fetch("/api/people")
//     .then((response) => response.json())
//     .then((data) => console.log(data));
// };
