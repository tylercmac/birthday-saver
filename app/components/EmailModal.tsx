import * as React from 'react';
import { Form } from 'remix'
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddAlertIcon from '@mui/icons-material/AddAlert';
import FormHelperText from '@mui/material/FormHelperText';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

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

export function EmailModal({ name, bday, daysUntil } : { name: string, bday: string, daysUntil: string}) {
  const [open, setOpen] = React.useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [daysBefore, setDaysBefore] = React.useState('1');
  const [email, setEmail] = React.useState('');
  const handleCloseSnack = () => setOpenSnackbar(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChange = (event: SelectChangeEvent) => {
    setDaysBefore(event.target.value as string);
  };
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const validateEmail = (email: string | null) => {
    if (email?.length) {
      const valid = String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
        return valid ? true : false
      } else return true
  };

  const completeSchedule = (email: string) => {
    if (!validateEmail(email)) {
      throw new Error('Invalid Email')
    }
    
    setOpen(false);
    setOpenSnackbar(true);
  }

  return (
    <div className="email-modal">
      <Button onClick={handleOpen}><AddAlertIcon color="success"/></Button>
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
              Get an email notification for {name}'s bday!
            </Typography>
              <Form className="email-fields" method="post" action="/notif/scheduleemail">
                <TextField error={validateEmail(email)} helperText='Invalid Email' className="email-notif-field" name="email" id="email" value={email} onChange={handleEmailChange} label="Email Address" variant="outlined" />
                <Select
                  labelId="demo-simple-select-label"
                  className="days-before-select"
                  label="Days before?"
                  onChange={handleChange}
                  defaultValue={daysBefore}
                  >
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={1}>1</MenuItem>
                </Select>
                <FormHelperText className="helper-text">How many days before?</FormHelperText>
                <button className="btn btn-sched-email" onClick={() => completeSchedule(email)} type="submit">
                  Schedule Email!
                </button>
                <input name="name" id="name" className="hidden" defaultValue={name}/>
                <input name="bday" id="bday" className="hidden" defaultValue={bday}/>
                <input name="days-before" id="days-before" className="hidden" defaultValue={daysBefore}/>
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
          Email Scheduled!
        </Alert>
      </Snackbar>
    </div>
  );
      
}