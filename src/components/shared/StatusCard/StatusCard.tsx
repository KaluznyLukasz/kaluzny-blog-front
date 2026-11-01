import type { ReactNode } from "react";

interface Props {
  Icon: ReactNode;
  title: string;
  hint: string;
  children?: ReactNode;
}

const StatusCard = ({ Icon, title, hint, children }: Props) => {
  return (
    <div className="flex flex-col items-center gap-4 rounded-4xl border border-gi-ash bg-linear-to-br from-gi-blue-lightest via-background to-background px-6 py-12 text-center shadow-sm sm:py-16">
      <span
        aria-hidden="true"
        className="flex size-16 items-center justify-center rounded-full bg-background text-gi-secondary shadow-sm ring-1 ring-gi-ash [&_svg]:size-8"
      >
        {Icon}
      </span>
      <h1 className="font-extrabold text-3xl text-gi-primary sm:text-4xl">
        {title}
      </h1>
      <p className="text-gi-dark-gray text-lg">{hint}</p>
      {children && (
        <div className="mt-2 flex flex-wrap justify-center gap-3">
          {children}
        </div>
      )}
    </div>
  );
};

export default StatusCard;
