import { db } from "~/utils/db.server";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { redirect } from "remix";

export const loader: LoaderFunction = async ({ params }) => {
  const bdayId = params.bdayId
  const birthday = await db.birthday.findUnique({
  where: { id: bdayId },
  })

  if (!birthday) throw new Error("birthday not found");

  await db.birthday.delete({ where: { id: bdayId } });
  return json({ body: birthday, message: "Delete successful"});
};