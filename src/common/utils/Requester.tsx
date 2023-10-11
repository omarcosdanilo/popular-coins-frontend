import axios from "axios";
import { ICoin } from "../../interfaces/ICoin";

abstract class Requester {
  static async getCoins(): Promise<ICoin[]> {
    const url = 'http://127.0.0.1:5000/coins';

   try {
     const response = axios.get(url).then(response => response.data);
     return response;
   } catch (error) {
    throw new Error('Houve um problema');
   }
   
  }

  static async getCoinsOrderedByScore(): Promise<ICoin[]> {
    const url = 'http://127.0.0.1:5000/coins/order'

    try {
      const response = axios.get(url).then(response => response.data);
      return response;
    } catch (error) {
      throw new Error("Houve um problema");
      
    }
  }
}

export default Requester