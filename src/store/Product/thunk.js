import { createAsyncThunk } from '@reduxjs/toolkit'
// import { paginationData } from "../Pagination/reducers";
import axios from 'axios'

//
export const ProductList = createAsyncThunk('products/list', async (data, { rejectWithValue }) => {
    try {
        const res = axios.get('https://dummyjson.com/products', {
            method: 'GET',
            data,
            params: data
        })

        // if (data._limit) {
        //   // Pagination Section
        //   const limit = data._limit || 10;
        //   const TotalPage = Math.ceil(res.totalRecords / limit) || 1;
        //   const paginationObj = {
        //     page: data._page,
        //     totalPage: TotalPage,
        //     totalRecords: res?.totalRecords,
        //   };
        //   dispatch(paginationData(paginationObj));
        // }

        return res
    } catch (err) {
        if (!err.response) {
            throw err
        }
        return rejectWithValue(err.response.data)
    }
})
//
