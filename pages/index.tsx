import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import Appbar from "app/layouts/Appbar";
import Typography from "@material-ui/core/Typography";
import Banner from "@/components/Banner";
import Grid, { GridSpacing } from "@material-ui/core/Grid";
import CardItem from "@/components/Card";
import { useSelector, useDispatch } from "react-redux";
import * as productActions from "@/actions/product.action";
import * as authCustomerActions from "@/actions/authCustomer.action";
import { useRouter } from "next/router";
import ImageSlider from "@/components/home/ImageSlider";
import Promotion from "@/components/home/Promotion";
import * as promotionActions from "@/actions/promotion.action";
import * as bannerActions from "@/actions/banner.action";

export default function Home() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { products } = useSelector(({ product }: any) => product);
  const promotionReducer = useSelector((state: any) => state.promotion);
  const bannerReducer = useSelector((state: any) => state.banner);

  const doFeedProduct = () => {
    dispatch(bannerActions.feedBanner());
    dispatch(productActions.feedProductCustomer());
    dispatch(promotionActions.feed());
  };

  useEffect(() => {
    doFeedProduct();
  }, []);

  const getUserProfile = async (liff) => {
    await liff
      .getProfile()
      .then(async (profile) => {
        const payload = {
          liffId: profile.userId,
          fullName: profile.displayName,
          email: "",
        };
        if (payload.liffId !== undefined) {
          dispatch(authCustomerActions.signinCustomer(payload, router));
        }
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  const loginLiff = async () => {
    //e.preventDefault();
    const liff = (await import("@line/liff")).default;
    try {
      await liff.init({ liffId: "1656163029-MZ9wqevR" });
    } catch (error) {
      console.error("liff init error", error.message);
    }
    if (liff.isLoggedIn()) {
      getUserProfile(liff);
    }
  };

  useEffect(() => {
    loginLiff();
  }, []);

  return (
    <React.Fragment>
      <div>
        <Appbar />
        <Container maxWidth="lg">
          <br />
          {promotionReducer.photos.photo !== "" &&
          promotionReducer.photos.statusPromotion === true ? (
            <Promotion photo={promotionReducer.photos.photo} />
          ) : (
            ""
          )}

          <Grid container spacing={1}>
            <Grid item xs={12}>
              {/* <ImageSlider /> */}
              <ImageSlider photos={bannerReducer.photos} />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5" gutterBottom>
                สินค้าประเภทขายดี
              </Typography>
              <Grid
                container
                spacing={2}
                direction="row"
                justify="flex-start"
                alignItems="center"
              >
                {products.map((product, index) => (
                  <Grid key={index} item xs={6} sm={6} md={3}>
                    <CardItem {...product} />
                  </Grid>
                ))}
              </Grid>
              <div></div>
            </Grid>
            {/*  */}
            <Grid item xs={12}>
              <Typography variant="h5" gutterBottom>
                สินค้าใหม่
              </Typography>
              <Grid
                container
                spacing={2}
                direction="row"
                justify="flex-start"
                alignItems="center"
              >
                {products.map((product, index) => (
                  <Grid key={index} item xs={6} sm={6} md={3}>
                    <CardItem {...product} />
                  </Grid>
                ))}
              </Grid>
              <div></div>
            </Grid>
            {/*  */}
          </Grid>
          <br />
        </Container>
      </div>
    </React.Fragment>
  );
}
