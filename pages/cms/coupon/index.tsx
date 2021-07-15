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
import CouponTable from "@/components/coupon/tablecoupon";
import Button from "@material-ui/core/Button";
import Formcoupon from "@/components/coupon/formcoupon";
import Loading from "@/components/Loading";
import Snackbar from "@/components/Snackbar";

/* redux */
import * as couponActions from "@/actions/coupon.action";
import { useSelector, useDispatch } from "react-redux";

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

interface couponState {
  _id: string; //objectId
  code: string; //code coupon
  percentSale: number; //discount percent
  priceSale: number; //discount price
  couponLimit: number; //limit of coupon
  productAvaliable: any[]; //tag product use coupon
  action: number; //action is mean status open or close use coupon
}

const Coupon = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { isLoading, isUploading, isMessage, isStatus, coupons } = useSelector(
    ({ coupon }: any) => coupon
  );
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [typeSnackbar, settypeSnackbar] = useState("error");
  const [openform, setOpenform] = useState<boolean>(false);
  const [titleform, setTitleform] = useState<string>("สร้างคูปอง");
  const [couponObject, setCouponObject] = useState<couponState>({
    _id: "",
    code: "",
    percentSale: 0,
    priceSale: 0,
    couponLimit: 0,
    productAvaliable: [],
    action: 0,
  });
  /* handle toggle form create or edit */
  const toggleCreateform = () => {
    setTitleform("สร้างคูปอง");
    setOpenform(!openform);
  };
  const toggleEditform = (itemObject: couponState) => {
    console.log(itemObject);
    let productAvaliableItems = [];
    itemObject.productAvaliable.map((product) => {
      productAvaliableItems.push(product._id);
    });
    setCouponObject({
      _id: itemObject._id,
      code: itemObject.code,
      percentSale: itemObject.percentSale,
      priceSale: itemObject.priceSale,
      couponLimit: itemObject.couponLimit,
      productAvaliable: productAvaliableItems,
      action: itemObject.action,
    });
    setTitleform("แก้ไขคูปอง");
    setOpenform(!openform);
  };
  /*  */

  useEffect(() => {
    dispatch(couponActions.feedCoupons());
  }, []);

  useEffect(() => {
    if (isStatus === 201 || isStatus === 200) {
      settypeSnackbar("success");
      setOpenSnackbar(!openSnackbar);
      setCouponObject({
        _id: "",
        code: "",
        percentSale: 0,
        priceSale: 0,
        couponLimit: 0,
        productAvaliable: [],
        action: 0,
      });
      setOpenform(false);
    } else if (isStatus == 401 || isStatus == 400) {
      settypeSnackbar("error");
      setOpenSnackbar(!openSnackbar);
    }
  }, [isStatus]);
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
              สร้างคูปอง
            </Button>
            <Formcoupon
              title={titleform}
              openform={openform}
              handleForm={setOpenform}
              couponObject={couponObject}
              handleSetobjectId={setCouponObject}
              isUploading={isUploading}
            />
            <br />
            <br />
            <CouponTable handleForm={toggleEditform} coupons={coupons} />
          </Grid>
        </Grid>
      </Paper>
    </Layout>
  );
};

export default Coupon;
