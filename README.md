# locale-agent-manager

This extension lets you set site rules.
One rule can set locale values and user-agent values.

## User flow

1. Open the popup.
2. See rules for the current site.
3. Click plus to add a rule.
4. Click Edit to change a rule.
5. Inactive rules can be shown with the toggle.
6. Save or remove the rule in the editor.
7. See all rules in the gray section at the bottom.

## Origin and license notes

This project idea uses these references:
- https://github.com/locale-switcher/locale-switcher
- https://github.com/ray-lothian/UserAgent-Switcher/

Code in this repository is new code.
Do not copy code from reference projects unless the license terms allow the copy.
If you copy code in future work, keep the required notices.

## Dev setup

1. Install Node.js 20 or newer.
2. Run `npm install`.
3. Run `npm run dev`.

## Test

Run `npm run check`.
Run `npm test`.

## Build

Run `npm run build`.
Build output is in `dist/`.

## Deploy

1. Run `npm run build`.
2. Zip all files in `dist/`.
3. Upload the zip to your browser add-on store.
