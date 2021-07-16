import React, { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import Appbar from "app/layouts/Appbar";
import Typography from "@material-ui/core/Typography";
import Banner from "@/components/Banner";
import Grid, { GridSpacing } from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import CarouselImage from "@/components/product/CarouselImage";
import * as basketActions from "@/actions/basket.action";
import { useDispatch, useSelector } from "react-redux";
import * as productActions from "@/actions/product.action";
import { GetServerSideProps } from "next";
import Alertcart from "@/components/product/Alertcart";
import CardItem from "@/components/Card";
import CardRecommand from "@/components/CardRecommand";
import { useRouter } from "next/router";
import EditerView from "../../app/components/product/EditerView";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    boxImage: {
      margin: theme.spacing(1),
    },
    boxDetail: {
      margin: theme.spacing(1),
    },
    boxPrice: {
      background: "#dadada",
      display: "flex",
      width: "95%",
      borderRadius: 5,
      "& div": {
        padding: theme.spacing(2, 3),
        color: "red",
        fontSize: 18,
      },
    },
    boxVariation: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    boxQuantity: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(1),
      "& div": {
        display: "flex",
        alignItems: "center",
      },
      "& input": {
        textAlign: "center",
        maxWidth: 60,
        height: 5,
      },
    },
    boxAction: {},
  })
);

export const getServerSideProps: GetServerSideProps = async (context) => {
  const param = await context.query;
  return {
    props: { id: param.id },
  };
};

interface AdditemBasket {
  customerId: string;
  productId: string;
  price: number;
  quantity: number;
  size: string;
}

