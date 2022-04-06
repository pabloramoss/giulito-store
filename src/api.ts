
import axios from "axios";
import Papa from "papaparse";
import { Product } from "./types";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  list: async () =>{
    return axios.get("https://docs.google.com/spreadsheets/d/e/2PACX-1vQWa2wWjKv8Vn4aAchNaISOK9QgyERmbFebnPYLl0V2CoaPPUlTLEusVTz5uILm1NscvkBGo0CRgRB8/pub?output=csv", {
      responseType: "blob"
    }).then(
      response =>{
        return new Promise<Product[]>((resolve, reject)=>{
          Papa.parse(response.data, {
            header: true,
            complete: results => {
              const products = results.data as Product[]
              return resolve(products.map(product => ({
                ...product,
                price: Number(product.price)
              })));
            },
            error: (error)=> {
              return reject(error.message);
            }
          });
        })
      }
    );
  },
};