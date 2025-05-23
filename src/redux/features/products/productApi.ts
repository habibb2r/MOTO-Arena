/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../api/baseApi";

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query<
      any,
      {
        search?: string;
        minPrice?: any;
        maxPrice?: any;
        category?: any;
        brand?: any;
        limit?: number;
        inStock?: boolean;
      }
    >({
      query: ({
        search,
        minPrice,
        maxPrice,
        category,
        brand,
        limit,
        inStock,
      }) => ({
        url: "api/products",
        method: "GET",
        params: {
          search,
          minPrice,
          maxPrice,
          category,
          brand,
          limit,
          inStock,
        },
      }),
      providesTags: ["Products"],
    }),

    getSingleProduct: builder.query<any, { id: any }>({
      query: ({ id }) => ({
        url: `api/products/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, arg) => [
        { type: "Products", id: arg.id },
      ],
    }),

    allbrandandcategory: builder.query({
      query: () => ({
        url: "api/products/category-and-brand",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),

    addProduct: builder.mutation({
      query: (newProduct) => ({
        url: "api/products/create-product",
        method: "POST",
        body: newProduct,
      }),
      invalidatesTags: ["Products"],
    }),

    deleteProduct: builder.mutation<any, string>({
      query: (productId) => ({
        url: `api/products/delete/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetSingleProductQuery,
  useAllbrandandcategoryQuery,
  useAddProductMutation,
  useDeleteProductMutation,
} = productApi;
