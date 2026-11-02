# Security

Please report a security problem through a private GitHub security advisory on this repository, not a public issue.

The `js` handler runs scripts from task payloads. It isolates them in a child process under Node's permission model, but the API itself has no authentication beyond a static header, so run it on a trusted network only.
