import React from 'react';
import {Redirect} from 'react-router-dom';
import {FuseUtils} from '@fuse';
import {MailMSConfig} from 'app/main/mail/MailMSConfig';
import {LoginConfig} from 'app/login/LoginConfig';
//import {RegisterConfig} from 'app/main/register/RegisterConfig';

const routeConfigs = [
    MailMSConfig,
    LoginConfig
];

const routes = [
    ...FuseUtils.generateRoutesFromConfigs(routeConfigs),
    {
        path     : '/',
        exact    : true,
        component: () => <Redirect to="/mail"/>
    }
];

export default routes;
