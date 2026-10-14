interface Props {
  title: string;
  description: string;
}

const PageHeader = ({ title, description }: Props) => {
  return (
    <header className="flex flex-col gap-2 text-center wrap-anywhere sm:text-left">
      <h1 className="bg-linear-to-r from-gi-primary via-gi-secondary to-gi-blue bg-clip-text font-extrabold text-4xl text-transparent sm:text-5xl">
        {title}
      </h1>
      <p className="text-gi-dark-gray text-lg">{description}</p>
    </header>
  );
};

export default PageHeader;
