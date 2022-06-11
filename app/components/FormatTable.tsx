import { MouseEvent, useState, ChangeEvent } from "react";
import { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import TablePagination from "@mui/material/TablePagination";
import moment from "moment";
import { db } from "~/utils/db.server";
import { getUser } from "~/utils/session.server";
import type { LoaderFunction } from "remix";
import { useLoaderData } from "remix";

type Birthday = {
  id: number;
  name: string;
  date: string;
  stokeLevel: number;
  daysUntil: number;
};

export default function FormatTable({newData}: {newData: Birthday[]}) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { data } = useLoaderData();

  const tableStyles = () => {
    return {
      minWidth: 650,
      fontFamily: "Poppins, sans-serif",
    };
  };

  const handleChangePage = (
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent> | null,
    page: number
  ) => {
    setPage(page);
  };

  const handleChangeRowsPerPage = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

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

  const addTableProps = () => {
    return (newData?newData:data.bdays).map((bday: Birthday) => {
      bday.daysUntil = calcDaysFromToday(bday.date);
      bday.date = moment(bday.date).format("M/D/YY")
      return bday})
  }

  const sortByClosest = addTableProps().sort(
    (a: Birthday, b: Birthday) => a.daysUntil - b.daysUntil
  );

  const bdayArr = sortByClosest;

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={tableStyles()} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Name</TableCell>
              <TableCell align="right">Bday</TableCell>
              <TableCell align="right">Days Until</TableCell>
              <TableCell align="right">Stoke</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bdayArr.map((row: any) => (
              <TableRow key={row.id} sx={styleRow(row.daysUntil)}>
                <TableCell className="form">
                  <form method="POST" action="/remove">
                    <input type="hidden" name="_method" value="delete" />
                    <input type="hidden" name="ids" value={row.id} />
                    <button className="btn btn-delete">
                      <i className="fa fa-trash" aria-hidden="true"></i>
                    </button>
                  </form>
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.date}</TableCell>
                <TableCell align="right">{row.daysUntil}</TableCell>
                <TableCell align="right">{row.stokeLevel}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10]}
        component="div"
        count={data.bdays.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={(event) => handleChangeRowsPerPage(event)}
      />
    </>
  );
}
