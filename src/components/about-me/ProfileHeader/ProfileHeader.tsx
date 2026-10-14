import { Avatar } from "@gi-org-pl/athena";

interface Props {
  name: string;
  role: string;
  photo?: string;
}

const ProfileHeader = ({ name, role, photo }: Props) => {
  return (
    <header className="flex flex-col items-center gap-4 text-center sm:flex-row sm:gap-6 sm:text-left">
      <div className="shrink-0 rounded-full bg-linear-to-br from-gi-blue via-gi-secondary to-gi-orange p-1">
        <Avatar src={photo} name={name} fallback="initials" size="large" />
      </div>
      <div className="flex min-w-0 max-w-full flex-col gap-1 wrap-anywhere">
        <h1 className="bg-linear-to-r from-gi-primary via-gi-secondary to-gi-blue bg-clip-text font-extrabold text-4xl text-transparent sm:text-5xl">
          {name}
        </h1>
        <p className="text-gi-dark-gray text-lg">{role}</p>
      </div>
    </header>
  );
};

export default ProfileHeader;
