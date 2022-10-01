import * as React from 'react';
import { Form, redirect, useFetcher } from 'remix'
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { getUser } from '~/utils/session.server';
import { db } from '~/utils/db.server';
import { useEffect } from 'react';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export function NotesModal({ name, bdayId } : { name: string, bdayId: string }) {
  const [open, setOpen] = React.useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [note, setNote] = React.useState('');
  const [error, setError] = React.useState(false);
  const handleCloseSnack = () => setOpenSnackbar(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleNoteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNote(event.target.value);
  };

  const completeSchedule = (note: string) => {
    if (!note.length || note.length > 50) {
      setError(true)
      return
    }
    setOpen(false);
    setOpenSnackbar(true);
  }

  return (
    <div className="email-modal">
      <Button onClick={handleOpen}><NoteAddIcon color="success"/></Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Add a note for {name}'s bday!
            </Typography>
              <Form className="email-fields" method="post" action="/notes/add" reloadDocument={false}>
                <TextField error={error} helperText='Invalid Note' className="email-notif-field" name="note" id="note" value={note} onChange={handleNoteChange} label="Email Address" variant="outlined" />
                <button className="btn btn-sched-email" onClick={() => completeSchedule(note)} type="submit">
                  Add note!!
                </button>
                <input name="bdayId" id="bdayId" defaultValue={bdayId}/>
              </Form>
          </Box>
        </Fade>
      </Modal>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleCloseSnack}
      >
        <Alert onClose={handleCloseSnack} severity="success" sx={{ width: '100%'}}>
          Note Added!
        </Alert>
      </Snackbar>
    </div>
  );
      
}