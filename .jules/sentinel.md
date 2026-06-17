## 2024-06-17 - Secure Token Comparison in Admin Views
**Vulnerability:** Timing attack vulnerability due to comparing a secret control token with the standard string equality operator `==`.
**Learning:** Python's standard string comparison fails early and takes a variable amount of time depending on the matched prefix, allowing an attacker to deduce the secret string by measuring response times.
**Prevention:** Always use a constant-time comparison function, such as `django.utils.crypto.constant_time_compare` (or `hmac.compare_digest`), when validating tokens, hashes, passwords, or any secrets against user input.
