import axios from 'axios';
import * as Constant from "./Constant"
const ApiUrl = process.env.REACT_APP_API_KEY;



const getLogin = async () => {
    const result = await axios.get(ApiUrl + Constant.CHECK_LOGIN);
    return result.data
}
const getDeptList = async () => {
    const result = await axios.get(ApiUrl + Constant.GET_ALL_DEPT);
    return result.data
}
const addDepartment = async (obj) => {
    try {
        const result = await axios.post(ApiUrl + Constant.ADD_DEPARTMENT,obj);
        return result.data
    } catch (error) {
        alert(error.code)
    }
 
}



export {getLogin,getDeptList,addDepartment}


