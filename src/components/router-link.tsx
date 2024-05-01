import { forwardRef } from 'react';
import type { LinkProps } from 'react-router-dom';
import { Link } from 'react-router-dom';

interface RouterLinkProps extends Omit<LinkProps, 'to'> {
  href: string;
}


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const RouterLink = forwardRef((props: RouterLinkProps, ref: any) => {
  const { href, ...other } = props;

  return (
    <Link
      ref={ref}
      to={href}
      {...other}
    />
  );
});
