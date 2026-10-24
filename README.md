# Team Notes entry link

This repository hosts a small static entry page and public connection metadata.
No board notes, invitation keys, credentials, or private database are stored here.

The `main` branch contains the entry page. The `live` branch contains only
`current.json`, which points to the current HTTPS connection for the private
board. Access to notes remains controlled by the board's invitations.

The page preserves an invitation's URL fragment locally while forwarding to
the board. The fragment is not sent in HTTP requests to GitHub.
