import React from "react";
// Global Store by Redux
import { Provider } from 'react-redux';
import store from '../store';

const Root = (props: any) => {

    const { children, ...restProps } = props;

    return (
        <>
            <Provider store={store}>
                {children}
            </Provider>
        </>
    );
};



export default Root;