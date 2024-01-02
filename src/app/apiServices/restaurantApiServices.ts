import axios from "axios";
import assert from "assert";
import { serverApi } from "../../lib/config";
import { Definer } from "../../lib/Definer";
import { Restaurant } from "../../types/user";
import { SearchObj } from "../../types/others";

class RestaurantApiService {
  private readonly path: string;

  constructor() {
      this.path = serverApi;
    }

async getTopRestaurants(): Promise<Restaurant[]>  {

    try{
      const url = "/restaurants?order=top&page=1&limit=4",  // postmandagi getrestaurantni URLi.
        result = await axios.get(this.path + url, 
          { withCredentials: true });
       
          assert.ok(result?.data, Definer.general_err1);
          assert.ok(result?.data.state !== "fail", Definer.general_err1);
          console.log("state:::", result.data.state);

        const top_restaurants: Restaurant[] = result.data.data; //toprestaurantsni type: interface Restaurant bulayopti, 
        // resultni ichidan kelayotgan datani ichidagi data; resultni ichidagi data axios bn keladi, 2chi data backendda hosil qilingan data.
        return top_restaurants;

    }catch(err: any) {

     console.log(`ERROR ::: getTopRestaurants ${err.message}`);
     throw err;
    }
  }


async getRestaurants(data: SearchObj): Promise<Restaurant[]> { //SearchObj interface hosil qildim

  try{
    const url = `/restaurants?order=${data.order}&page=${data.page}&limit=${data.limit}`,  // postmandagi getrestaurantni URLi.
      result = await axios.get(this.path + url, 
        { withCredentials: true });
     
        assert.ok(result?.data, Definer.general_err1);
        assert.ok(result?.data.state !== "fail", Definer.general_err1);
        console.log("state:::", result.data.state);
      const restaurants: Restaurant[] = result.data.data; //toprestaurantsni type: interface Restaurant bulayopti, 
      // resultni ichidan kelayotgan datani ichidagi data; resultni ichidagi data axios bn keladi, 2chi data backendda hosil qilingan data.
      return restaurants;
    } catch (err: any) {
       console.log(`ERROR ::: getRestaurants ${err.message}`);
       throw err;
  }
}

async getChosenRestaurant(id: string) {
  try{
    const url = `/restaurants/${id}`,
       result = await axios.get(this.path + url, { withCredentials: true });
    
       assert.ok(result?.data, Definer.general_err1);
       assert.ok(result?.data.state !== "fail", Definer.general_err1);
      console.log("state:::", result.data.state);
      
      const restaurant: Restaurant[] = result.data.data; //toprestaurantsni type: interface Restaurant bulayopti, 
      // resultni ichidan kelayotgan datani ichidagi data; resultni ichidagi data axios bn keladi, 2chi data backendda hosil qilingan data.
      return restaurant;
    } catch (err: any) {
    console.log(`ERROR ::: getChosenRestaurant ${err.message}`);
    throw err;
  }
}

}

export default RestaurantApiService; 