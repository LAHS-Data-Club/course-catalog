import { google, oauth2_v2 } from "googleapis";
import { oauth2Client } from "./authConfig";

export async function getCredentials(
  refresh_token: string
): Promise<oauth2_v2.Schema$Userinfo>  {
  if (!refresh_token) return null;

  oauth2Client.setCredentials({ refresh_token });
  const oauth2 = google.oauth2({
    auth: oauth2Client,
    version: "v2",
  });
  const response = await oauth2.userinfo.get();
  return response.data || null;
}