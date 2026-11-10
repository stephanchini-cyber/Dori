/** Proposed persistence boundaries. Demo fixtures must never be used for authorization. */
export type MembershipStatus = "invited" | "active" | "suspended";
export type ModerationStatus = "pending" | "approved" | "rejected";
export interface MemberProfile {
  id: string;
  displayName: string;
  biography: string;
  membership: MembershipStatus;
}
export interface PrivatePublication {
  id: string;
  authorId: string;
  storagePath: string;
  species: string | null;
  category: string;
  description: string;
  moderation: ModerationStatus;
  publicConsentAt: string | null;
  publicSelectionAt: string | null;
}
export interface Invitation {
  id: string;
  tokenHash: string;
  expiresAt: string;
  usedAt: string | null;
}
