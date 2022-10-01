import { db } from "~/utils/db.server";
import { json } from "@remix-run/node";
import { ActionFunction, redirect } from "remix";

export const action: ActionFunction = async ({ params }) => {
  const bdayId = params.bdayId
  const birthday = await db.birthday.findUnique({
  where: { id: bdayId },
  })

  if (!birthday) throw new Error("birthday not found");
  else {
    await db.birthday.delete({ where: { id: bdayId } });
    return redirect('/')
  }
};