export interface HeadingType {
  title: string;
  description?: string;
}

export const AdminHeading = (props: HeadingType) => {
  const { title, description } = props;
  return (
    <div className="space-y-2">
      <h1 className="text-2xl leading-7 font-semibold text-primary">{title}</h1>
      <p className="text-sm leading-4 font-normal text-Gray-6">{description}</p>
    </div>
  );
};
