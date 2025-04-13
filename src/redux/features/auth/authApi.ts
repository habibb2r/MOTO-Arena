import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<object, { email: string; password: string }>({
      query: (userInfo) => ({
        url: "api/auth/login",
        method: "POST",
        body: userInfo,
      }),
    }),
    signup: builder.mutation<object, { name: string; email: string; password: string }>({
      query: (userInfo) => ({
        url: "api/auth/signup",
        method: "POST",
        body: userInfo,
      }),
    }),
    getAllUser:builder.query({
      query: () => ({
        url: "api/auth/all",
        method: "GET",
      }),
    }),
    getsinglecustomer:builder.query<object, { email:string  }>({
      query: (doc) => ({
        url: `api/user/userInfo/${doc?.email}`,
        method: "GET",
      }),
    }),
    updateStatus:builder.mutation<object, { id: string; action: string;  }>({
      query:(payload)=>({
        url:"api/auth/update",
        method:"PATCH",
        body:payload
      })
    }),
    updateNameAndPhoto:builder.mutation({
      query:(payload)=>({
        url:`api/user/update/user`,
        method:"PATCH",
        body:payload,
      })
    }),
    updatepassword:builder.mutation({
      query:(payload)=>({
        url:`api/user/update/password`,
        method:"PATCH",
        body:payload,
      })
    })
  }),
});

export const { useLoginMutation,useSignupMutation,useUpdateNameAndPhotoMutation,useGetsinglecustomerQuery,useUpdatepasswordMutation ,useGetAllUserQuery, useUpdateStatusMutation} = authApi;
export default authApi;
