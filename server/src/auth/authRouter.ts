import { Router } from "express";
import * as client from "openid-client";
import { asyncHandler } from "../util/utils";
import { createUser, getUserBySub, getUserById } from "../db/queries/user";
import { isAuthenticated } from "../util/utils";

export const authRouter = Router();

const server = new URL('https://accounts.google.com');
const clientId = process.env.CLIENT_ID!;
const clientSecret = process.env.CLIENT_SECRET!;
const config = await client.discovery(server, clientId, clientSecret);

authRouter.get(
  "/login",
  asyncHandler(async (req, res) => {
    const redirect = req.query.redirect as string;
    req.session.redirect = redirect;

    const code_verifier = client.randomPKCECodeVerifier();
    const code_challenge = await client.calculatePKCECodeChallenge(code_verifier);
    const state = client.randomState(); 
    
    const authUrl: URL = client.buildAuthorizationUrl(config, {
      redirect_uri: process.env.REDIRECT_URI!,
      scope: 'openid email profile', 
      code_challenge,
      code_challenge_method: "S256",
      state,
      access_type: 'offline',
      include_granted_scopes: 'true',
    });

    req.session.code_verifier = code_verifier;
    req.session.state = state;

    res.redirect(authUrl.href);
  })
);

authRouter.get(
  "/login/callback",
  asyncHandler(async (req, res) => {
    const currentURL = new URL(`${req.protocol}://${req.get("host")}${req.originalUrl}`);
    const tokens = await client.authorizationCodeGrant(config, currentURL, {
        pkceCodeVerifier: req.session.code_verifier,
        expectedState: req.session.state,
    });
    const userInfo = tokens.claims();
    if (!userInfo) throw new Error('Error authenticating user.');
    
    delete req.session.code_verifier; 
    delete req.session.state;

    // TODO: better structure the below
    // TODO: check if user is already in db, if not, create user
    let user = await getUserBySub(userInfo.sub);
    if (!user) user = await createUser(userInfo); 
    req.session.userId = user.id;

    res.redirect(req.session.redirect ?? process.env.REACT_APP_URL ?? "http://localhost:5173/");
  })
);

// get the active session
authRouter.get( 
  "/session",
  isAuthenticated,
  asyncHandler(async (req, res) => { 
    getUserById(req.session.userId!).then((user) => res.json(user));
  })
);

// TODO: implememt logout
authRouter.get(
  "/logout",
  asyncHandler(async (req, res) => { 
    // TODO:
  })
);
