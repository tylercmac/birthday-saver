
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  IconButton,
  Typography,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import create from 'zustand';

const useConfirmDialogStore = create((set) => ({
  message: '',
  onSubmit: undefined,
  close: () => set({ onSubmit: undefined }),
}));

export const ConfirmDialog = () => {
  // destructure the store data and functions
  const { message, onSubmit, close } = useConfirmDialogStore();
 return (
    // if the onSubmit is undefined the dialog will be closed. 
    // close() function sets the onSubmit to undefined, 
    // so it will close the dialog, if we pass it to the onClose attribute.
    <Dialog 
      BackdropProps={{ invisible: true }}
      open={Boolean(onSubmit)} 
      onClose={close} 
      maxWidth="sm" 
      fullWidth
    > 
      <DialogTitle>Confirm the action</DialogTitle>
      <Box position="absolute" top={0} right={0}>
        <IconButton onClick={close}>
          <Close />
        </IconButton>
      </Box>
      <DialogContent>
        <Typography>{message}</Typography>
      </DialogContent>
      <DialogActions>
        <Button color="primary" variant="contained" onClick={close}>
          Cancel
        </Button>
        <Button
          color="secondary"
          variant="contained"
          onClick={() => {
            if (onSubmit) {
              onSubmit();
            }
            close();
          }}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export const confirmDialog = (message: String, onSubmit: Function) => {
  useConfirmDialogStore.setState({
    message,
    onSubmit,
  });
};