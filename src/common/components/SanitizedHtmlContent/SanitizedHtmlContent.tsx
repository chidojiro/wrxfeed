import clsx from 'clsx';
import DOMpurify from 'dompurify';

export type SanitizedHtmlContentProps = {
  children?: string;
  className?: string;
};

export const SanitizedHtmlContent = ({ children = '', className }: SanitizedHtmlContentProps) => {
  return (
    <p
      className={clsx(`text-sm text-Gray-1`, className)}
      dangerouslySetInnerHTML={{
        __html: DOMpurify.sanitize(children),
      }}
    />
  );
};
