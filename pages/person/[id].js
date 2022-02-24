import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";

const fetcher = async (url) => {
  const res = await fetch(url);

  const data = await res.json();
  if (res.status !== 200) {
    throw new Error(data.message);
  }
  return data;
};

const Personid = () => {
  const { query } = useRouter();
  const { data, error } = useSWR(
    () => query.id && `/api/people/${query.id}`,
    fetcher
  );
  if (error) return <div>not found</div>;
  if (!data) return <div>Loding...</div>;

  // getting the date hours to adjusting the greetings
  let [first, last, opt] = data.name.split(" ");
  const hour = new Date().getHours(); // this is 24 hr formart
  const welcomeTypes = [
    "Good morning",
    "Good afternoon",
    "Good evening",
    "Good night",
  ];
  let welcomeText = "";
  if (hour == 0 || hour < 5) welcomeText = welcomeTypes[3];
  else if (hour < 12) welcomeText = welcomeTypes[0];
  else if (hour < 18) welcomeText = welcomeTypes[1];
  else welcomeText = welcomeTypes[2];

  console.log(data);
  return (
    <div className="bg-gray-400 mx-auto   h-screen space-x-3 flex flex-col  items-center mb-32">
      {/* Nice little Greetings For the User to come in */}
      <div className="p-2 w-full md:max-w-3xl ">
        {welcomeText === "Good morning " || "Good afternoon" ? (
          <div className="overflow-hidden bg-gradient-to-l from-blue-600 via-white to-white rounded-lg shadow">
            <div className="px-4 py-5  sm:p-6  flex justify-between items-center">
              <h1 className="text-4xl font-bold">
                {welcomeText}, {first}.
              </h1>
              <span className="text-yellow-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </span>
            </div>
          </div>
        ) : (
          <div className="overflow-hidden bg-gradient-to-l from-gray-900 via-white to-white rounded-lg shadow">
            <div className="px-4 py-5  sm:p-6 flex justify-between items-center">
              <h1 className="text-4xl font-bold">
                {welcomeText}, {first}.
              </h1>
              <span className="text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                </svg>
              </span>
            </div>
          </div>
        )}
      </div>
      Personid is : {query.id}
      <div className="mt-32 rounded-md p-3">
        <table className="border-2 border-red-900 max-w-4xl rounded-md shadow-md">
          <thead>
            <tr className="font-semibold  bg-red-50 ">
              <th>Name</th>
              <th>Height</th>
              <th>Mass</th>
              <th>Hair color</th>
              <th>Skin color</th>
              <th>Eye color</th>
              <th>Gender</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-green-200 font-serif text-xl border-2 border-gray-700">
              <td>{data.name}</td>
              <td>{data.height}</td>
              <td>{data.mass}</td>
              <td>{data.hair_color}</td>
              <td>{data.skin_color}</td>
              <td>{data.eye_color}</td>
              <td>{data.gender}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Personid;

// for day
