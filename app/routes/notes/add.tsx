import { redirect } from "remix";
import { db } from "~/utils/db.server";
import { getUser } from "~/utils/session.server";

export const action = async ({ request }: { request: any }) => {
  const form = await request.formData();
  const user = await getUser(request);
  const note: string = form.get("note");
  const bdayId = form.get("bdayId");
  console.log({ note, bdayId });
  

  if (user) {
    const bday = await db.birthday.update({
      where: {
        id: bdayId,
      },
      data: { 
        notes: note 
      },
    });
    if (!bday) {
      throw new Error("Unable to update birthday");
    } else {
      return redirect('/')
    }
  } else redirect("/auth/login");
};


