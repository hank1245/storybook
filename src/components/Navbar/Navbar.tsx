import { HTMLAttributes } from 'react';
import styles from './Navbar.module.css';

export interface NavbarItem {
  id: string;
  label: string;
}

export interface NavbarProps extends HTMLAttributes<HTMLElement> {
  items: NavbarItem[];
  currentId?: string;
  onNavigate?: (id: string) => void;
  ariaLabel?: string;
}

export function Navbar({ items, currentId, onNavigate, ariaLabel = 'Navigation', ...rest }: NavbarProps) {
  return (
    <nav className={styles.nav} role="navigation" aria-label={ariaLabel} {...rest}>
      <div className={styles.inner}>
        <div className={styles.brand}>Sandbox</div>
        <ul className={styles.list} role="list">
          {items.map((item) => (
            <li key={item.id}>
              <button
                className={styles.itemBtn}
                aria-current={currentId === item.id ? 'page' : undefined}
                onClick={() => onNavigate?.(item.id)}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;

