export default function NewBday() {

  return (
    <div className="page-content add-modal">
      <form method="POST" action="/api/add">
        <div className="bday-form">
          <div className="form-control">
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="name" />
          </div>
          <div className="form-control">
            <label htmlFor="date">Birthday</label>
            <input type="date" name="date" id="date" />
          </div>
          <div className="form-control">
            <label htmlFor="stokeLevel">How stoked are they about it?</label>
            <input type="text" name="stokeLevel" id="stokeLevel" />
          </div>
        <button type="submit" className="btn">
          Add Birthday
        </button>
        </div>
      </form>
    </div>
  );
}
