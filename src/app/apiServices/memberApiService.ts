
import { serverApi } from "../../lib/config";
import axios from "axios";
import assert from "assert";
import { Definer } from "../../lib/Definer";
import { Member } from "../../types/user";
import { stringify } from "querystring";

class MemberApiService {
  private  readonly path: string;

    constructor() {
        this.path = serverApi;
    }

    public async loginRequest(login_data: any) {
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

    public async signupRequest(signup_data: any) {
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
          console.log(`ERROR ::: loginRequest ${err.message}`);
          throw err;

        }
    }

}

export default MemberApiService; 