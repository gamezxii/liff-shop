import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import DialogEditPayment from "@/components/profile/edit/DialogEditPayment";
import Card from "@material-ui/core/Card";
import {
  Theme,
  useTheme,
  createStyles,
  makeStyles,
} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Loading from "@/components/Loading";
import Button from "@material-ui/core/Button";
//call redux
import { useSelector, useDispatch } from "react-redux";
import * as paymentActions from "@/actions/payment.action";
import Snackbars from "@/components/Snackbar";
import Chip from "@material-ui/core/Chip";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      padding: theme.spacing(2),
    },
    margin: {
      margin: theme.spacing(1),
    },
    textField: {
      width: "25ch",
    },
    paperStyle: {
      padding: "30px 20px",
      width: theme.spacing(80),
      margin: "20px auto",
      // justify: "center",
      // alignItems: "center",
    },

    headerStyle: {
      margin: 0,
    },
    avatarStyle: {
      backgroundColor: "#1bbd7e",
    },
    marginTop: {
      marginTop: 5,
    },
    paper: {
      padding: theme.spacing(2),
    },
    textfield: {
      marginBottom: theme.spacing(1),
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      maxWidth: 300,
    },
    chips: {
      display: "flex",
      flexWrap: "wrap",
    },
    chip: {
      margin: 2,
    },
    noLabel: {
      marginTop: theme.spacing(3),
    },
    imageIcon: {
      height: "100%",
    },
    iconRoot: {
      textAlign: "center",
    },
  })
);

interface State {
  amount: string;
  password: string;
  weight: string;
  weightRange: string;
  showPassword: boolean;
}
interface Props {
  id: string;
}
export default function InputAdornments({ id }: Props) {
  const classes = useStyles();
  const { payments, isLoading, isMessage, isStatus } = useSelector(
    ({ payment }: any) => payment
  );
  const theme = useTheme();
  const dispatch = useDispatch();
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [typeSnackbar, setTypeSnackbar] = React.useState("error");
  const feedWithId = () => {
    dispatch(paymentActions.getPayments(id));
  };

  const [values, setValues] = React.useState<State>({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });
  const handleDelete = (id: string) => {
    dispatch(paymentActions.updateStatus({ _id: id, paymentStatus: 3 }));
  };
  const handleSelected = (id: string) => {
    dispatch(paymentActions.updateStatus({ _id: id, paymentStatus: 1 }));
  };
  useEffect(() => {
    feedWithId();
  }, []);
  useEffect(() => {
    if (isStatus === 201) {
      setTypeSnackbar("success");
      setOpenSnackbar(!openSnackbar);
    } else if (isStatus == 401 || isStatus == 400) {
      setTypeSnackbar("error");
      setOpenSnackbar(!openSnackbar);
    }
  }, [isStatus]);
  return (
    <div>
      <Loading open={isLoading} />
      <Snackbars
        open={openSnackbar}
        handleCloseSnakbar={setOpenSnackbar}
        message={isMessage}
        type={typeSnackbar}
      />
      <Grid
        container
        spacing={0}
        direction="column"
        // alignItems="center"
        // justify="center"
      >
        <Avatar className={classes.avatarStyle}>
          <AddCircleOutlineOutlinedIcon />
        </Avatar>
        <br />
        <h2 className={classes.headerStyle}>ข้อมูลบัญชี</h2>
        <Typography variant="caption" gutterBottom>
          รายละเอียดสมัครสมาชิก
        </Typography>
        {payments.map((payment) => {
          if (payment.paymentStatus != 2) {
            return (
              <>
                <Card className={classes.root}>
                  <Grid container spacing={3}>
                    <Grid item xs={6}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {payment.bankAccName}
                      </Typography>

                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        {payment.bankAccNo}
                      </Typography>
                    </Grid>
                    <Grid item xs={2}>
                      {payment.paymentStatus == 1 && (
                        <Chip
                          style={{
                            marginRight: theme.spacing(1),
                          }}
                          size="small"
                          label="ตั้งเป็นค่าเริ่มต้น"
                          color="secondary"
                        />
                      )}
                    </Grid>
                    <Grid item xs={4}>
                      <Button size="small" color="primary">
                        <DialogEditPayment {...payment} />
                      </Button>
                      <Button
                        size="small"
                        color="primary"
                        onClick={() => handleSelected(payment._id)}
                      >
                        เลือก
                      </Button>
                      {payment.paymentStatus == 1 ? (
                        <Button
                          size="small"
                          color="primary"
                          disabled
                          onClick={() => handleDelete(payment._id)}
                        >
                          Remove
                        </Button>
                      ) : (
                        <Button
                          size="small"
                          color="primary"
                          onClick={() => handleDelete(payment._id)}
                        >
                          Remove
                        </Button>
                      )}
                    </Grid>
                  </Grid>
                </Card>
                <br />
              </>
            );
          }
        })}
      </Grid>
    </div>
  );
}
