---
name: bc-extractor
description: Extract contact info from a business card photo and save it to the contacts Google Sheet
triggers:
  - update my contacts
  - add to contacts
  - save this contact
  - extract business card
  - add this card
  - new contact
---

When the user uploads a business card image and asks to update/save/add a contact:

## Step 1 — Extract

Read the image carefully and pull out these fields (use an empty string if a field is not visible):

- `company` — organisation name
- `name` — full name of the person
- `title` — job title or position
- `phone` — prefer mobile number; include country code if shown; if multiple numbers, pick the most prominent
- `email` — email address

## Step 2 — Confirm

Show the extracted data to the user in a clean list before saving:

```
Company : <value>
Name    : <value>
Title   : <value>
Phone   : <value>
Email   : <value>
```

Ask: "Shall I save this contact?" — wait for confirmation. If any field looks uncertain, flag it.

## Step 3 — Save

On confirmation, build a GET request URL with URL-encoded query parameters and call it using WebFetch.

Base URL: `https://script.google.com/macros/s/AKfycby9TEYk19wqiNVVpipRIs9qe2vHrTQrFeJRzlzICoDTh0yyPUEUmbgrSQ_qgIkKx42-/exec`

Append these query params (URL-encode each value — spaces → `%20`, `+` → `%2B`, `@` → `%40`, etc.):
- `company`
- `name`
- `title`
- `phone`
- `email`

Example final URL:
```
https://script.google.com/.../exec?company=Acme&name=Jane%20Doe&title=CEO&phone=%2B49%20174%209699362&email=jane%40acme.com
```

Use WebFetch with method GET on that URL.

## Step 4 — Report

If the response contains `"status": "ok"` → confirm to the user that the contact was saved.
If the response contains `"status": "error"` → show the error message and suggest they check the Apps Script deployment.
