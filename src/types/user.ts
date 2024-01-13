import { MeFollowed } from "./follow";
import { MeLiked } from "./product";

export interface Restaurant {
  _id: string;   
  mb_nick: string;
  mb_phone: string;
  mb_password: string;
  mb_type: string;
  mb_status: string;
  mb_address: string;
  mb_description: string;
  mb_image: string;
  mb_point: number;
  mb_top: string;
  mb_views: number;
  mb_likes: number;
  mb_follow_cnt: number;
  mb_subscriber_cnt: number;
  createdAt: Date;
  me_liked: MeLiked[];    
}

export interface Member {
    _id: string;   
    mb_nick: string;
    mb_phone: string;
    mb_password: string;
    mb_type: string;
    mb_status: string;
    mb_address: string;  // adress bulishi mumkin bulmasligi ham mumkin
    mb_description?: string;
    mb_image: string;
    mb_point: number;
    mb_top: string;
    mb_views: number;
    mb_likes: number;
    mb_follow_cnt: number;
    mb_subscriber_cnt: number;
    createdAt: Date;
    me_liked: MeLiked[];   
    me_followed: MeFollowed[]; // ME followed; 
  }
  
  export interface MemberUpdateData {
    mb_nick?: string | null;
    mb_phone?: string | null;
    mb_address?: string | null;
    mb_description?: string | null;
    mb_image?: string | null;
  }

