import React from 'react';
import withRedux from 'next-redux-wrapper';
import Cookies from 'js-cookie'
import cookie from "cookie"

import { initStore } from "../store/index"
import { setActiveUser } from "../store/actions"
import { get, getCurrentUser } from "../apiMethods"
import Layout from './Layout';

export default (Component, reqLogin) => withRedux(initStore, state => ({ state }))(
  class extends React.Component {
    static async getInitialProps({ store, isServer, req }) {
        const userHandling = () => new Promise((resolve, reject) => {
            //console.log(req.headers);
            let token;
            if (isServer){
              token = req.headers.cookie && cookie.parse(req.headers.cookie).token;
            }else{
              token = Cookies.get("token") || ""
            }
            // let user;
            if(token){
              getCurrentUser(token).then(user=>resolve(user)).catch(err=>resolve(null));
            }else{
              resolve(null)
            }
            
          })
      
          return userHandling().then(data=>
            {
              return store.dispatch(setActiveUser(data))
            }
          ).catch(err=>{
              store.dispatch(setActiveUser(null));
              return 0;
          }) 
    }
    render() {
      return (
        <Layout {...this.props}>
          {(reqLogin && !this.props.state.user) ?
            <div className="message error centered">
              You need to log in before accessing this part of the app.
            </div>
          :
            <Component {...this.props} />
          }
          
        </Layout>
      );
    }
  }
);