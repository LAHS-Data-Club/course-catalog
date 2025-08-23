import { google } from 'googleapis';
import { config } from 'dotenv';
config();

export const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET, 
  'http://localhost:3000/api/auth/google/callback' // redirect uri
);

export const CLASSROOM_SCOPES = [
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile',
];


