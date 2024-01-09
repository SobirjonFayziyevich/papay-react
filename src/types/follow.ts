import { StringDecoder } from "string_decoder";
import { Member } from "./user";

export interface MeFollowed {
    mb_id: string;
    like_ref_id: string;
    my_following: boolean;
}

export interface Follower {
    _id: string;
    follow_id: string;
    subscriber_id: string;
    createdAt: Date;
    updatedAt: Date;
    subscriber_member_data: Member;
    me_followed: MeFollowed[] | null;
}

export interface Following {
    _id: string;
    follow_id: string;
    subscriber_id: string;
    createdAt: Date;
    updatedAt: Date;
    follow_member_data: Member;
}
// buyerdagi FollowSearchObj followApiService.tsga data sifatida pass qilinadi.
export interface FollowSearchObj { // bu follow emas bu interface.
    page: number;
    limit: number;
    mb_id: string;

}

