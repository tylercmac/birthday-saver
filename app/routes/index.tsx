import { useLoaderData, useActionData, Link  } from "remix";
import type { LoaderFunction } from "remix";
import { db } from "~/utils/db.server";

export const links = () => {

}

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

export default function Home() {
  const { bdays } = useLoaderData();

  return (
    <>
      <div className="page-header">
        Welcome to birthday saver!
        <Link to="/add">
          <button className="btn">Add Birthday!</button>
        </Link>
      </div>
      <ul className="posts-list">
        {bdays.map((bday: Birthday) => (
          <li key={bday.id}>
            {bday.name}, {bday.date}, {bday.stokeLevel}
            <form method="POST" action="/remove">
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
