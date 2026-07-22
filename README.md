# locale-agent-manager

This extension stores per-site rules.
A rule can set locale, user-agent, or both.

## Origin and licenses

This project idea combines:
- https://github.com/locale-switcher/locale-switcher
- https://github.com/ray-lothian/UserAgent-Switcher/

Do not copy code from these projects without license checks.
Follow each project license for any reused file.

## Dev setup

1. Install Node.js 20 or newer.
2. Run `npm install`.
3. Run `npm run dev` for local UI work.

## Test

Run `npm test`.

## Build

Run `npm run build`.
The extension files are in `dist/`.

## Deploy

1. Build with `npm run build`.
2. Zip all files in `dist/`.
3. Upload the zip to your browser store.
   - Chrome Web Store: upload as a new item or new version.
   - Firefox Add-ons: upload as a new add-on or new version.
