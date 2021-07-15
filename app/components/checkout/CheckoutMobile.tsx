import React from "react";
import Container from "@material-ui/core/Container";
import Appbar from "app/layouts/Appbar";
import Typography from "@material-ui/core/Typography";
import Banner from "@/components/Banner";
import Grid, { GridSpacing } from "@material-ui/core/Grid";
import CardItem from "@/components/Card";
import Paper from "@material-ui/core/Paper";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import PinDropIcon from "@material-ui/icons/PinDrop";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { numberWithCommas } from "@/utils/service";
import { urlApi } from "@/context/urlapi";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    boxListProduct: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      borderBottom: "2px solid #000",
      marginBottom: 5,
    },
    photo: {
      width: 80,
      height: 80,
    },
    boxDetails: {
      width: "100%",
      marginLeft: 10,
    },
    priceAndqty: {
      display: "flex",
      justifyContent: "space-between",
    },
  })
);

interface Props {
  _id: string;
  price: number;
  quantity: number;
  productId: any;
}

const CheckoutMobile = ({ _id, price, quantity, productId }: Props) => {
  const classes = useStyles();
  return (
    <div className={classes.boxListProduct}>
      <div className="div">
        <img
          className={classes.photo}
          src={`${urlApi}uploads/${productId.images[0]}`}
          alt=""
        />
      </div>
      <div className={classes.boxDetails}>
        <div>
          <Typography variant="body1" gutterBottom>
            {productId.title}
          </Typography>
        </div>
        <div>ราคา : {numberWithCommas(price)}฿</div>
        <div className={classes.priceAndqty}>
          <Typography variant="body1" gutterBottom>
            จำนวน : x {quantity}
          </Typography>
          <Typography variant="body1" gutterBottom style={{ color: "red" }}>
            รวม : {numberWithCommas(price * quantity)}฿
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default CheckoutMobile;
