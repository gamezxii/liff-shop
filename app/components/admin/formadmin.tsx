import React, { Dispatch, SetStateAction, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
  createStyles,
  makeStyles,
  useTheme,
  Theme,
  withStyles,
} from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Chip from "@material-ui/core/Chip";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import ButtonSubmit from "@/components/ButtonSubmit";
import OutlinedInput from "@material-ui/core/OutlinedInput";
/*  */
import { useDispatch, useSelector } from "react-redux";
import * as adminActions from "@/actions/admin.action";
import * as roleActions from "@/actions/role.action";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      minWidth: 120,
      marginTop: theme.spacing(1),
    },
    chips: {
      display: "flex",
      flexWrap: "wrap",
    },
    chip: {
      margin: 2,
      background: "#808080",
      color: "#fff",
    },
    noLabel: {
      marginTop: theme.spacing(3),
    },
  })
);

function getStyles(name: string, personName: string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface adminState {
  _id: string;
  fullName: string;
  userName: string;
  passWord: string;
  role: string;
  email: string;
  tel: string;
}

interface props {
  title: string;
  openform: boolean;
  adminObject: adminState;
  handleForm: Dispatch<SetStateAction<boolean>>;
  setAdminObject: Dispatch<SetStateAction<object>>;
  isUploading: boolean;
}

export default function FormAdmin({
  title,
  openform,
  handleForm,
  adminObject,
  setAdminObject,
  isUploading,
}: props) {
  const dispatch = useDispatch();
  /* get Reducer */
  const { roles } = useSelector(({ role }: any) => role);
  const handleClose = () => {
    setAdminObject({
      _id: "",
      fullName: "",
      userName: "",
      passWord: "",
      role: "",
      email: "",
      tel: "",
    });
    handleForm(false);
  };

  const handleChangeRole = (event: React.ChangeEvent<{ value: unknown }>) => {
    setAdminObject({
      ...adminObject,
      role: event.target.value,
    });
  };

  const validationFormAdmin = (title, object) => {
    if (title == "????????????????????????????????????????????????") delete object._id;
    for (const [key, value] of Object.entries(object)) {
      if (value == "") {
        switch (key) {
          case "fullName":
            alert("???????????????????????????????????????-?????????????????????");
            return true;

          case "userName":
            alert("?????????????????????????????????????????????????????????");
            return true;

          case "passWord":
            alert("???????????????????????????????????????????????????");
            return true;

          case "role":
            alert("?????????????????????????????????????????????");
            return true;

          case "email":
            alert("?????????????????????????????????????????????");
            return true;

          case "tel":
            alert("???????????????????????????????????????????????????");
            return true;

          default:
            return false;
        }
      }
    }
    return false;
  };

  const handleSubmit = () => {
    if (title == "????????????????????????????????????????????????") {
      if (!validationFormAdmin("????????????????????????????????????????????????", adminObject)) {
        dispatch(adminActions.createAdmin(adminObject));
      }
    } else {
      if (!validationFormAdmin("????????????????????????????????????????????????", adminObject)) {
        dispatch(adminActions.updateAdmin(adminObject));
      }
    }
  };
  const getRole = async () => {
    await dispatch(roleActions.getAllRoles());
  };
  React.useEffect(() => {
    getRole();
  }, []);

  return (
    <React.Fragment>
      <Dialog
        open={openform}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        maxWidth="lg"
        fullWidth={true}
        disableBackdropClick
      >
        <DialogTitle id="form-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel htmlFor="fullName">????????????-?????????????????????</InputLabel>
                <OutlinedInput
                  id="fullName"
                  label="????????????-?????????????????????"
                  type="text"
                  autoComplete="off"
                  value={adminObject.fullName}
                  onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
                    setAdminObject({
                      ...adminObject,
                      fullName: ev.target.value,
                    })
                  }
                />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel htmlFor="userName">??????????????????????????????</InputLabel>
                <OutlinedInput
                  id="userName"
                  label="??????????????????????????????"
                  type="text"
                  autoComplete="off"
                  value={adminObject.userName}
                  onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
                    setAdminObject({
                      ...adminObject,
                      userName: ev.target.value,
                    })
                  }
                />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel htmlFor="passWord">????????????????????????</InputLabel>
                <OutlinedInput
                  id="passWord"
                  label="??????????????????????????????"
                  type="text"
                  autoComplete="off"
                  value={adminObject.passWord}
                  onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
                    setAdminObject({
                      ...adminObject,
                      passWord: ev.target.value,
                    })
                  }
                />
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel id="demo-simple-select-outlined-label">
                  ???????????????
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={adminObject.role}
                  onChange={handleChangeRole}
                  label="???????????????"
                >
                  <MenuItem value={"0"}>
                    <b>?????????????????????????????????????????????</b>
                  </MenuItem>
                  {roles.map((item) => (
                    <MenuItem value={item.roleName}>{item.roleName}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel htmlFor="email">??????????????????</InputLabel>
                <OutlinedInput
                  id="email"
                  label="??????????????????"
                  type="email"
                  autoComplete="off"
                  value={adminObject.email}
                  onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
                    setAdminObject({
                      ...adminObject,
                      email: ev.target.value,
                    })
                  }
                />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel htmlFor="tel">???????????????????????????????????????</InputLabel>
                <OutlinedInput
                  id="tel"
                  label="???????????????????????????????????????"
                  type="text"
                  autoComplete="off"
                  value={adminObject.tel}
                  onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
                    setAdminObject({
                      ...adminObject,
                      tel: ev.target.value,
                    })
                  }
                />
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" disabled={isUploading}>
            ??????????????????
          </Button>
          <ButtonSubmit handleSubmit={handleSubmit} isUploading={isUploading} />
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
