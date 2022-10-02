import { makeStyles } from "@material-ui/styles"

export const useStyles = makeStyles({
  mainGrid: {
    height: "1rem",
    fontFamily: "Poppins, sans-serif !important",
    wdith: "max-content"
  },
  sticky: {
    position: "sticky",
    left: 0,
    boxShadow: "5px 2px 5px grey",
    width: "250px",
  },
  gridBlue: {
    color: "#002b4c"
  },
  white: {
    background: "#ffff"
  },
  notes: {
    fontStyle: "italic",
    alignItems: "center",
    height: "100%"
  },
  notesBtn: {
    marginRight: '5px',
    padding: 0
  }
})