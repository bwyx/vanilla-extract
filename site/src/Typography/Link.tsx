import { Link, LinkProps } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import classnames from 'classnames';
import { TextProps, useTextStyles } from './Text';
import * as styles from './Link.css';
import { atoms } from '../system/Box/Box';

interface Props extends LinkProps {
  baseline?: boolean;
  size?: 'standard' | 'small';
  underline?: 'always' | 'hover' | 'never';
  variant?: 'link' | 'button';
  weight?: TextProps['weight'];
  color?: TextProps['color'];
  inline?: boolean;
  highlightOnFocus?: boolean;
}
export default ({
  to,
  baseline = false,
  size = 'standard',
  color = 'link',
  weight = 'regular',
  underline = 'hover',
  highlightOnFocus = true,
  inline = false,
  className,
  ...restProps
}: Props) => {
  const classNames = classnames(
    inline ? undefined : atoms({ display: 'block' }),
    underline === 'hover' ? styles.underlineOnHover : undefined,
    underline === 'never' ? styles.underlineNever : undefined,
    highlightOnFocus ? styles.highlightOnHover : undefined,
    useTextStyles({ size, color, weight, baseline }),
    className,
  );

  if (typeof to === 'string' && /^http/.test(to)) {
    return <a href={to} {...restProps} className={classNames} />;
  }

  if (typeof to === 'string' && to.indexOf('#') > -1) {
    return <HashLink to={to} {...restProps} className={classNames} />;
  }

  return (
    <Link
      onClick={() => window.scrollTo(0, 0)}
      to={to}
      {...restProps}
      className={classNames}
    />
  );
};