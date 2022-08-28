// pages/api/auth/[...auth0].js
import { handleAuth } from '@auth0/nextjs-auth0';

console.log('the AUTH0_SECRET env var is set: ', !!process.env.AUTH0_SECRET);

console.log('the AUTH0_ISSUER_BASE_URL env var is set: ', !!process.env.AUTH0_ISSUER_BASE_URL);

export default handleAuth();