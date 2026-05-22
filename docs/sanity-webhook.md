# Sanity Webhook Setup

Use this after deploying the site.

## Environment

Set the same secret in your deployment environment:

```env
SANITY_REVALIDATE_SECRET=replace-with-a-long-random-secret
```

## Sanity Manage

Create a webhook in Sanity Manage:

- URL: `https://YOUR_DOMAIN.com/api/revalidate`
- Method: `POST`
- Dataset: `thaievcars`
- Trigger on: Create, Update, Delete
- Projection/body:

```json
{
  "_type": _type,
  "_id": _id,
  "slug": slug.current
}
```

- Header:

```txt
x-revalidate-secret: your-secret-here
```

## Local Test

```bash
curl -X POST http://localhost:3000/api/revalidate \
  -H 'content-type: application/json' \
  -H 'x-revalidate-secret: thaievcars-local-revalidate-secret' \
  -d '{"_type":"carModel"}'
```
