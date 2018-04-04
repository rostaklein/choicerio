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
    .then(r => r.json().then(json => ({ok: r.ok, status: r.status, data: json})))
    .then(r=> r.status!==200 ? reject(r.data) : resolve(r.data))
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
    .then(r => r.json().then(json => ({ok: r.ok, status: r.status, data: json})))
    .then(r=> r.status!==200 ? reject(r.data) : resolve(r.data))
})

export const remove = (path, token) => new Promise((resolve, reject) => {
    fetch(apiUrl+path, {
        method: "DELETE",
        headers: {
        'x-access-token': Cookies.get('token') || token || ""
        }
    })
    .then(r => r.json().then(json => ({ok: r.ok, status: r.status, data: json})))
    .then(r=> r.status!==200 ? reject(r.data) : resolve(r.data))
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