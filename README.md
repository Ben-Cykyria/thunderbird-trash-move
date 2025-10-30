# Thunderbird Move Trash
Thunderbird add-on to collect messages from all junk and trash folders and move them to the local trash folder.
This is a simple alternative to XPunge/Multi-Xpunge for Thunderbird versions 140+.

This addon doesn't have proper error handling yet, use at your own risk!

# Move Trash and Junk to Local Trash

Moves all messages from Trash and Junk folders in all accounts except the local account to the local account’s trash folder.
Ideal for centralizing trash cleanup with a single action.

# Features
- Collects messages from Trash and Junk folders of all non-local accounts.
- Moves all found messages into the local trash folder.
- Single-click toolbar button.
- Internationalization support (German and English included).
- Compatible with current Thunderbird MailExtension APIs using folder and message IDs.

# Requirements
- Thunderbird ESR 140.x or newer with MailExtension support.
- Write permissions to the local profile (usually granted by default).

# Installation
Download latest release as Zip and install via Add-ons Manager.

# Usage
After installation, add the toolbar button if not shown automatically.
Click the button:
- Scans all accounts except the local one.
- Recursively finds Trash and Junk folders.
- Moves all messages from those folders to the local trash folder.
- Progress and logs are visible in the developer console.

# Permissions
accountsRead: List accounts and folders.
messagesRead: Read message metadata and lists.
messagesModify: Modify message metadata.
messagesMove: Move messages between folders.
mailTabs: Access mail-specific tabs and context.

These permissions are required to scan folders and move messages to the local trash.

# Internationalization (i18n)
Supported languages:
- German: _locales/de/messages.json
- English: _locales/en/messages.json
Additional languages can be added by providing more _locales/<locale>/messages.json files.

# Known Limitations
Final deletion (expunge) not done automatically; messages are only moved to local trash. Users can enable Thunderbird’s automatic trash empty-on-exit.
Process may take time with very large trash folders.
Local account detection relies on acc.type === "none"; adjust if you have custom setups.

# Security and Privacy
No data sent to external servers.
All operations occur locally within Thunderbird profile.
Add-on only accesses metadata and message content needed to move emails.

# Support
Open issues and feature requests as repository tickets.
Provide Thunderbird and add-on version plus relevant console logs when reporting bugs.

# License
MIT License.