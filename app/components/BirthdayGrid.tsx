import { MouseEvent, useState, ChangeEvent, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import dayjs from "dayjs";
import { confirmDialog, ConfirmDialog } from './ConfirmDialog';
import { redirect, useLoaderData } from "remix";
import { EmailModal } from "./EmailModal";

type Birthday = {
  id: number;
  name: string;
  date: string;
  age: number;
  stokelevel: number;
  daysUntil: number;
};

export default function BirthdayGrid({newData}: {newData: Birthday[]}) {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [bdays, setBdays] = useState(newData);
  const { data } = useLoaderData();

  useEffect(() => {
    setBdays(sortAndSlice(newData))
  }, [newData])

  const tableStyles = () => {
    return {
      height: "1rem",
      fontFamily: "Poppins, sans-serif",
    };
  };

  const handleChangePage = (
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent> | null,
    page: number
  ) => {
    setPage(page);
    // const offsetBdays = newData.slice((page * pageSize))
    // setBdays(offsetBdays)
  };

  const handleChangePageSize = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPageSize(+event.target.value);
    setPage(0);
  };

  const styleRow = (daysUntil: number) => {
    let cssObj = { 
      background: "#FFFF",  
      // backgroundImage: "",
      height: "1rem"
    }
    // if (daysUntil === 0) cssObj.backgroundImage = `url("partyimg.jpg"`;
    if (daysUntil === 0) cssObj.background = "#00BFFF";
    else if (daysUntil === 1) cssObj.background = "#B22222";
    else if (daysUntil <= 5) cssObj.background = "#E9967A";
    else if (daysUntil <= 10) cssObj.background = "#F0E68C";
    else if (daysUntil <= 30) cssObj.background = "#FAFAD2";
    return cssObj;
  };

  const sortAndSlice = (bdays: Birthday[]) => {
    return addTableProps(bdays)
      .sort((a: Birthday, b: Birthday) => a.daysUntil - b.daysUntil)
      .slice((page * pageSize), (page * pageSize) +10);
  }

  const addTableProps = (bdays: Birthday[]) => {
    console.log({ bdays });
    
    return bdays.map((bday: Birthday) => {
      bday.daysUntil = calcDaysFromToday(bday.date);
      bday.date = dayjs(bday.date).format("M/D/YY");
      bday.age = dayjs().diff(bday.date, "years");
      return bday})
  }

  const calcDaysFromToday = (date: string) => {
    const today = dayjs().format("YYYY-MM-DD");
    const years = dayjs().diff(date, "years");
    const adjustToday = date.substring(5) === today.substring(5) ? 0 : 1;
    const nextBirthday = dayjs(date).add(years + adjustToday, "years");
    const daysUntilBirthday = nextBirthday.diff(today, "days");
    return daysUntilBirthday;
  };


  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={tableStyles()} aria-label="simple table" size="small">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Name</TableCell>
              <TableCell align="right">Birthday</TableCell>
              <TableCell className="stoke-col" align="right">Current Age</TableCell>
              <TableCell align="right">Days Until</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bdays.map((row: any) => (
              <TableRow key={row.id} sx={styleRow(row.daysUntil)}>
                <TableCell className="form">
                  <button onClick={() => {
                    confirmDialog('Are you sure you want to delete this birthday?', 
                    async () => {
                      await fetch(`/remove/${row.id}`)
                      window.location.reload();
                    })         
                  }}
                    className="btn btn-delete"
                  >
                    <i className="fa fa-trash" aria-hidden="true"></i>
                  </button>
                <ConfirmDialog />
                </TableCell>
                <TableCell>
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.date}</TableCell>
                <TableCell className="stoke-col" align="right">{row.age}</TableCell>
                <TableCell className="column-daysuntil" align="right"><EmailModal name={row.name} bday={row.date} daysUntil={row.daysUntil}/>{row.daysUntil}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10]}
        component="div"
        count={data.bdays.length}
        rowsPerPage={pageSize}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={(event) => handleChangePageSize(event)}
      />
    </>
  );
}
