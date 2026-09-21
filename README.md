# MAFAKA

**Live prototype:** https://mafaka-livid.vercel.app

A consent architecture prototype for sensitive support cases. In Yoruba,
*MAFAKA* means a place of refuge.

> **A case is not an access permission.**

When someone asks for help, the system should not assume that everyone
involved needs access to everything. Information can remain protected until
someone asks for it, explains why they need it, and the person decides
whether to share it.

## The problem

People in vulnerable situations often stay silent because asking for help
requires surrendering information they cannot afford to lose. A person
reporting domestic violence from a shared phone, a worker reporting
harassment to an employer they don't trust — both face the same question:
*if I report this, who sees my information, and what happens to it after?*

## What the prototype demonstrates

Private intake → routing → protected identity → responder request →
stated purpose → user decision → granular permission → revocation →
visible consent history

- Start a case without giving your name, phone number, or email.
- The responder sees category, region, and incident summary — not identity.
- When they need a specific field, they must request it and state why.
- The survivor decides. Access is per field, expires in 24 hours, and
  can be revoked at any time.
- Every request, decision, and revocation is recorded in a plain-language
  timeline.