import { PropsWithChildren, ReactNode, useId } from 'react';
import styles from './Card.module.css';

export interface CardProps extends PropsWithChildren {
  title?: string;
  header?: ReactNode;
  footer?: ReactNode;
}

export function Card({ title, header, footer, children }: CardProps) {
  const titleId = useId();
  return (
    <article className={styles.card} aria-labelledby={title ? titleId : undefined}>
      {title ? (
        <h2 id={titleId} className={styles.title}>
          {title}
        </h2>
      ) : null}
      {header ? <div className={styles.header}>{header}</div> : null}
      <div>{children}</div>
      {footer ? <div className={styles.footer}>{footer}</div> : null}
    </article>
  );
}

export default Card;

