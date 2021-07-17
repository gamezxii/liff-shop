import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import Appbar from "app/layouts/Appbar";
import Typography from "@material-ui/core/Typography";
import Banner from "@/components/Banner";
import { urlApi } from "@/context/urlapi";
import Grid, { GridSpacing } from "@material-ui/core/Grid";
import CardItem from "@/components/Card";
import { useSelector, useDispatch } from "react-redux";
import * as aboutAction from "@/actions/about.action";
import * as authCustomerActions from "@/actions/authCustomer.action";
import { useRouter } from "next/router";
import {
  Theme,
  createStyles,
  makeStyles,
  useTheme,
} from "@material-ui/core/styles";
import Fadeinsection from "@/components/aboutus/Fadeinsection";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      margin: theme.spacing(0, "auto"),
    },
    contentCon: {
      display: "flex",
      justifyContent: "space-between",
      marginTop: theme.spacing(3),
      "&:first-child &:last-child": { padding: "5rem 0" },
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        "&:nth-child(2)": {
          order: 1,
        },
      },
    },
    contentLeft: {
      "& img": {
        width: "100%",
        objectFit: "cover",
        borderRadius: 5,
      },
    },
    contentRight: {
      padding: theme.spacing(2),
      textAlign: "left",
      [theme.breakpoints.down("sm")]: {
        order: 1,
      },
    },
  })
);

const RenderLeft = ({ classes, photo }) => {
  return (
    <Fadeinsection>
      <section className={classes.contentCon}>
        <div className={classes.contentLeft}>
          <img src={`${urlApi}uploads/aboutus/${photo}`} alt={photo} />
        </div>
        <div className={classes.contentRight}>
          <h2>ห้องประชุม</h2>
          <p>
            ห้องประชุมรองรับการประชุมได้ 100-120 ท่าน จัดประชุม/สัมมนา
            จัดเลี้ยงสังสรรค์ มีลานด้านหน้ากว้าง จัดเลี้ยงสังสรรค์ได้
          </p>
        </div>
      </section>
    </Fadeinsection>
  );
};

const RenderRight = ({ classes, photo }) => {
  return (
    <section className={classes.contentCon}>
      <div className={classes.contentRight}>
        <h2>ห้องคาราโอเกะ</h2>
        <p>
          ห้องคาราโอเกะสามารถรองรับได้ 10-30 ท่าน มีเบียรเยือก เบียรสด
          จัดเลี้ยงสังสรรค์ได้
        </p>
      </div>
      <div className={classes.contentLeft}>
        <img src={`${urlApi}uploads/aboutus/${photo}`} alt={photo} />
      </div>
    </section>
  );
};

export default function Aboutus() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();
  const { about } = useSelector((state: any) => state);
  const { abouts, isLoading, isMessage, isStatus } = about;
  useEffect(() => {
    // dispatch(productAction.feedProduct());
    dispatch(aboutAction.feedAbout());

  }, []);
  const item = [
    "https://images.unsplash.com/photo-1625242420602-a22dd7692b82?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    "https://images.unsplash.com/photo-1625153674020-a5234b66c39d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    "https://images.unsplash.com/photo-1418846531910-2b7bb1043512?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80",
  ];

  useEffect(() => { }, []);

  return (
    <React.Fragment>
      <div>
        <Appbar />
        <Container maxWidth="lg">
          <br />
          {
            abouts.length > 0
              ? abouts.map((about, index) => {
                return (
                  <React.Fragment key={index}>
                    <Fadeinsection>
                      {(index + 1) % 2 == 0 ? (
                        <RenderRight classes={classes} photo={about.image} />
                      ) : (
                        <RenderLeft classes={classes} photo={about.image} />
                      )}
                    </Fadeinsection>
                  </React.Fragment>
                );
              }) : "ไม่มีบทความ"
          }

          <br />
        </Container>
      </div>
    </React.Fragment>
  );
}
