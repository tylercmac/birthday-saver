
import { db } from '~/utils/db.server'
import { redirect } from 'remix'
import Document from '../root'
import Layout from '../root'

export const action = async ({ request }) => {
  const form = await request.formData();
  let stokeLevel = form.get('stokeLevel');
  stokeLevel = parseInt(stokeLevel)
  
  const bdayObj = {
    name: form.get("name"),
    date: form.get("date"),
    stokeLevel: stokeLevel,
  };

  const bday = await db.birthday.create({data: bdayObj})
  if (!bday) {
    throw new Error('Unable to create birthday')
  }
  
  return redirect('/')
};

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
