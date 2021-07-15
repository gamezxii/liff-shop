import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { useRouter } from "next/router";
import Rating from "@material-ui/lab/Rating";
import { numberWithCommas } from "@/utils/service";
import { urlApi } from "@/context/urlapi";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 345,
      height: "auto",
      [theme.breakpoints.down("sm")]: {
        height: 291,
      },
    },
    media: {
      width: 345,
      height: 345,
      [theme.breakpoints.down("sm")]: {
        maxWidth: "100%",
        height: "auto",
      },
    },
    image: {
      width: "100%",
      height: 345,
      objectFit: "cover",
      [theme.breakpoints.down("sm")]: {
        fontSize: 16,
        width: 178,
        objectFit: "cover",
        height: 178,
      },
    },
    title: {
      [theme.breakpoints.down("sm")]: {
        fontSize: 16,
      },
    },
    boxdescription: {
      [theme.breakpoints.down("sm")]: {
        display: "none",
      },
    },
    boxdescriptionMobile: {
      [theme.breakpoints.up("sm")]: {
        display: "block",
        fontSize: 14,
      },
    },
  })
);

const CardItem = (props) => {
  const classes = useStyles();
  const router = useRouter();

  const handlePush = () => {
    router.push({ pathname: `/product/${props._id}` });
  };

  return (
    <Card className={classes.root} onClick={handlePush}>
      <CardActionArea>
        <CardMedia
          component="img"
          className={`${classes.media} ${classes.image}`}
          src={`${urlApi}uploads/${props.images[0]}`}
          title={props.title}
          alt={props.title}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="h2"
            className={classes.title}
          >
            {props.title}
          </Typography>
          <Rating
            name={props.title}
            defaultValue={props.averageRating}
            precision={0.5}
            readOnly
          />
          <Typography
            variant="body1"
            color="textSecondary"
            component="p"
            style={{ color: "red" }}
          >
            ฿{numberWithCommas(props.price)}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CardItem;
