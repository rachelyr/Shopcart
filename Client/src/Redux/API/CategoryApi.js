import axios from "axios";

//PUBLIC API

const getAllCategories =  async () =>{
    const {data} = await axios.get('http://localhost:5000/api/categories');
    return data;
}

export {getAllCategories};