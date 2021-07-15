import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "@/layout";
import DataTable from "@/components/order/datatable";
import { useDispatch, useSelector } from "react-redux";
import * as orderActions from "@/actions/order.action";
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
      <DataTable orders={orders.orders ? orders.orders : []} />
    </Layout>
  );
};

export default List;
