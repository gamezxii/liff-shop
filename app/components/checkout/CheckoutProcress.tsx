import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import Grid from "@material-ui/core/Grid";
import CardGiftcardIcon from "@material-ui/icons/CardGiftcard";
import Paper from "@material-ui/core/Paper";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import FormAddress from "./FormAddress";
import {
  numberWithCommas,
  totalCheckout,
  totalCheckoutDiscount,
} from "@/utils/service";
import { useRouter } from "next/router";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import * as bankActions from "@/actions/bank.action";
import { useDispatch, useSelector } from "react-redux";
import BankRadio from "./Bankradio";
import * as checkoutActions from "@/actions/checkout.action";
import * as orderActions from "@/actions/order.action";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      padding: theme.spacing(2),
      border: "2px solid #AD00FF",
    },
    titleHeader: {
      display: "flex",
      color: "#AD00FF",
      "& p": {
        marginLeft: 5,
        fontSize: 18,
        fontWeight: 500,
      },
    },
    subTotal: {
      display: "flex",
      color: "#878787",
      justifyContent: "space-between",
      "& p": {
        marginLeft: 5,
        fontSize: 18,
        fontWeight: 500,
      },
      "& span": {
        marginLeft: 5,
        fontSize: 18,
        fontWeight: 500,
        color: "red",
      },
    },
  })
);

interface checkOutState {
  total: number;
  discount: number;
  totalprice: number;
}

interface Customer {
  _id: string;
  fullName: string;
  userName: string;
  email: string;
  role: string;
  sex: string;
  age: string;
  address: string;
  billingAddress: string;
  shippingAddress: string;
}

interface Props {
  checkouts: any[];
  note: string;
  openFormAddress: boolean;
  setOpenFormAddress: Dispatch<SetStateAction<boolean>>;
  customer: Customer;
}

//checkout ของ หน้า checkout
const CheckoutProcress = ({
  checkouts,
  note,
  openFormAddress,
  setOpenFormAddress,
  customer,
}: Props) => {
  const classes = useStyles();
  const router = useRouter();
  const dispatch = useDispatch();
  const [subTotal, setSubTotal] = useState({
    total: 0,
    discount: 0,
    totalprice: 0,
  });
  const { banks } = useSelector(({ bank }: any) => bank);
  const couponReducer = useSelector((state: any) => state.coupon);
  const [changeBank, setChangeBank] = useState("");
  const [couponCode, setCouponCode] = useState<string>("");

  /*  */

  const handleFeedBanks = () => {
    dispatch(bankActions.feedBanks());
  };

  const handleSubmit = () => {
    if (changeBank == "") return alert("กรุณาเลือกธนาคาร");
    const { total, discount, totalprice } = subTotal;
    const reqCreateOrder = {
      total: total,
      discount: discount,
      totalprice: totalprice,
      bankId: changeBank,
      address: customer.shippingAddress,
      note: note,
      customerId: customer._id,
      billingAddress: customer.billingAddress,
      shippingAddress: customer.shippingAddress,
      products: checkouts,
      orderStatus: 0,
      paidStatus: 0,
      code: couponCode,
    };
    console.log(reqCreateOrder);
    dispatch(orderActions.createOrder(reqCreateOrder, router));
  };

  useEffect(() => {
    if (checkouts.length > 0) {
      const total = totalCheckout(checkouts);
      const resultDiscount = totalCheckoutDiscount(checkouts);
      console.log(checkouts);
      if (couponReducer.coupons.length > 0) {
        const { priceSale, code } = couponReducer.coupons[0];
        let discount = resultDiscount + priceSale;
        setSubTotal({
          total: total,
          discount: discount,
          totalprice: total - discount,
        });
        setCouponCode(code);
      } else {
        setSubTotal({
          total: total,
          discount: resultDiscount,
          totalprice: total - resultDiscount,
        });
      }
    }
  }, [checkouts, couponReducer.coupons]);
  /*  */

  /*  */

  useEffect(() => {
    handleFeedBanks();
  }, []);
  return (
    <Paper className={classes.root} elevation={1}>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <FormAddress
            open={openFormAddress}
            setOpen={setOpenFormAddress}
            customer={customer}
          />
        </Grid>
        <Grid item xs={12}>
          <div className={classes.titleHeader}>
            <CreditCardIcon />
            <Typography variant="body1" gutterBottom>
              ชำระเงิน
            </Typography>
          </div>

          {/* Select Bank */}
          <BankRadio
            banks={banks}
            changeBank={changeBank}
            setChangeBank={setChangeBank}
          />
          {/*  */}
          <div className={classes.subTotal}>
            <Typography variant="body1" gutterBottom>
              ราคารวม :
            </Typography>
            <span>{numberWithCommas(subTotal.total)}฿</span>
          </div>
          <div className={classes.subTotal}>
            <Typography variant="body1" gutterBottom>
              ค่าจัดส่ง :
            </Typography>
            <span>{numberWithCommas(subTotal.discount)}฿</span>
          </div>
          <div className={classes.subTotal}>
            <Typography variant="body1" gutterBottom>
              ส่วนลด :
            </Typography>
            <span>{numberWithCommas(subTotal.discount)}฿</span>
          </div>
          <div className={classes.subTotal}>
            <Typography variant="body1" gutterBottom>
              ราคาสุทธิ :
            </Typography>
            <span>{numberWithCommas(subTotal.totalprice)}฿</span>
          </div>
        </Grid>
      </Grid>
      <Grid
        container
        spacing={0}
        direction="row"
        justify="flex-end"
        alignItems="flex-end"
      >
        <Grid item xs={6}>
          <Button
            variant="outlined"
            fullWidth
            style={{
              color: "#3f51b5",
              borderColor: "#3f51b5",
            }}
            onClick={handleSubmit}
          >
            สั่งซื้อสินค้า
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default CheckoutProcress;
