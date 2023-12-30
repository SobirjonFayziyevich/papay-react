
import { serverApi } from "../../lib/config";
import axios from "axios";
import assert from "assert";
import { Definer } from "../../lib/Definer";
import { Member } from "../../types/user";
import { stringify } from "querystring";
import { MemberLiken } from "../../types/others";

class MemberApiService {
  private  readonly path: string;

    constructor() {
        this.path = serverApi;
    }
    
    public async loginRequest(login_data: any): Promise<Member>  {
        try {
           const result = await axios.post(this.path+"/login", login_data, {
            withCredentials: true,
        });
        console.log("state:", result.data.state);
        assert.ok(result?.data, Definer.general_err1);  //resultning datasi mavjudmi.
        assert.ok(result?.data?.state != 'fail', result?.data?.message);  //statsi fail bulganmi yuqmi tekshiramiz.

        const member: Member = result.data.data; //yuqoriidai xatoliklardan utsa qiymatni Memberga tenglashtiraman  
        localStorage.setItem("member_data", JSON.stringify(member)); //locaStoregdan memberdatani hosil qilayopman, malumotni saqlashim un.
        return member;
        } catch (err: any) {
          console.log(`ERROR ::: loginRequest ${err.message}`);
          throw err;

        }
    }

    public async signupRequest(signup_data: any): Promise<Member> {
        try {
           const result = await axios.post(this.path+"/signup", signup_data, {
            withCredentials: true,
        });
        console.log("state:", result.data.state);
        assert.ok(result?.data, Definer.general_err1);  //resultning datasi mavjudmi.
        assert.ok(result?.data?.state != 'fail', result?.data?.message);  //statsi fail bulganmi yuqmi tekshiramiz.

        const member: Member = result.data.data; //yuqoriidai xatoliklardan utsa qiymatni Memberga tenglashtiraman  
        localStorage.setItem("member_data", JSON.stringify(member)); //locaStoregdan memberdatani hosil qilayopman, malumotni saqlashim un.
        return member;
        } catch (err: any) {
          console.log(`ERROR ::: signupRequest ${err.message}`);
          throw err;

        }
    }

    public async logOutRequest() {
      try {
        const result = await axios.get(this.path + "/logout", {
          withCredentials: true, //withCredentialsni true qilishimiz sababi cookielarni oldi berdisi bn bog'liqdir.
        });
         assert.ok(result?.data, Definer.general_err1); //data mavjud bulsa, bulmasa general_error bergin.
         assert.ok(result?.data?.state != 'fail', result?.data?.message); //state teng bulmasa failga, xatolik bbulsa, datani messagedan olib bersin.

         const logout_result = result.data.state;
         return logout_result == 'success';

      } catch (err: any) {
        console.log(`ERROR ::: logOutRequest ${err.message}`);
        throw err;

      }
  }

  async memberLikeTarget(data: any): Promise<MemberLiken> {
    try {
        const result = await axios.post(this.path + "/member-liken", data, {
            withCredentials: true,
        });
        assert.ok(result?.data, Definer.general_err1);
        assert.ok(result?.data?.state != "fail", result?.data?.message);

        console.log("state:", result.data.data);
        const like_result: MemberLiken = result.data.data;

        return like_result;
    } catch (err: any) {
        console.log(`ERROR ::: memberLikeTarget ${err.message}`);
        throw err;
    }
};

}

export default MemberApiService; 