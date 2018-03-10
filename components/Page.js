import React from 'react';
import withRedux from 'next-redux-wrapper';
import Cookies from 'js-cookie'
import cookie from "cookie"

import { initStore } from "../store/index"
import { setActiveUser } from "../store/actions"
import { get, getCurrentUser } from "../apiMethods"
import Layout from './Layout';

export default Component => withRedux(initStore, state => ({ state }))(
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
            //console.log("Token", token)
            // let user;
            getCurrentUser(token).then(user=>resolve(user)).catch(err=>resolve(null));
            
          })
      
          return Promise.all([get("/users"), userHandling()]).then(data=>
            {
              store.dispatch(setActiveUser(data[1]))
              return {
                users: data[0]
              };
            }
          ) 
    }
    render() {
      return (
        <Layout {...this.props}>
          <Component {...this.props} />
        </Layout>
      );
    }
  }
);