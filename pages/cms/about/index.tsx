import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "@/layout";
import DataTable from "@/components/about/datatable";
import Loading from "@/components/Loading";
import * as productAction from "@/actions/product.action";
import * as aboutAction from "@/actions/about.action";
import { useDispatch, useSelector } from "react-redux";
import Snackbars from "@/components/Snackbar";
import AddAbout from "@/components/about/AddAbout";
import EditAbout from "@/components/about/EditAbout";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {
  Theme,
  createStyles,
  makeStyles,
  useTheme,
} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      padding: theme.spacing(2),
    },
    table: {
      minWidth: 650,
    },
    paper: {
      padding: theme.spacing(2),
      // minHeight: "80vh",
      //color: theme.palette.text.secondary,
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
  })
);

const List = () => {
  const classes = useStyles();
  const router = useRouter();
  const dispatch = useDispatch();
  // const { product } = useSelector((state: any) => state);
  const { about } = useSelector((state: any) => state);
  const { abouts, isLoading, isMessage, isStatus } = about;
  // const { abouts } = about;

  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [typeSnackbar, setTypeSnackbar] = React.useState("error");
  useEffect(() => {
    // dispatch(productAction.feedProduct());
    dispatch(aboutAction.feedAbout());

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
    <Layout>
      <Loading open={isLoading} />
      <Snackbars
        open={openSnackbar}
        handleCloseSnakbar={setOpenSnackbar}
        message={isMessage}
        type={typeSnackbar}
      />
      <div>{router.pathname}</div>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Paper elevation={1} className={classes.root}>
            <AddAbout />
            <br />
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>จัดการหน้าเกี่ยวกับเรา</TableCell>
                    <TableCell align="right">หัวข้อเรื่อง</TableCell>
                    <TableCell align="right">รายละเอียด</TableCell>
                    <TableCell align="right">รูปภาพ</TableCell>
                    <TableCell align="right">จัดการ</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {abouts.map((about) => (
                    <TableRow key={about.name}>
                      <TableCell component="th" scope="row">
                        {about.title}
                      </TableCell>
                      <TableCell align="right">{about.detail}</TableCell>
                      <TableCell align="right">{about.image}</TableCell>
                      <TableCell align="right">{about.status}</TableCell>
                      <TableCell align="right"><EditAbout data={about} /></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

          </Paper>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default List;
