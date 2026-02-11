# KUEM Website (Astro)

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Odoo CRM integration

Set the following environment variables for lead forwarding:

- `ODOO_URL` (example: `https://your-odoo-domain.com`)
- `ODOO_DB`
- `ODOO_USERNAME`
- `ODOO_API_KEY`

If these are not set, the forms still return success locally but do not create CRM leads.

## Forms

- `/contact` includes demo and partner forms.
- Partner form is also on `/partner-program`.
- Homepage includes a demo form section.

All forms require explicit GDPR consent before submission.
