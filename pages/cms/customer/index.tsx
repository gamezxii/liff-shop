import React, { useEffect } from "react";
import Layout from "@/layout";
import Paper from "@material-ui/core/Paper";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import CustomerTable from "@/components/customer/datatablecustomer";

import { useRouter } from "next/router";
import Loading from "@/components/Loading";
/* redux */
import { useSelector, useDispatch } from "react-redux";
import * as customerActions from "@/actions/customer.action";
/*  */

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
    button: {
      marginBottom: theme.spacing(1),
    },
  })
);

const Customer = () => {
  const classes = useStyles();
  const router = useRouter();
  const dispatch = useDispatch();
  const { isLoading, customers } = useSelector(({ customer }: any) => customer);

  useEffect(() => {
    dispatch(customerActions.feedCustomers());
  }, []);
  return (
    <Layout>
      <Loading open={isLoading} />
      <Paper className={classes.root} elevation={4}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <CustomerTable customers={customers ? customers : []} />
          </Grid>
        </Grid>
      </Paper>
    </Layout>
  );
};

export default Customer;
