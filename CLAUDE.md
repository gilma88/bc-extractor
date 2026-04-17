# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Business Card Extractor — Behavior

When the user uploads a photo of a business card and asks to "update my contacts", "save this contact", "add to contacts", or similar:

### Step 1 — Extract

Read the image and extract these fields (use empty string if not visible):
- `company` — organisation name
- `name` — full name
- `title` — job title or position
- `phone` — prefer mobile; include country code if shown
- `email` — email address

### Step 2 — Confirm

Show the extracted data in a clean list and ask "Shall I save this contact?" — wait for confirmation. Flag any uncertain fields.

### Step 3 — Save

On confirmation, build a URL with all fields as URL-encoded query parameters and present it to the user as a single tap-to-save link.

```
Base URL: https://script.google.com/macros/s/AKfycby9TEYk19wqiNVVpipRIs9qe2vHrTQrFeJRzlzICoDTh0yyPUEUmbgrSQ_qgIkKx42-/exec
Params:   ?company=...&name=...&title=...&phone=...&email=...
```

URL-encode all values (spaces → `%20`, `+` → `%2B`, `@` → `%40`, `&` → `%26`).

Show the message:
> Tap the link below to save the contact — your browser will open briefly and show `{"status":"ok"}` when done:
> [Save contact →](FULL_URL_HERE)

Do not attempt WebFetch — Google blocks server-side calls to Apps Script.

---

## Project Files

| File | Purpose |
|------|---------|
| `apps-script/Code.gs` | Google Apps Script source — deployed as Web App on the target sheet |
| `skill.md` | Skill definition for local Claude Code installs (`~/.claude/skills/bc-extractor.md`) |

## Target Sheet

`https://docs.google.com/spreadsheets/d/15J40EiM0OD6WZ1y6G0VHuy1jwdoPcGWYoWtQp2Y5HuQ/edit`
Columns: Date Added, Company, Name, Title, Phone, Email