const ProductId = ({ id }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();
  const { products } = useSelector(({ product }: any) => product);
  const authCustomer = useSelector((state: any) => state.authCustomer);

  const { isMessage, isStatus, isUploading } = useSelector(
    ({ basket }: any) => basket
  );

  const [quantitySelect, setQuantitySelect] = useState<number>(1);
  const [size, setSize] = useState("");
  const [visibleAlert, setVisibleAlert] = useState(false);

  const feedWithId = () => {
    dispatch(productActions.queryProductWithIdCustomer(id));
  };

  const handleChangeSize = (size: string) => {
    setSize(size);
  };

  useEffect(() => {
    if (isStatus === 201 || isStatus == 200) {
      setVisibleAlert(true);
      const clearSet = setTimeout(() => {
        setVisibleAlert(false);
        clearTimeout(clearSet);
      }, 2500);
    }
  }, [isStatus, products]);

  useEffect(() => {
    feedWithId();
  }, []);

  const handleAddItemTobasket = (product: any) => {
    //เพิ่มสินค้าลงตะกร้า
    if (!authCustomer.user.id) {
      return router.push("/login");
    }
    if (product.size.length > 0) {
      if (size == "") return alert("กรุณาเลือก ขนาดของสินค้า");
    }
    const payload: AdditemBasket = {
      customerId: authCustomer.user.id,
      productId: product._id,
      price: product.price,
      quantity: quantitySelect,
      size: size,
    };
    dispatch(basketActions.AddItems(payload));
  };

  const handleBuyItemTobasket = (product: any) => {
    //button ซื้อสิ้นค้า
    if (!authCustomer.user.id) {
      return router.push("/login");
    }
    if (product.size.length > 0) {
      if (size == "") return alert("กรุณาเลือก ขนาดของสินค้า");
    }
    const payload: AdditemBasket = {
      customerId: authCustomer.user.id,
      productId: product._id,
      price: product.price,
      quantity: quantitySelect,
      size: size,
    };
    dispatch(basketActions.BuyItems(payload, router));
  };
  return (
    <React.Fragment>
      <div>
        <Appbar />
        <Container maxWidth="lg">
          <br />
          {visibleAlert ? <Alertcart /> : ""}
          {products.map((product) => (
            <Paper elevation={5} key={product._id}>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={6}>
                  {/* CarouselImage */}
                  <div className={classes.boxImage}>
                    <CarouselImage images={product.images} />
                  </div>
                </Grid>
                <Grid item xs={12} sm={6}>
                  {/* open box details */}
                  <div className={classes.boxDetail}>
                    <Typography variant="body1" gutterBottom>
                      {product.title}
                    </Typography>
                    <Rating
                      name="half-rating-read"
                      defaultValue={product.averageRating}
                      precision={0.5}
                      readOnly
                    />
                    <div className={classes.boxPrice}>
                      <div>฿{product.price}</div>
                    </div>
                    <div className={classes.boxVariation}>
                      <Typography variant="h5" gutterBottom>
                        Size, color
                      </Typography>
                      {/* fetch size */}
                      <div>
                        {product.size.length > 0
                          ? product.size.map((row, index) => (
                              <Button
                                key={index}
                                variant={row == size ? "outlined" : "contained"}
                                color="primary"
                                style={{ marginRight: 5, marginBottom: 5 }}
                                onClick={() => handleChangeSize(row)}
                              >
                                {row}
                              </Button>
                            ))
                          : ""}
                      </div>
                      <div className={classes.boxQuantity}>
                        <div>
                          <Typography variant="body1" gutterBottom>
                            จำนวน
                          </Typography>
                          <TextField
                            id="outlined-basic"
                            variant="outlined"
                            type="number"
                            autoComplete="off"
                            value={quantitySelect}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => setQuantitySelect(Number(e.target.value))}
                            style={{ marginLeft: 5, marginRight: 5 }}
                          />
                          <Typography variant="body1" gutterBottom>
                            มีสินค้าทั้งหมด {product.quantity} ชิ้น
                          </Typography>
                        </div>
                      </div>
                      <div className={classes.boxAction}>
                        <Button
                          variant="contained"
                          color="primary"
                          style={{ marginRight: 5, background: "#AD00FF " }}
                          onClick={() => handleAddItemTobasket(product)}
                        >
                          <ShoppingCartIcon /> เพิ่มไปยังรถเข็น
                        </Button>
                        <Button
                          variant="outlined"
                          style={{
                            marginRight: 5,
                            background: "#fff",
                            color: "#3f51b5",
                          }}
                          onClick={() => handleBuyItemTobasket(product)}
                        >
                          ซื้อสินค้า
                        </Button>
                      </div>
                    </div>
                    {/* end box detail  */}
                  </div>
                </Grid>
              </Grid>
            </Paper>
          ))}

          <br />
          {/* รายละเอียดสินค้า  */}
          {products.length > 0
            ? products.map((product) => (
                <Paper elevation={5} key={product._id}>
                  <Grid container spacing={1}>
                    <Grid item xs={12}>
                      <div style={{ marginLeft: 30, marginRight: 30 }}>
                        <EditerView description={product.description} />
                      </div>
                    </Grid>
                  </Grid>
                </Paper>
              ))
            : ""}
          {/* รายละเอียดสินค้า relatedProducts */}
          <br />
          {products.length > 0
            ? products.map((product) => (
                <Paper elevation={0} key={product._id}>
                  <Grid
                    container
                    spacing={1}
                    direction="row"
                    justify="center"
                    alignItems="center"
                  >
                    <Grid item xs={12}>
                      <Typography variant="h5" gutterBottom>
                        สินค้าแนะนำ
                      </Typography>
                      <Grid
                        container
                        spacing={2}
                        direction="row"
                        justify="flex-start"
                        alignItems="center"
                      >
                        {product.relatedProducts.map((item, index) => (
                          <Grid key={index} item xs={6} sm={6} md={3}>
                            <CardRecommand {...item} />
                          </Grid>
                        ))}
                      </Grid>
                      <div></div>
                    </Grid>
                  </Grid>
                </Paper>
              ))
            : ""}

          <br />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default ProductId;
