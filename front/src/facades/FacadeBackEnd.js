import { showError, showSuccess } from './Toast';
import { BACK_END_SERVER } from "../assets/constantes/server"

const axios = require('axios');

export function getRequest(ressource){
    const token = localStorage.getItem('token')
    return axios.get(`${BACK_END_SERVER}/${ressource}`,
    {headers: {'Authorization': 'Bearer ' + token}})
}

export function postRequest(ressource, params = {}){

    const token = localStorage.getItem('token')
    return axios.post(`${BACK_END_SERVER}/${ressource}`,
    {
        data: params,
    },
    {headers: {'Authorization': 'Bearer ' + token}})
}

export function putRequest(ressource, params = {}){

    const token = localStorage.getItem('token')

    return axios.put(`${BACK_END_SERVER}/${ressource}`,
    {
        data: params
    },
    {headers: {'Authorization': 'Bearer ' + token}})
}

export function deleteRequest(ressource, params = {}){

    const token = localStorage.getItem('token')

    return axios.delete(`${BACK_END_SERVER}/${ressource}`,
    {
        headers: {'Authorization': 'Bearer ' + token},
        data: params
    })
}

//Interceptors
axios.interceptors.response.use(function (response) {
    //response = response.data
    if(response?.message) showSuccess(response?.message)
    return response
}, function (error) {
    showError(error?.response?.data?.message)
    //throw err.response.data.message
    return Promise.reject(error?.response?.data?.message);
});