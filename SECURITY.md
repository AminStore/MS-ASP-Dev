# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in MS-ASP-Dev, please **do not** create a public GitHub issue. Instead, please report it privately to protect users.

### How to Report

**Email**: m.ssaid356@gmail.com

Please include:
- Description of the vulnerability
- Steps to reproduce (if applicable)
- Potential impact
- Any proof of concept or suggested fix

We will:
- Acknowledge receipt of your report within 48 hours
- Investigate and determine the severity
- Work on a fix and release timeline
- Keep you updated on progress

### Supported Versions

| Version | Status |
|---------|--------|
| Latest  | ✅ Supported |
| Older   | ❌ Not supported |

## Security Best Practices

Since this is a **personal portfolio**, not a production application handling sensitive data:

### Frontend Security
- All code is public and open-source
- No sensitive credentials stored in frontend code
- No authentication system for users
- Client-side only (no backend)

### Dependency Management
- Regular dependency updates via `bun update`
- Monitoring for security vulnerabilities
- Keeping Node.js and tooling current

### Deployment Security
- HTTPS enforced via Netlify
- No form data transmission (contact form is client-side only)
- CSP headers configured appropriately

## Security Considerations

### What This Project Does NOT Have
- User authentication
- Database with sensitive data
- Payment processing
- Private information storage
- API keys exposed in frontend

### What This Project DOES Have
- Public portfolio information
- Published resume
- Public contact information
- Open-source code

## Vulnerability Disclosure Timeline

Once we receive a security report:

1. **Day 1**: Acknowledge receipt
2. **Days 1-3**: Initial assessment and reproduction
3. **Days 3-7**: Development and testing of fix
4. **Day 7-14**: Release and public disclosure (coordinated)

## Dependencies Security

We maintain security by:
- Using trusted, well-maintained packages
- Regularly auditing dependencies
- Keeping dependencies up-to-date
- Using tools like `npm audit` or `bun audit`

### How to Check

```bash
bun audit              # Check for vulnerabilities
bun update             # Update packages safely
```

## Responsible Disclosure

We follow responsible disclosure practices:
- We appreciate detailed vulnerability reports
- We credit reporters (unless anonymity requested)
- We give reporters time to patch before disclosure
- We prioritize fixing critical vulnerabilities

## Questions?

For security-related questions (not vulnerability reports), please open an issue or contact via email.

---

Thank you for helping keep MS-ASP-Dev secure! 🔒
