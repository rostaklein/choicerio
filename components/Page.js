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
          const userHandling = () => new Promise(resolve => {
              console.log("User handling going on.");
              let token;
              if (isServer){
                token = req.headers.cookie && cookie.parse(req.headers.cookie).token;
              }else{
                token = Cookies.get("token") || ""
              }
              // let user;
              if(token){
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
            if(pathname=="/form" && query.id.length>0){
              console.log("Loading form data!");
              get("/form/byurl/"+query.id).then(res=>{
                store.dispatch(setFormData(res));
                resolve("Form data loaded.");
              })
            }else{
              resolve("No form id provided.");
            };
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