import React from "react";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
const InputText = ({ id, label, value, SetonChange, classes, type }) => {
  return (
    <FormControl fullWidth>
      <TextField
        id={id}
        label={label}
        variant="outlined"
        className={classes}
        size="small"
        value={value}
        onChange={SetonChange}
        type={type}
        autoComplete="off"
      />
    </FormControl>
  );
};

export default InputText;
