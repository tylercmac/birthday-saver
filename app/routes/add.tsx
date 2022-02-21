
import { db } from '~/utils/db.server'
import { json, redirect, useActionData, Link } from 'remix'

const validateName = (name: string) => {
  if (typeof name !== 'string' || name.length > 255) {
    return 'Name should be fewer than 255 characters'
  } else if (!name) return 'A name is required'
}

const validateDate = (date: string) => {
  if (!date) {
    return 'A date is required'
  }
}

const validateStokeLevel = (stokeLevel: number) => {
  if (typeof stokeLevel !== 'number' || stokeLevel > 5 || stokeLevel < 0) {
    return 'Stoke level should be a number between 0 and 5'
  }
}

export const action = async ({ request } : {request : any}) => {
  const form = await request.formData();
  const name = form.get('name')
  const date = form.get('date')
  let stokeLevel = form.get('stokeLevel');
  stokeLevel = parseInt(stokeLevel)
  
  const fields = { name, date, stokeLevel,};

  const fieldErrors = {
    name: validateName(name),
    date: validateDate(date),
    stokeLevel: validateStokeLevel(stokeLevel)
  }

  if (Object.values(fieldErrors).some(Boolean)) {
    console.log(fieldErrors)
    return json({fieldErrors, fields}, { status: 400 })
  }

  const bday = await db.birthday.create({data: fields})
  if (!bday) {
    throw new Error('Unable to create birthday')
  }
  
  return redirect('/')
};

export default function Add() {
  const actionData = useActionData();

  return (
    <div className="page-content add-modal">
      <form method="POST">
        <div className="bday-form">
          <div className="form-control">
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="name" />
            <div className="error">
              <p>
                {actionData?.fieldErrors?.name && actionData?.fieldErrors?.name}
              </p>
            </div>
          </div>
          <div className="form-control">
            <label htmlFor="date">Birthday</label>
            <input type="date" name="date" id="date" />
            <div className="error">
              <p>
                {actionData?.fieldErrors?.date && actionData?.fieldErrors?.date}
              </p>
            </div>
          </div>
          <div className="form-control">
            <label htmlFor="stokeLevel">0 - 5, How stoked are they about it?</label>
            <input type="text" name="stokeLevel" id="stokeLevel" />
            <div className="error">
              <p>
                {actionData?.fieldErrors?.stokeLevel && actionData?.fieldErrors?.stokeLevel}
              </p>
            </div>
          </div>
          <button type="submit" className="btn">
            Add Birthday
          </button>
          <a href="/">
            <button type="button" className="btn btn-reverse">
              Back to Home
            </button>
          </a>
        </div>
      </form>
    </div>
  );
}


// export const ErrorBoundary = ({ error }) => {
//   console.log(error);
//   return (
//     <Document>
//       <Layout>
//         <h1 className="error-header">Error!</h1>
//         <p>{error.message}</p>
//       </Layout>
//     </Document>
//   );
// };
