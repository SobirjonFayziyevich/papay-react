

export interface SearchObj {
    page: number;
    limit: number;
    order: string;
}
export interface ProductSearchObj {
    page: number;
    limit: number;
    order: string;
    restaurant_mb_id?: string; 
   product_collection?: string;
}

export interface MemberLiken {
    like_group: string,
    like_status: number,
    like_ref_id: string
}
export interface CartItem {
    _id: string,
    quantity: number,
    name: string,
    price: number,
    image: string,
}


export interface ChatMsg {
    msg: string;
    mb_id: number;
    mb_nick: string;
    mb_image: number;
  }
  
  export interface ChatGreetMsg {
    text: string; //faqat text mavjud
  }
  
  export interface ChatInfoMsg {
    total: number;
  }