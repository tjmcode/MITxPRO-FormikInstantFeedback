// #region  H E A D E R
// <copyright file="index.js" company="MicroCODE Incorporated">Copyright © 2022 MicroCODE, Inc. Troy, MI</copyright><author>Timothy J. McGuire</author>
// #region  P R E A M B L E
// #region  D O C U M E N T A T I O N
/*
 *      Title:    MicroCODE Common REACT Template
 *      Module:   REACT Components (./index.js)
 *      Project:  MicroCODE Common Library
 *      Customer: Internal
 *      Creator:  MicroCODE Incorporated
 *      Date:     April 2022
 *      Author:   Timothy J McGuire
 *
 *      Designed and Coded: 2022 MicroCODE Incorporated
 *
 *      This software and related materials are the property of
 *      MicroCODE Incorporated and contain confidential and proprietary
 *      information. This software and related materials shall not be
 *      duplicated, disclosed to others, or used in any way without the
 *      written of MicroCODE Incorported.
 *
 *
 *      DESCRIPTION:
 *      ------------
 *
 *      This module implements the MicroCODE's Common JavaScript Template.
 *      This file is copied to start all MicroCODE JavaScript code files.
 *
 *
 *      REFERENCES:
 *      -----------
 *
 *      1. MIT xPRO Style Guide
 *         https://student.emeritus.org/courses/3291/files/2554233/download?wrap=1
 *
 *      2. AirBnB JavaScript Style Guide
 *         https://github.com/airbnb/javascript
 *
 *      3. Turing School Style Guide
 *         https://github.com/turingschool-examples/javascript/tree/main/es5
 *
 *      4. MDN Web Docs - JavaScript Classes
 *         https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
 *
 *      5. JSDoc - How to properly document JavaScript Code.
 *         https://
 *
 *      6. MicroCODE JavaScript Style Guide
 *         Local File: MCX-S02 (Internal JS Style Guide).docx
 *         https://github.com/MicroCODEIncorporated/JavaScriptSG
 *
 *
 *      DEMONSTRATION VIDEOS:
 *      --------------------
 *
 *      1. ...
 *
 *
 *
 *      MODIFICATIONS:
 *      --------------
 *
 *  Date:         By-Group:   Rev:     Description:
 *
 *  26-April-2022   TJM-MCODE  {0001}    New module for common reusable REACT Components for web pages.
 *
 *
 */
"use strict";

// #endregion
// #endregion
// #endregion

// #region  J A V A S C R I P T
// #region  F U N C T I O N S

// #region  I M P O R T S

import React from 'react';
import ReactDOM from 'react-dom';
import { useFormik, FormikProvider, Form, useField } from 'formik';
import * as Yup from 'yup';

// #endregion

// #region  C S S: visual styles

import './index.css';

// #endregion

// #region  C O N S T A N T S

// #endregion

// #region  P R I V A T E   F I E L D S

// #endregion

// #region  E N U M E R A T I O N S

// #endregion

// #region  M E T H O D S – P U B L I C

const LoginForm = () =>
{
    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        onSubmit: async (values) =>
        {
            await sleep(500);
            alert(JSON.stringify(values, null, 2));
        },
        validationSchema: Yup.object(
            {
                username: Yup.string()
                    .min(6, 'Must be at least 6 characters')
                    .max(32, 'Must be less than 32 characters')
                    .required('Username is required')
                    .matches(
                        /(@)(.+)$/,
                        'Must be a valid email address.'
                    ),

                password: Yup.string()
                    .min(12, 'Must be at least 12 characters')
                    .max(24, 'Must be less than 24 characters')
                    .required('Password is required')
                    .matches(
                        /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{11,23}$/,
                        'No spaces, 1 lower, 1 upper, 1 number, and 1 special.'
                    ),
            }),
    });

    return (
        <FormikProvider value={ formik }>
            <Form>
                <div>
                    <TextInputLiveFeedback
                        label="Username"
                        id="username"
                        name="username"
                        helpText="Must be a valid email address"
                        type="username"
                    />
                </div>
                <div>
                    <TextInputLiveFeedback
                        label="Password"
                        id="password"
                        name="password"
                        helpText="At least 12 long with: 1 lower, 1 upper, 1 number, and 1 of !@#$%^&*()_+"
                        type="password"
                    />
                </div>
                <div>
                    <button type="submit">Submit</button>
                    <button type="reset">Reset</button>
                </div>
            </Form>
        </FormikProvider>
    );
};

// #endregion

// #region  M E T H O D S – P R I V A T E

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const TextInputLiveFeedback = ({ label, helpText, ...props }) =>
{
    const [field, meta] = useField(props);

    // Show inline feedback if EITHER
    // - the input is focused AND value is longer than 2 characters
    // - or, the has been visited (touched === true)
    const [didFocus, setDidFocus] = React.useState(false);
    const handleFocus = () => setDidFocus(true);
    const showFeedback =
        (!!didFocus && field.value.trim().length > 2) || meta.touched;

    return (
        <div
            className={ `form-control ${ showFeedback ? (meta.error ? 'invalid' : 'valid') : ''
                }` }
        >
            <div className="flex items-center space-between">
                <label htmlFor={ props.id }>{ label }</label>{ ' ' }
                { showFeedback ? (
                    <div
                        id={ `${ props.id }-feedback` }
                        aria-live="polite"
                        className="feedback text-sm"
                    >
                        { meta.error ? meta.error : '✓' }
                    </div>
                ) : null }
            </div>
            <input
                { ...props }
                { ...field }
                aria-describedby={ `${ props.id }-feedback ${ props.id }-help` }
                onFocus={ handleFocus }
            />
            <div className="text-xs" id={ `${ props.id }-help` } tabIndex="-1">
                { helpText }
            </div>
        </div>
    );
};

// #endregion

// #region  M E T H O D - E X P O R T S

// #endregion

// #region  R E A C T - C O M P O N E N T S

/**
 * ReactDOM.render() - no longer supported after REACT v17. v18 and higher use ReactDOM.createRoot.
 *
 */
ReactDOM.render(
    <div className="app">
        <h1 className="text-2xl">MicroCODE User Login</h1>
        <p className="text-md">
            Welcome back, remember your User name is the email address you used to validate your account.
        </p>
        <div className="loginForm">
            <LoginForm />
        </div>
        <p className="text-md mt-1">
            <strong>Note:</strong> if you have any problems please contact <code>customer support</code>.
        </p>
    </div>,
    document.getElementById('root')
);

// #endregion

// #endregion
// #endregion