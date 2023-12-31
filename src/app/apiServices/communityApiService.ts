import { StringifyOptions } from "querystring";
import { serverApi } from "../../lib/config";
import axios from "axios";
import assert from "assert";
import { Definer } from "../../lib/Definer";
import { BoArticle, SearchArticlesObj, SearchMemberArticlesObj } from "../../types/boArticle";

class CommunityApiService {
    private readonly path: string;

    constructor() {
        this.path = serverApi;
    }

    public async getTargetArticles(data: SearchArticlesObj) {
        try {
            let url = `/community/target?bo_id=${data.bo_id}&page=${data.page}&limit=${data.limit}`; // let bn boshlagnimizda qushimcha mantiq yozamiz 
            if(data.order) url += `&order=${data.order}`;
     
            const result = await axios.get(this.path + url, {
                withCredentials: true,
             });
             assert.ok(result?.data, Definer.general_err1);
             assert.ok(result?.data?.state != 'fail', result?.data?.message);
             console.log("state:", result.data?.state);
     
                   // Articles qaytadi //resultni ichidagi datani olamiz va biz yuborayotgan data kerak buladi. 
             const articles: BoArticle[] = result.data?.data;
             return articles;
            } catch (err: any) {
            console.log(`ERROR ::: getTargetArticles ${err.message}`);
            throw err;


        }
    }

    public async getMemberCommunityArticles(data: SearchMemberArticlesObj) {
        try {
            let url = `/community/articles?mb_id=${data.mb_id}&page=${data.page}&limit=${data.limit}`; // let bn boshlagnimizda qushimcha mantiq yozamiz 

            const result = await axios.get(this.path + url, {
                withCredentials: true,
             });
             
             assert.ok(result?.data, Definer.general_err1);
             assert.ok(result?.data?.state != 'fail', result?.data?.message);
             console.log("state:", result.data?.state);
     
                   // Articles qaytadi //resultni ichidagi datani olamiz va biz yuborayotgan data kerak buladi. 
             const articles: BoArticle[] = result.data?.data;
             return articles;
            } catch (err: any) {
            console.log(`ERROR ::: getMemberCommunityArticles ${err.message}`);
            throw err;
        }
    }

    public async getChosenArticle(art_id: string) {
        try {
            let url = `/community/single-article/`; // let bn boshlagnimizda qushimcha mantiq yozamiz 
            const result = await axios.get(this.path + url, {
                withCredentials: true,
             });
             
             assert.ok(result?.data, Definer.general_err1);
             assert.ok(result?.data?.state != 'fail', result?.data?.message);
             console.log("state:", result.data.state);
     
                   // Articles qaytadi //resultni ichidagi datani olamiz va biz yuborayotgan data kerak buladi. 
             const article: BoArticle = result.data?.data;
             return article;
            } catch (err: any) {
            console.log(`ERROR ::: getChosenArticle ${err.message}`);
            throw err;
        }
    }

}

export default CommunityApiService;