export type ContactKind = "email" | "github" | "website";

export interface Contact {
  kind: ContactKind;
  label: string;
  href: string;
}
