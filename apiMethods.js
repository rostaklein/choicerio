import { apiUrl } from "./constants";
import Cookies from 'js-cookie';

import fetch from 'isomorphic-fetch'

export const post = (path, body) => new Promise((resolve, reject) => {
    //console.log("POST: "+apiUrl+path);
    fetch(apiUrl+path, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'x-access-token': Cookies.get('token')
        },
        body: JSON.stringify(body)
    })
    .then(data=> data.status!==200 ? reject(data.status) : data.json())
    .then(res=> resolve(res));
})

export const get = (path, token) => new Promise((resolve, reject) => {
    //console.log("GET: "+apiUrl+path);
    fetch(apiUrl+path, {
        method: "GET",
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': Cookies.get('token') || token || ""
        }
    })
    .then(data=> data.status!==200 ? reject(data.status) : data.json())
    .then(res=> resolve(res));
})

export const getCurrentUser = (token) => new Promise((resolve, reject) => {
    //console.log("Getting user by token: "+token)
    get("/auth/me", token)
        .then(user=>
            resolve(user)
        ).catch(err=>{
            reject(err);
            console.log("Couldnt log in ", err);
        })
})