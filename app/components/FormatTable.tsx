import { MouseEvent, useState, ChangeEvent } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';
import TablePagination from "@mui/material/TablePagination";
import moment from "moment";

type Birthday = {
  id: number;
  name: string;
  date: string;
  stokeLevel: number;
  daysUntil: number;
};

export default function FormatTable({ bdays }: { bdays: Birthday[] }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selected, setSelected] = useState([])

  const tableStyles = () => {
    return (
      {
        minWidth: 650,
        fontFamily: "Poppins, sans-serif",
      })

  }

  const handleChangePage = (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent> | null, page: number) => {
    setPage(page);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const isSelected = (id: number) => {
    selected.findIndex((index) => index === id && index !== -1)
  }

  const handleClick = (e: Event, id: string) => {
    const selectedIndex: number = selected.findIndex(index => index === id)
    let newSelected: React.SetStateAction<never[]> = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);

  }

  const handleDelete = () => {
    if(confirm('Are you sure you want to delete this?')) {
      setTimeout(() => method = 'delete', 1000)
    } else setTimeout(() => method = 'notdelete', 1000)
  }


  const styleRow = (daysUntil: number) => {
    // if (daysUntil === 0) return { backgroundImage: `url("partyimg.jpg"`};
    if (daysUntil === 0) return { background: "#00BFFF" };
    else if (daysUntil === 1) return { background: "#B22222" };
    else if (daysUntil <= 5) return { background: "#E9967A" };
    else if (daysUntil <= 10) return { background: "#F0E68C" };
    else if (daysUntil <= 30) return { background: "#FAFAD2" };
    else return {};
  };

  const calcDaysFromToday = (date: string) => {
    const today = moment().format("YYYY-MM-DD");
    const years = moment().diff(date, "years");
    const adjustToday = date.substring(5) === today.substring(5) ? 0 : 1;
    const nextBirthday = moment(date).add(years + adjustToday, "years");
    const daysUntilBirthday = nextBirthday.diff(today, "days");
    return daysUntilBirthday;
  };

  const addTableProps = bdays.map((bday: Birthday) => {
    bday.daysUntil = calcDaysFromToday(bday.date);
    bday.date = moment(bday.date).format("M/D/YY");
    return bday;
  });

  const sortByClosest = addTableProps.sort(
    (a: Birthday, b: Birthday) => a.daysUntil - b.daysUntil
  );

  bdays = sortByClosest;
  let method

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={tableStyles()} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                {selected.length ?
                  <form method="POST" action="/remove">
                    <input type="hidden" name="_method" value={method} />
                    <input type="hidden" name="ids" value={selected} />
                    <button className="btn btn-delete" onClick={() => handleDelete()}><DeleteIcon /></button>
                  </form>
                  : <div className="padding" />}
              </TableCell>
              <TableCell>Name</TableCell>
              <TableCell align="right">Bday</TableCell>
              <TableCell align="right">Days Until</TableCell>
              <TableCell align="right">Stoke</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bdays.map((row) => {
              const isItemSelected: void = isSelected(row.id)

              return (
                <TableRow
                  key={row.id}
                  sx={styleRow(row.daysUntil)}
                  onClick={(e) => handleClick(e, row.id)}
                  role="checkbox"
                  selected={isItemSelected}
                  aria-checked={isItemSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isItemSelected}
                      inputProps={{
                        // 'aria-labelledby': labelId,
                      }}
                    />
                  </TableCell>
                  <TableCell
                    sx={{ fontFamily: 'Poppins' }}
                    component="th"
                    scope="row"
                  >
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.date}</TableCell>
                  <TableCell align="right">{row.daysUntil}</TableCell>
                  <TableCell align="right">{row.stokeLevel}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10]}
        component="div"
        count={bdays.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={(event) => handleChangeRowsPerPage(event)}
      />
    </>
  );
}
