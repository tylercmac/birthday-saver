import { useLoaderData } from "remix";
import type { LoaderFunction } from "remix";
import { useState } from "react";
import bdays from "../../public/bdays.json";
import NewBday from "../components/NewBday";

export let loader: LoaderFunction = async () => {
  return bdays;
};

type Birthday = {
  id: number;
  name: string;
  date: string;
  stokeLevel: number;
};

export default function Home() {
  const data = useLoaderData();
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    console.log("opening modal");
    setIsOpen(!isOpen ? true : false)
  };

  return (
    <>
      <div className="page-header">
        Welcome to birthday saver!
        <button className="btn" onClick={() => handleOpenModal()}>
          Add Bday
        </button>
      </div>
      <ul className="posts-list">
        {data.map((bday: Birthday) => (
          <li key={bday.id}>
            {bday.name}, {bday.date}, {bday.stokeLevel}
          </li>
        ))}
      </ul>

      {isOpen ? <NewBday /> : null}
    </>
  );
}
