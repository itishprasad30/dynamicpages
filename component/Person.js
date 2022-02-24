import Link from "next/link";
import React from "react";

const Person = ({ value }) => {
  return (
    <li>
      <Link href={`/person/${value.id}`} as={`/person/${value.id}`}>
        <a>{value.name}</a>
      </Link>
    </li>
  );
};

export default Person;
