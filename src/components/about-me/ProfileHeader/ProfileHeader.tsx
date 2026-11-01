import { Avatar } from "@gi-org-pl/athena";
import type { ReactNode } from "react";
import type { ProfileFact } from "./ProfileHeader.types";

interface Props {
  name: string;
  role: string;
  photo?: string;
  tagline?: string;
  facts?: ProfileFact[];
  children?: ReactNode;
}

const ProfileHeader = ({
  name,
  role,
  photo,
  tagline,
  facts = [],
  children,
}: Props) => {
  return (
    <header className="flex flex-col items-center gap-6 text-center sm:flex-row sm:gap-10 sm:text-left">
      <div className="shrink-0 rounded-full bg-linear-to-br from-gi-blue via-gi-secondary to-gi-orange p-1.5 shadow-lg">
        <Avatar
          src={photo}
          name={name}
          fallback="initials"
          size="large"
          className="size-32 text-4xl sm:size-40"
        />
      </div>
      <div className="flex min-w-0 max-w-full flex-col items-center gap-5 wrap-anywhere sm:items-start">
        <div className="flex flex-col gap-1">
          <h1 className="bg-linear-to-r from-gi-primary via-gi-secondary to-gi-blue bg-clip-text font-extrabold text-4xl text-transparent sm:text-6xl">
            {name}
          </h1>
          <p className="text-gi-dark-gray text-lg">{role}</p>
        </div>
        {tagline && (
          <p className="max-w-xl text-lg leading-relaxed">{tagline}</p>
        )}
        {facts.length > 0 && (
          <ul className="flex flex-wrap justify-center gap-2 sm:justify-start">
            {facts.map(({ Icon, label }) => (
              <li
                key={label}
                className="inline-flex items-center gap-2 rounded-full bg-gi-ash px-3 py-1 font-medium text-gi-dark-gray text-sm"
              >
                <Icon aria-hidden="true" className="size-4 shrink-0" />
                {label}
              </li>
            ))}
          </ul>
        )}
        {children && (
          <div className="flex flex-wrap justify-center gap-3 sm:justify-start">
            {children}
          </div>
        )}
      </div>
    </header>
  );
};

export default ProfileHeader;
