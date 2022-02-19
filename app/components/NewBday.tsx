import { redirect } from 'remix'

export const action = async ({ request }) => {
  const form = await request.formData()
  const bday = {
    name: form.get('name'),
    date: form.get('date'),
    stokeLevel: form.get('stokeLevel'),
  }

  // submit to database
  console.log(bday, 'close modal')
  
}




export default function NewBday() {
  
  const handleAddBday = () => {
    console.log("submitted bday")
    // setIsOpen(false)
  }

  return (
    <div className="page-content add-modal">
      <form method="POST">
        <div className="form-control">
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name"/>
        </div>
        <div className="form-control">
          <label htmlFor="date">Birthday</label>
          <input type="date" name="date" id="date"/>
        </div>
        <div className="form-control">
          <label htmlFor="stokeLevel">How stoked are they about it?</label>
          <input type="text" name="stokeLevel" id="stokeLevel"/>
        </div>
        <button type="submit" className="btn btn-block">
          Add Birthday
        </button>
      </form>
    </div>
  )
}
