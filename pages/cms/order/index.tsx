import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "@/layout";
import { useDispatch, useSelector } from "react-redux";
import * as orderActions from "@/actions/order.action";
import dynamic from "next/dynamic";
const TableOrder = dynamic(() => import("@/components/order/TableOrder"), {
  ssr: false,
});

const List = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { orders } = useSelector((state: any) => state);

  const doFeed = () => {
    dispatch(orderActions.getOrdersCms());
  };

  useEffect(() => {
    doFeed();
  }, []);

  return (
    <Layout>
      <div>{router.pathname}</div>
      <TableOrder orders={orders.orders ? orders.orders : []} />
    </Layout>
  );
};

export default List;
