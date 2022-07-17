import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddAlertIcon from '@mui/icons-material/AddAlert';
import FormHelperText from '@mui/material/FormHelperText';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';


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
  const [daysBefore, setDaysBefore] = React.useState('1');
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChange = (event: SelectChangeEvent) => {
    setDaysBefore(event.target.value as string);
  };

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
              <form className="email-fields" method="POST" action="/notif/scheduleemail">
                <TextField className="email-notif-field" name="email" id="email" label="Email Address" variant="outlined" />
                <Select
                  labelId="demo-simple-select-label"
                  className="days-before-select"
                  value={daysBefore}
                  label="Days before?"
                  onChange={handleChange}
                  >
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={1}>1</MenuItem>
                </Select>
                <FormHelperText className="helper-text">How many days before?</FormHelperText>
                <button className="btn btn-sched-email" type="submit">
                  Schedule Email!
                </button>
                <input name="name" id="name" className="hidden" value={name}/>
                <input name="bday" id="bday" className="hidden" value={bday}/>
                <input name="days-before" id="days-before" className="hidden" value={daysBefore}/>
              </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
      
}