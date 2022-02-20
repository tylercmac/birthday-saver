import { db } from "~/utils/db.server";
import { redirect } from "remix";

export const action = async ({ request }) => {
  const form = await request.formData();
  const id = form.get("id");
  const method = form.get("_method")
  console.log({id});
  console.log({method});
  
  if (method === "delete") {
    const birthday = await db.birthday.findUnique({
      where: { id: id },
    });

    if (!birthday) throw new Error("birthday not found");

    await db.birthday.delete({ where: { id: id } });
  }

  return redirect("/");
};
