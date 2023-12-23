import { createAsyncThunk } from '@reduxjs/toolkit'
import {
    createContact,
    deleteContact,
    getContact,
    getContacts,
    updateContact
} from './Contact.services'
import { paginationData } from '../Pagination/reducers'
import axios from 'axios'

//
export const ContactList = createAsyncThunk(
    'Contact/list',
    async (data, { rejectWithValue, dispatch }) => {
        try {
            const res = await getContacts(data)

            if (data._limit) {
                // Pagination Section
                const limit = data._limit || 10
                const TotalPage = Math.ceil(res.totalRecords / limit) || 1
                const paginationObj = {
                    page: data._page,
                    totalPage: TotalPage,
                    totalRecords: res?.totalRecords
                }
                dispatch(paginationData(paginationObj))
            }

            return res
        } catch (err) {
            if (!err.response) {
                throw err
            }
            return rejectWithValue(err.response.data)
        }
    }
)
//
export const ContactOne = createAsyncThunk('Contact/one', async (data, { rejectWithValue }) => {
    try {
        const res = await getContact(data)
        return res
    } catch (err) {
        if (!err.response) {
            throw err
        }
        return rejectWithValue(err.response.data)
    }
})
//
export const CreateContact = createAsyncThunk(
    'Contact/create',
    async (data, { rejectWithValue }) => {
        console.log('check values-->', data)
        try {
            const res = await createContact(data)
            return res
        } catch (err) {
            if (!err.response) {
                throw err
            }
            return rejectWithValue(err.response.data)
        }
    }
)
//
export const UpdateContact = createAsyncThunk(
    'Contact/update',
    async (data, { rejectWithValue }) => {
        try {
            const { id } = data
            console.log('update id', id)
            const res = await updateContact(id, data)
            return res
        } catch (err) {
            if (!err.response) {
                throw err
            }
            return rejectWithValue(err.response.data)
        }
    }
)
//
export const DeleteContact = createAsyncThunk(
    'Contact/delete',
    async (data, { rejectWithValue }) => {
        console.log('deleteCont', data)
        try {
            const res = await deleteContact(data)
            return res
        } catch (err) {
            if (!err.response) {
                throw err
            }
            return rejectWithValue(err.response.data)
        }
    }
)
//
export const PostList = createAsyncThunk(
    'Post/list',
    async (data, { rejectWithValue, dispatch }) => {
        try {
            // const res = await getContacts(data);
            const res = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                method: 'GET',
                data,
                params: data
            })
            console.log('posts--data-->', res.data.length)

            if (data._limit) {
                // Pagination Section
                const limit = data._limit || 10
                const TotalPage = Math.ceil(res.totalRecords / limit) || 1
                const paginationObj = {
                    page: data._page,
                    totalPage: TotalPage,
                    totalRecords: res?.data?.length
                }
                dispatch(paginationData(paginationObj))
            }

            return res
        } catch (err) {
            if (!err.response) {
                throw err
            }
            return rejectWithValue(err.response.data)
        }
    }
)
//
