import { useLoaderData, redirect, useActionData, Link } from "remix";
import type { LoaderFunction } from "remix";
import { db } from "~/utils/db.server";
import { getUser } from "~/utils/session.server";
import FormatTable from "../components/FormatTable";

export let loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request);
  let data;
  if (user) {
    data = {
      bdays: await db.birthday.findMany({
        where: {
          userId: user.id,
        },
        take: 20,
        select: { id: true, name: true, date: true, stokeLevel: true },
        orderBy: { date: "desc" },
      }),
    };
    if (!data) return null;
  }
  return { data, user };
};

export const action = async ({ request }: { request: Request }) => {
  // Handle server response here when deleting
};

export default function Home() {
  const { data, user } = useLoaderData();
  return (
    <>
      <div className="page-header">
        Welcome to birthday saver
        {user ? (
          <a href="/add">
            <button className="btn">Add Birthday!</button>
          </a>
        ) : (
          <>
          <a href="/auth/login">
          <em>Login to Add Birthdays!</em><br/>
            <button className="btn">Add Birthday!</button>
          </a>
          </>
        )}
      </div>
      {/* <ul className="posts-list">
        {data
          ? data.bdays.map((bday: Birthday) => (
              <li key={bday.id}>
                {bday.name}, {bday.date}, {bday.stokeLevel}
                <form method="POST" action="/remove">
                  <input type="hidden" name="_method" value="delete" />
                  <input type="hidden" name="id" value={bday.id} />
                  <button className="btn btn-delete">Remove</button>
                </form>
              </li>
            ))
          : null}
      </ul> */}
      {data ? <FormatTable bdays={data.bdays} /> : null}
    </>
  );
}
