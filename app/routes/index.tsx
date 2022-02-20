import { useLoaderData } from "remix";
import type { LoaderFunction } from "remix";
import { useState } from "react";
import { db } from "~/utils/db.server";
import NewBday from "../components/NewBday";

export let loader: LoaderFunction = async () => {
  const data = {
    bdays: await db.birthday.findMany({
      take: 20,
      select: { id: true, name: true, date: true, stokeLevel: true },
      orderBy: { date: "desc" },
    }),
  };

  return data;
};

type Birthday = {
  id: number;
  name: string;
  date: string;
  stokeLevel: number;
};

const handleDelete = async (id: number) => {
  console.log({ db });

  const deleteBday = await db.birthday.delete({
    where: {
      id: id,
    },
  });

  console.log({ deleteBday });

  if (!deleteBday) {
    throw new Error("There was a problem deleting this birthday");
  }

  alert("birthday deleted!");
};

export default function Home() {
  const { bdays } = useLoaderData();

  const [isOpen, setIsOpen] = useState(false);

  function handleOpenModal() {
    setIsOpen(!isOpen ? true : false);
  }

  return (
    <>
      <div className="page-header">
        Welcome to birthday saver!
        <button className="btn" onClick={handleOpenModal}>
          {isOpen ? "Close Form" : "Add Bday"}
        </button>
      </div>
      {isOpen ? <NewBday /> : null}
      <ul className="posts-list">
        {bdays.map((bday: Birthday) => (
          <li key={bday.id}>
            {bday.name}, {bday.date}, {bday.stokeLevel}
            <form method="POST" action="/api/remove/">
              <input type="hidden" name="_method" value="delete" />
              <input type="hidden" name="id" value={bday.id} />
              <button className="btn btn-delete">Remove</button>
            </form>
          </li>
        ))}
      </ul>
    </>
  );
}
