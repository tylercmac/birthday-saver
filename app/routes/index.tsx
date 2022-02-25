import { useLoaderData } from "remix";
import type { LoaderFunction } from "remix";
import { useState, useEffect } from 'react'
import { db } from "~/utils/db.server";
import { getUser } from "~/utils/session.server";
import FormatTable from "../components/FormatTable"
import TextField from '@mui/material/TextField'

export let loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request);

  if (!user) return null;

  const data = {
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
  return data;
};

export const action = async ({ request }: { request: Request }) => {
  // Handle server response here when deleting
};




export default function Home() {
  const [bdays, setBdays] = useState([])
  const data = useLoaderData();
  
  const filterNames = (e: Event | null) => {
    setBdays(bdays.filter(bday => bday.name.startsWith(e.target.value)))
  }

  useEffect(() => {
    setBdays(data.bdays)
  }, [])

  return (
    <>
      <div className="page-header">
        <TextField id="standard-basic" label="Find name" variant="standard" onChange={e => filterNames(e)}/>
        <div className="page-text">Welcome to birthday saver!</div>
        <a href="/add">
          <button className="btn">Add Birthday!</button>
        </a>
      </div>
      {data ? <FormatTable bdays={bdays} /> : null}
    </>
  );
}
