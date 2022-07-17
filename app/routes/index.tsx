import { useLoaderData, useActionData, redirect } from "remix";
import { useState } from "react";
import type { LoaderFunction } from "remix";
import { db } from "~/utils/db.server";
import { getUser } from "~/utils/session.server";
import FormatTable from "../components/FormatTable";
const { AutocompleteBday } = require("../components/AutocompleteBday");

type Birthday = {
  id: number;
  name: string;
  date: string;
  stokelevel: number;
  daysUntil: number;
};

export let loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request);
  let data;
  if (user) {
    data = {
      bdays: await db.birthday.findMany({
        where: {
          userid: user.id,
        },
        take: 20,
        select: { id: true, name: true, date: true, stokelevel: true },
        orderBy: { date: "desc" },
      }),
    };
    if (!data) return null;
  }
  return { data, user };
};

export default function Home() {
  const { data, user } = useLoaderData();
  const [filteredData, setFilteredData] = useState<Birthday[]>(
    data ? data.bdays : ""
  );

  const manageBdays = (input: string) => {
    setFilteredData(
      data.bdays.filter((bday: Birthday) => {
        return bday.name.toLowerCase().startsWith(input.toLowerCase());
      })
    );
  };

  return (
    <>
      <div className={user ? "page-header between" : "page-header center"}>
        {user ? (
          <>
            <AutocompleteBday
              bdays={data.bdays}
              filteredData={filteredData}
              manageBdays={manageBdays}
            />
          </>
        ) : (
          ""
        )}
        {user ? (
            <a href="/add">
              <button className="btn">Add Birthday!</button>
            </a>
        ) : (
          <>
            <a href="/auth/login">
              <div className="my-2">
                <em>Login to Add Birthdays!</em>
              </div>
              <br />
              <button className="btn">Add Birthday!</button>
            </a>
          </>
        )}
      </div>
      {data ? <FormatTable newData={filteredData} /> : null}
    </>
  );
}
