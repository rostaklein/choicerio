import React from 'react';
import withRedux from 'next-redux-wrapper';
import Cookies from 'js-cookie'
import cookie from "cookie"

import { initStore } from "../store/index"
import { setActiveUser, setPageTitle, setFormData } from "../store/actions"
import { get, getCurrentUser } from "../apiMethods"
import Layout from './Layout';


export default (Component, reqLogin, title) => withRedux(initStore, state => ({ state }))(
  class extends React.Component {
    static async getInitialProps({ store, isServer, req, pathname, query }) {

          const state = store.getState();

          const userHandling = () => new Promise(resolve => {
              console.log("User handling going on.");
              let token;
              if (isServer){
                token = req.headers.cookie && cookie.parse(req.headers.cookie).token;
              }else{
                token = Cookies.get("token") || ""
              }
              if(token && !state.user){
                getCurrentUser(token).then(user => {
                    store.dispatch(setActiveUser(user));
                    resolve("User set successfuly.")
                  }).catch(err => {
                    resolve("User not found by the token provided.")
                  });
              }else{
                resolve("No token provided.")
              }
          });

          const formHandling = () => new Promise(resolve => {
            console.log("Form handling going on.")
            if(state.form.url == query.id){
                console.log("Form already exists.");
                resolve("Form already set.");
            }else{
                if(pathname=="/form" && query.id.length>0){
                  get("/form/byurl/"+query.id).then(res=>{
                    store.dispatch(setFormData(res));
                    console.log("Geting data for form");
                    resolve("Form data loaded.");
                  })
                }else{
                  resolve("No form id provided.");
                };
            }
          })

          if(title){
            store.dispatch(setPageTitle(title))
          }else(
            store.dispatch(setPageTitle(""))
          )
      
          return Promise.all([
            userHandling(),
            formHandling()
          ]) 
    }
    render() {
      return (
        <Layout {...this.props}>
          {(reqLogin && !this.props.state.user) ?
            <div className="message error centered">
              You need to log in before accessing
              <span style={{marginLeft: 5}}>
              {this.props.state.title ? <b>{this.props.state.title}</b> : "this part of the app"}.
              </span>
            </div>
          :
            <Component {...this.props} />
          }
          
        </Layout>
      );
    }
  }
);