# Ynov mailer prototype

Tests whether Ynov accounts can sign in and send via Microsoft Graph without admin approval.

1. Entra admin center > App registrations > New (multi-tenant, "Accounts in any organizational directory").
   Redirect URI (Web): `<url>/api/auth/callback/azure-ad`. Create a client secret.
2. Copy `.env.example` to `.env.local`, fill it (`NEXTAUTH_SECRET`: `openssl rand -base64 32`).
3. `npm install && npm run dev`, sign in with a Ynov account.
   "Need admin approval" = IT must approve. Otherwise send a test mail to yourself.
