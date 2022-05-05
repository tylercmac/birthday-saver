import { useLoaderData } from "remix";
import type { LoaderFunction } from "remix";
import { useState, useEffect } from 'react'
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
      {data ? <FormatTable bdays={data} /> : null}
    </>
  );
}
