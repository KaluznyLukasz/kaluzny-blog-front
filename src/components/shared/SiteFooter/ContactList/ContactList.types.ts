export type ContactKind =
  | "email"
  | "facebook"
  | "github"
  | "instagram"
  | "linkedin"
  | "website";

export interface Contact {
  kind: ContactKind;
  label: string;
  href: string;
}
