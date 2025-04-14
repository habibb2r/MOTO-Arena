/* eslint-disable @typescript-eslint/no-explicit-any */
import { TProductOrder } from "../../../components/ui/CheckOutForm";
import { baseApi } from "../../api/baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query<any, {email:string}>({
        query: (user) => ({
          url: `api/orders/myorders/${user?.email}`,
          method: "GET",
       
        }),
      }),
    getAllOrders: builder.query({
        query: () => ({
          url: `api/orders/allorders`,
          method: "GET",
       
        }),
      }),
      order:builder.mutation<any, TProductOrder>({
        query: (Orderdoc) => ({
          url: `api/orders/make-order`,
          method: "POST",
          body: Orderdoc,
        }),
        invalidatesTags: ["Products"]
      }),
      updateOrderStatus:builder.mutation<any, {id:string;trackId:any}>({
        query: (Orderdoc) => ({
          url: `api/orders/update`,
          method: "PATCH",
          body: Orderdoc,
        }),
      }),
      deleteOrder:builder.mutation<any, {id:string}>({
        query: (idinfo) => ({
          url: `api/order/delete/${idinfo?.id}`,
          method: "DELETE"
        }),
      }),
      getsingleorder:builder.query<any, {email:string; search:string}>({
        query: (doc) => ({
          url: `api/order/getsingleorder?search=${doc?.search}&email=${doc?.email}`,
          method: "GET",
        }),
      }),
  }),
  
});

export const { useGetOrdersQuery,useDeleteOrderMutation,useUpdateOrderStatusMutation,useOrderMutation,useGetsingleorderQuery,useGetAllOrdersQuery} = orderApi;
export default orderApi;
