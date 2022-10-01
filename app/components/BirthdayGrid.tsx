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
import { Form, useLoaderData } from "remix";
import { EmailModal } from "./EmailModal";
import { NotesModal } from "./NotesModal";

type BdayGridProps = {
  newBdays: Birthday[],
}

type Birthday = {
  id: number;
  name: string;
  date: string;
  age: number;
  stokelevel: number;
  daysUntil: number;
};

export default function BirthdayGrid({newBdays}: BdayGridProps) {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [bdays, setBdays] = useState(newBdays);
  const { data } = useLoaderData();

  useEffect(() => {
    setBdays(sortAndSlice(newBdays))
  }, [newBdays, page])

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
              <TableCell sx={{ width: '250px' }}>Name</TableCell>
              <TableCell align="left" className="desktop-col">Notes</TableCell>
              <TableCell sx={{ width: '100px' }} align="right">Birthday</TableCell>
              <TableCell sx={{ width: '110px' }} className="desktop-col" align="right">Current Age</TableCell>
              <TableCell sx={{ width: '150px', minWidth: '66px' }} align="right">Days Until</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bdays.map((row: any) => (
              <TableRow key={row.id} sx={styleRow(row.daysUntil)}>
                <TableCell className="form">
                    <Form 
                      method="post" 
                      action={`/remove/${row.id}`}
                      onSubmit={(event) => {
                        if (!confirm("Are you sure?")) {
                          event.preventDefault();
                        }
                      }}
                      >
                      <button type="submit" className="btn btn-delete" >
                        <i className="fa fa-trash" aria-hidden="true"></i>
                      </button>
                  </Form>
                  <ConfirmDialog />
                </TableCell>
                <TableCell sx={{ color: '#0086c3'}}>{row.name}</TableCell>
                <TableCell className='desktop-col' align="left">{row.notes || <NotesModal name={row.name} bdayId={row.id} />}</TableCell>
                <TableCell sx={{ fontWeight: 600 }} align="right">{row.date}</TableCell>
                <TableCell className="desktop-col" align="right">{row.age}</TableCell>
                <TableCell sx={{ color: '#0086c3' }} className="column-daysuntil" align="right">{row.daysUntil}<EmailModal name={row.name} bday={row.date} daysUntil={row.daysUntil}/></TableCell>
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
