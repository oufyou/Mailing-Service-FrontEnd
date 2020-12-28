import axios from 'axios';
import jwtDecode from 'jwt-decode';
import FuseUtils from '@fuse/FuseUtils';
import {BASE_URI} from "../../../constants";

class jwtService extends FuseUtils.EventEmitter {

    init()
    {
        this.setInterceptors();
        this.handleAuthentication();
    }

    setInterceptors = () => {
        axios.interceptors.response.use(response => {
            return response;
        }, err => {
            return new Promise((resolve, reject) => {
               /* if ( err.response.status === 401 && err.response.config && !err.response.config.__isRetryRequest )
                {
                    // if you ever get an unauthorized response, logout the user
                    this.emit('onAutoLogout', 'Invalid access_token');
                    this.setSession(null);
                }*/
                reject(err);
            });
        });
    };

    handleAuthentication = () => {

        let access_token = this.getAccessToken();

        if ( !access_token )
        {
            return;
        }

        if ( this.isAuthTokenValid(access_token) )
        {
            this.setSession(access_token);
            this.emit('onAutoLogin', true);
        }
        else
        {
            this.setSession(null);
            localStorage.removeItem("username");
            localStorage.removeItem("email");
            this.emit('onAutoLogout', 'access_token expired');
        }
    };

    createUser = (data) => {
        return new Promise((resolve, reject) => {
            axios.post(BASE_URI+'/api/auth/register', data)
                .then(response => {
                    if ( response.data.user )
                    {
                        this.setSession(response.data.access_token);
                        resolve(response.data.user);
                    }
                    else
                    {
                        reject(response.data.error);
                    }
                });
        });
    };

    signInWithUsernameAndPassword = (username, password) => {
        return new Promise((resolve, reject) => {
            axios.post(BASE_URI+'/api/auth/', {

                    username:username,
                    password:password

            }).then(response => {
                if ( response.data.username )
                {
                    this.setSession(response.data.accessToken);
                    localStorage.setItem("username", response.data.username);
                    localStorage.setItem("email", response.data.email);

                    resolve(response.data);
                }
                else
                {
                    reject(response.data.error);
                }
            });
        });
    };

    signInWithToken = () => {
        return new Promise((resolve, reject) => {
            axios.get(BASE_URI+'/api/auth/access-token/', {
                    accessToken: this.getAccessToken()
            })
                .then(response => {
                    if ( response.data.username )
                    {
                        this.setSession(response.data.accessToken);
                        resolve(response.data);
                    }
                    else
                    {
                        reject(response.data.error);
                    }
                });
        });
    };

    updateUserData = (user) => {
        return axios.post(BASE_URI+'/api/auth/user/update/', {
            user: user
        });
    };

    setSession = accessToken => {
        if ( accessToken )
        {
            localStorage.setItem('jwt_access_token', accessToken);
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;
        }
        else
        {
            localStorage.removeItem('jwt_access_token');
            localStorage.removeItem("username");
            localStorage.removeItem("email");
            delete axios.defaults.headers.common['Authorization'];
        }
    };

    logout = () => {
        this.setSession(null);
    };

    isAuthTokenValid = accessToken => {
        if ( !accessToken )
        {
            return false;
        }
        const decoded = jwtDecode(accessToken);
        const currentTime = Date.now() / 1000;
        if ( decoded.exp < currentTime )
        {
            console.warn('access token expired');
            return false;
        }
        else
        {
            return true;
        }
    };

    getAccessToken = () => {
        return window.localStorage.getItem('jwt_access_token');
    };
}

const instance = new jwtService();

export default instance;
