import { handleAuth, handleLogin } from "@auth0/nextjs-auth0";
import { baseUrl } from "../../../config/baseURL_config";

export default handleAuth({
  async login(req, res) {
    await handleLogin(req, res, {
      returnTo: `${baseUrl}/profile`,
    });
  },
});
