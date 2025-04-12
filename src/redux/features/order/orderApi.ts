import { TProductOrder } from "../../../components/ui/CheckOutForm";
import { baseApi } from "../../api/baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query<any, {email:string}>({
        query: (user) => ({
          url: `api/order/get/${user?.email}`,
          method: "GET",
       
        }),
      }),
    getAllOrders: builder.query({
        query: () => ({
          url: `api/order/get-all`,
          method: "GET",
       
        }),
      }),
      order:builder.mutation<any, TProductOrder>({
        query: (Orderdoc) => ({
          url: `api/order/pay`,
          method: "POST",
          body: Orderdoc,
        }),
      }),
      updateOrderStatus:builder.mutation<any, {id:string;trackId:any}>({
        query: (Orderdoc) => ({
          url: `api/order/update`,
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
