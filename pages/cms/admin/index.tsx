import React, { useState, useEffect } from "react";
import Layout from "@/layout";
import Paper from "@material-ui/core/Paper";
import {
  Theme,
  createStyles,
  makeStyles,
  useTheme,
} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { useRouter } from "next/router";
import Button from "@material-ui/core/Button";
import AdminTable from "@/components/admin/tableadmin";
import FormAdmin from "@/components/admin/formadmin";
import { useDispatch, useSelector } from "react-redux";
import Snackbar from "@/components/Snackbar";
import Loading from "@/components/Loading";
import * as adminActions from "@/actions/admin.action";

import { parseCookies } from "@/utils/token";
import { wrapper } from "@/wapper/store";

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ store, req }) => {
    let user = await parseCookies(req);
    if (!user) {
      return {
        redirect: {
          permanent: false,
          destination: "/cms/signin",
        },
      };
    }
    return {
      props: { user, data: { props: { user } } },
    };
  }
);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      padding: theme.spacing(2),
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

interface adminState {
  _id: string;
  fullName: string;
  userName: string;
  passWord: string;
  role: string;
  email: string;
  tel: string;
}

const Coupon = () => {
  const classes = useStyles();
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [typeSnackbar, settypeSnackbar] = useState<string>("error");
  const [openform, setOpenform] = useState<boolean>(false);
  const [titleform, setTitleform] = useState<string>("เพิ่มผู้ดูแลระบบ");
  const [adminObject, setAdminObject] = useState<adminState>({
    _id: "",
    fullName: "",
    userName: "",
    passWord: "",
    role: "",
    email: "",
    tel: "",
  });
  const dispatch = useDispatch();
  const { isLoading, isUploading, isMessage, isStatus, admins } = useSelector(
    ({ admin }: any) => admin
  );

  const toggleCreateform = () => {
    setTitleform("เพิ่มผู้ดูแลระบบ");
    setOpenform(!openform);
  };

  const toggleEditform = (objectAdmin: adminState) => {
    setAdminObject({
      _id: objectAdmin._id,
      fullName: objectAdmin.fullName,
      userName: objectAdmin.userName,
      passWord: objectAdmin.passWord,
      role: objectAdmin.role,
      email: objectAdmin.email,
      tel: objectAdmin.tel,
    });
    setTitleform("แก้ไขผู้ดูแลระบบ");
    setOpenform(!openform);
  };

  useEffect(() => {
    //handle upload if return status == 201 | 200 is mean create success
    if (isStatus === 201 || isStatus === 200) {
      settypeSnackbar("success");
      setOpenSnackbar(!openSnackbar);
      setAdminObject({
        _id: "",
        fullName: "",
        userName: "",
        passWord: "",
        role: "",
        email: "",
        tel: "",
      });
      setOpenform(false);
    } else if (isStatus == 401 || isStatus == 400) {
      //handle upload if return status == 400 | 401 is mean create not success
      settypeSnackbar("error");
      setOpenSnackbar(!openSnackbar);
    }
  }, [isStatus]);

  const dofeed = async () => {
    await dispatch(adminActions.feedAdmins());
  };

  useEffect(() => {
    dofeed();
  }, []);

  return (
    <Layout>
      <Loading open={isLoading || isUploading} />
      <Snackbar
        open={openSnackbar}
        handleCloseSnakbar={setOpenSnackbar}
        message={isMessage}
        type={typeSnackbar}
      />
      <Paper className={classes.root} elevation={4}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => toggleCreateform()}
            >
              เพิ่มผู้ดูแลระบบ
            </Button>
            <FormAdmin
              title={titleform}
              openform={openform}
              handleForm={setOpenform}
              adminObject={adminObject}
              setAdminObject={setAdminObject}
              isUploading={isUploading}
            />
            <br />
            <br />
            <AdminTable handleForm={toggleEditform} admins={admins} />
          </Grid>
        </Grid>
      </Paper>
    </Layout>
  );
};

export default Coupon;
