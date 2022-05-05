import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import moment from "moment";

type Birthday = {
  id: number;
  name: string;
  date: string;
  stokeLevel: number;
  daysUntil: number;
};

export default function FormatTable({ bdays }: { bdays: [Birthday] }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
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

  const addTableProps = bdays.map((bday: Birthday) => {
    bday.daysUntil = calcDaysFromToday(bday.date);
    bday.date = moment(bday.date).format("M/D/YY");
    return bday;
  });

  const sortByClosest = addTableProps.sort(
    (a: Birthday, b: Birthday) => a.daysUntil - b.daysUntil
  );

  const bdayArr = sortByClosest;

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Bday</TableCell>
              <TableCell align="right">Days Until</TableCell>
              <TableCell align="right">Stoke</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bdayArr.map((row) => (
              <TableRow key={row.id} sx={styleRow(row.daysUntil)}>
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
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={bdays.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}
