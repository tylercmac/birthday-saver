import { db } from "~/utils/db.server";
import { redirect } from "remix";

export const action = async ({ request } : { request: any }) => {
  const form = await request.formData();
  let ids = form.get("ids");
  ids = ids.split(",")
  
  const method = form.get("_method")
  
  if (method === "delete") {
    ids.forEach(async (id: string) =>  {

      const birthday = await db.birthday.findUnique({
      where: { id: id },
      })

      if (!birthday) throw new Error("birthday not found");

      await db.birthday.delete({ where: { id: id } });
    })
  }   

  return redirect("/");
};
