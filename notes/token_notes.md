📝 Learning Notes: Secure Token Orchestration (HMAC Strategy)

1. The Core Architecture: Data.Signature

Your implementation follows the HMAC (Hash-based Message Authentication Code) pattern. A secure token consists of two distinct parts separated by a delimiter (the dot .).

- Part 1: The Payload (Data):
  - Format: base64url encoded JSON.

  - Visibility: Public. Anyone can decode this part. It is not encrypted, only encoded for URL compatibility.

- Part 2: The Signature (The Lock):
  - Purpose: Proves the data hasn't been tampered with.

  - Visibility: Secure. Only the server with the SECRET can verify or create this.

2. Why the Signature is the "Real" Protection

The signature prevents Manipulation and Guessing (IDOR). If a user changes the orderId in Part 1 from 101 to 102, the signature in Part 2 becomes invalid. Since the user doesn't know the SECRET, they cannot generate a new valid signature for ID 102.

---

3. Code Implementation

The Encoder (Generating the Link)

This creates the "random looking" string for your email.

    import crypto from 'crypto';

    export function encodeOrderToken(payload: { orderId: string }): string {
      const secret = process.env.TOKEN_SECRET;
      const timestamp = Date.now(); // Essential for expiration checks

      // 1. Prepare the data
      const data = JSON.stringify({ orderId: payload.orderId, timestamp });

      // 2. Create the Signature (The Lock)
      const hmac = crypto.createHmac('sha256', secret);
      hmac.update(data);
      const signature = hmac.digest('hex');

      // 3. Combine into a URL-safe string
      // Format: [Base64Data].[HexSignature]
      return Buffer.from(data).toString('base64url') + '.' + signature;
    }

The Decoder (Verifying on the Server)

This runs when the user clicks the link and the feedback page loads.

    export function decodeOrderToken(token: string) {
      const secret = process.env.TOKEN_SECRET;
      const [encodedData, signature] = token.split('.');

      // 1. Decode Part 1 to get the raw data
      const data = Buffer.from(encodedData, 'base64url').toString('utf-8');

      // 2. Re-calculate the signature using OUR secret
      const hmac = crypto.createHmac('sha256', secret);
      hmac.update(data);
      const expectedSignature = hmac.digest('hex');

      // 3. Compare. If they don't match, the user tampered with the URL.
      if (signature !== expectedSignature) {
        throw new Error('Invalid token signature - tampering detected');
      }

      const payload = JSON.parse(data);

      // 4. Security Logic: Expiration check (14 days)
      const fourteenDays = 14 * 24 * 60 * 60 * 1000;
      if (Date.now() - payload.timestamp > fourteenDays) {
        throw new Error('Token has expired');
      }

      return payload; // Now safe to use payload.orderId for DB queries
    }

---

4. Summary for Backend Mastery

- Integrity vs. Privacy: Your logic focuses on Integrity (did this change?). You aren't hiding the orderId (Privacy), you are ensuring that the user is "locked" into that specific ID.

- Base64url: Essential for URLs. Standard Base64 uses + and /, which browsers interpret as part of the path or query, breaking the link. base64url replaces them with - and \_.

- The "Secret" Rule: Never include the SECRET in the token. The SECRET lives only on your server environment variables.

- The Payload: Always include a timestamp. A signed token without an expiration date is a permanent skeleton key, which is a security risk.
