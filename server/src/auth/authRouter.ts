import { Router } from "express";
import { oauth2Client, CLASSROOM_SCOPES } from "./authConfig";
import { asyncHandler } from "../util/utils";
import { getCredentials } from "./auth";
import url from "url";
import { createUser, getUser } from '../db/queries/user';
import { config } from "dotenv";
config();

export const authRouter = Router();

authRouter.get( 
  "/google",
  asyncHandler(async (req, res) => {
    const authUrl = oauth2Client.generateAuthUrl({
      access_type: "offline",
      scope: CLASSROOM_SCOPES.join(" "),
      prompt: "consent",
    });
    res.redirect(authUrl);
  })
);


// TODO: stuff below is lowk dubious :pensive:
authRouter.get(
  "/google/callback",
  asyncHandler(async (req, res) => {
    const q = url.parse(req.url, true).query;
    const { tokens } = await oauth2Client.getToken(q.code as string);
    const token = tokens.refresh_token as string;
    res.cookie("refresh_token", token, {
      httpOnly: true,
      secure: true,
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    });

    // TODO: meh i feel like it shoudlnt go here but wtv...
    // TODO: might be a better way without making so many api calls
    const credentials = await getCredentials(token);
    await createUser(credentials);
    res.redirect(process.env.REACT_APP_URL ?? 'http://localhost:5173/');
  })
);


authRouter.get(
  "/google/login",
  asyncHandler(async (req, res) => {
    const { refresh_token } = req.cookies;
    const credentials = await getCredentials(refresh_token);
    res.json(credentials);
  })
);

