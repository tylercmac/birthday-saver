import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

type Birthday = {
  id: number;
  name: string;
  date: string;
  stokelevel: number;
  daysUntil: number;
};

interface AutoProps {
  manageBdays: Function;
  bdays: Birthday[]
  filteredData: Birthday[]
}

module.exports.AutocompleteBday = ({filteredData, manageBdays, bdays}: AutoProps) => {
  return (
    <Autocomplete
    onInputChange={(event, newInputValue: string) => {
      manageBdays(newInputValue)
    }}
    options={filteredData.length ? filteredData.map((bday: Birthday) => bday.name) : [""]}
    renderInput={(params) => (
      <TextField
        {...params}
        label="Search Names"
        variant="standard"
        InputProps={{
          ...params.InputProps,
          type: 'search',
        }}
      />
    )}
    sx={{ width: "50%" }}
  />
  )
}
