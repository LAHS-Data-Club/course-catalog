import { Router } from "express";
import * as client from "openid-client";
import { asyncHandler } from "../util/utils";
import { createUser } from "../db/queries/user";
import { getUserById } from "../db/queries/queries";
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
      redirect_uri: process.env.AUTH_REDIRECT_URI!,
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
    const user = await createUser(userInfo);
    req.session.userId = user.id;

    delete req.session.code_verifier; 
    delete req.session.state;

    res.redirect(req.session.redirect ?? process.env.REACT_APP_URL ?? "http://localhost:5173/");
  })
);

authRouter.get( 
  "/session",
  isAuthenticated,
  asyncHandler(async (req, res) => { 
    getUserById(req.session.userId!).then((user) => res.json(user));
  })
);

// TODO: fix the below TODO:
authRouter.get(
  "/logout",
  asyncHandler(async (req, res) => { 
    // ohhh ok
    const logoutUrl = client.buildEndSessionUrl(config, {
      post_logout_redirect_uri: process.env.LOGOUT_REDIRECT_URI!,
    });
    res.redirect(logoutUrl.href);
  })
);

authRouter.get(
  "/logout/callback",
  asyncHandler(async (req, res) => { 
    req.session.destroy(() => {
      // TODO: session is destroyed by here
      res.redirect(req.session.redirect ?? process.env.REACT_APP_URL ?? "http://localhost:5173/");
    });
  })
);
