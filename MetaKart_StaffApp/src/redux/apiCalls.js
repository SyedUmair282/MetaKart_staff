import axios from 'axios';

import { loginStart, loginSuccess, loginFailure } from './LoginRedux';

export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try {
        
        const res = await axios.post("http://192.168.1.10:5000/login", {email:user.email,password:user.password});
        // console.log(res,"New data")
        dispatch(loginSuccess(res.data));
        console.log("Data==>", res.data);
        user.setChange(false)
    } catch (error) {
        dispatch(loginFailure(true));
        console.log("No data",error);
    }
}


