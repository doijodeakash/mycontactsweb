import { get, patch, post, put, del } from "src/helpers/api_helper";
import * as URL from "src/helpers/url_helper";

export const getContact = (id) => get(`${URL.CONTACT_ONE}/${id}`);
export const getContacts = (data) => get(URL.CONTACT_ALL, data);
export const updateContact = (id, data) =>
  put(`${URL.CONTACT_ONE}/${id}`, data);
export const deleteContact = (id) => del(`${URL.CONTACT_ONE}/${id}`);
export const createContact = (data) => post(URL.CONTACT_ALL, data);
