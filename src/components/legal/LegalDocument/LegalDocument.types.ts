export interface LegalLink {
  label: string;
  to: string;
  reloadDocument?: boolean;
}

export interface LegalSection {
  title: string;
  paragraphs: string[];
  items?: string[];
  links?: LegalLink[];
}
