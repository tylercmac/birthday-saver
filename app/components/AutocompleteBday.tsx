import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

type Birthday = {
  id: number;
  name: string;
  date: string;
  stokeLevel: number;
  daysUntil: number;
};

interface AutoProps {
  manageBdays: Function;
  bdays: Birthday[]
}

module.exports.AutocompleteBday = ({manageBdays, bdays}: AutoProps) => {
  return (
    <Autocomplete
    onInputChange={(event, newInputValue: string) => {
      manageBdays(newInputValue)
    }}
    options={bdays.map((bday: Birthday) => bday.name)}
    renderInput={(params) => (
      <TextField
        {...params}
        label="Search Names"
        variant="standard"
        InputProps={{
          ...params.InputProps,
          type: 'search',
        }}
        // sx={{ padding: "3px", height: "20px" }}
      />
    )}
    sx={{ width: "50%" }}
  />
  )
}
