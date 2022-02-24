import Link from "next/link";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <div className="bg-gray-300 min-h-screen">
      <nav className=" bg-gradient-to-r flex   items-center  from-purple-900 text-white  p-3 rounded-none ">
        <Link href={`/`}>&lt; Home </Link>
      </nav>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
