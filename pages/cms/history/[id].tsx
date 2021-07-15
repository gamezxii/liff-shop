import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "@/layout";
import Button from "@material-ui/core/Button";
import ButtonBack from "@/components/ButtonBack";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import {
  Theme,
  createStyles,
  makeStyles,
  useTheme,
} from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
/*  */
import { GetServerSideProps } from "next";
import { useDispatch, useSelector } from "react-redux";
import * as orderActions from "@/actions/order.action";
import * as historyActions from "@/actions/history.action";
import { checkOrderStatus, checkPadding } from "@/utils/constans";
import FormPaidstatus from "@/components/order/FormPaidstatus";
import { numberWithCommas } from "@/utils/service";

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
    table: {
      minWidth: 650,
    },
    boxHeader: {
      display: "flex",
      justifyContent: "space-between",
    },
  })
);

export const getServerSideProps: GetServerSideProps = async (context) => {
  const param = await context.query;
  return {
    props: { id: param.id },
  };
};

const HistoryId = ({ id }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const historyReducer = useSelector((state: any) => state.history);
  const [openFormPaid, setOpenFormPaid] = useState(false);
  const dofeed = () => {
    dispatch(historyActions.feedHistoriesWithId(id));
  };

  useEffect(() => {
    dofeed();
    return () => {};
  }, []);
  return (
    <Layout>
      <Paper className={classes.root}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <div className={classes.boxHeader}>
              <div>
                <ButtonBack />
              </div>
              <div>
                {historyReducer.histories.length > 0 ? (
                  <Button variant="contained">
                    สถานะการชำระเงิน :{" "}
                    {checkOrderStatus(historyReducer.histories[0].orderStatus)}
                  </Button>
                ) : (
                  ""
                )}
              </div>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className={classes.boxHeader}>
              <div>
                {historyReducer.histories.length > 0 ? (
                  <FormPaidstatus
                    open={openFormPaid}
                    setOpen={setOpenFormPaid}
                    paidStatus={historyReducer.histories[0].paidStatus}
                    objectId={historyReducer.histories[0]._id}
                  />
                ) : (
                  ""
                )}
              </div>
              <div>
                {historyReducer.histories.length > 0 ? (
                  <Button
                    variant="contained"
                    onClick={() => setOpenFormPaid(!openFormPaid)}
                  >
                    สถานะการจัดส่ง : {checkPadding(historyReducer.histories[0].paidStatus)}
                    &nbsp;(แก้ไข)
                  </Button>
                ) : (
                  ""
                )}
              </div>
            </div>
          </Grid>
          <Grid item xs={12}>
            {historyReducer.histories.length > 0
              ? historyReducer.histories.map(({ shippingAddress, customerId }) => (
                  <React.Fragment key={customerId._id}>
                    <Grid container spacing={1}>
                      <Grid item xs={12}>
                        <div>
                          <Typography variant="body1" gutterBottom>
                            ที่อยู่จัดส่ง
                          </Typography>
                          <TextField
                            fullWidth
                            variant="outlined"
                            value={` ${customerId.fullName} ${"\n"} ${
                              customerId.tel
                            } ${"\n"} ${shippingAddress.shippingAddress}`}
                            multiline
                            rows={4}
                            inputProps={{ readOnly: true }}
                          />
                        </div>
                      </Grid>
                    </Grid>
                  </React.Fragment>
                ))
              : ""}
          </Grid>
          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">ชื่อสินค้า</TableCell>
                    <TableCell align="right">ขนาด</TableCell>
                    <TableCell align="right">จำนวนสินค้า&nbsp;(ชิ้น)</TableCell>
                    <TableCell align="right">ส่วนลด&nbsp;(ชิ้น)</TableCell>
                    <TableCell align="right">ราคา&nbsp;(ชิ้น)</TableCell>
                    <TableCell align="right">รวม</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {historyReducer.histories.map((row) => (
                    <React.Fragment key={row._id}>
                      {row.products.map((product) => (
                        <TableRow key={product._id}>
                          <TableCell component="th" scope="row">
                            {product.productId.title}
                          </TableCell>
                          <TableCell align="right">{product.size}</TableCell>
                          <TableCell align="right">
                            {product.quantity}
                          </TableCell>
                          <TableCell align="right">
                            {product.productId.saleprice * product.quantity}
                          </TableCell>
                          <TableCell align="right">{product.price}</TableCell>
                          <TableCell align="right">
                            {product.price * product.quantity}
                          </TableCell>
                        </TableRow>
                      ))}
                    </React.Fragment>
                  ))}
                  {/* footer */}
                  {historyReducer.histories.map(({ _id, totalprice, discount, total }) => (
                    <React.Fragment key={_id}>
                      <TableRow>
                        <TableCell rowSpan={3} colSpan={4} />
                        <TableCell colSpan={1}>รวม</TableCell>
                        <TableCell align="right">
                          {numberWithCommas(total)}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={1}>ส่วนลด</TableCell>
                        <TableCell align="right">
                          {numberWithCommas(discount)}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={1}>ราคาสุทธิ</TableCell>
                        <TableCell align="right">
                          {numberWithCommas(totalprice)}
                        </TableCell>
                      </TableRow>
                    </React.Fragment>
                  ))}
                  {/*  */}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Paper>
    </Layout>
  );
};

export default HistoryId;
