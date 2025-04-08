import {
  ReactNode, ElementType, ForwardRefExoticComponent, RefAttributes,
} from 'react';
import { Alert as BaseAlert } from 'react-bootstrap';
import { IconProps } from '../Icon';
import { ButtonProps } from '../Button';

export const ALERT_CLOSE_LABEL_TEXT: string;

export interface AlertProps extends Omit<BaseAlert.AlertProps, 'children'> {
  className?: string;
  bsPrefix?: string;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'dark' | 'light';
  children?: ReactNode;
  icon?: React.ComponentType<IconProps>;
  show?: boolean;
  dismissible?: boolean;
  onClose?: () => void;
  actions?: React.ReactElement<ButtonProps>[];
  stacked?: boolean;
  closeLabel?: string | ReactNode;
}

export interface AlertHeadingProps {
  as?: ElementType;
  bsPrefix?: string;
  children?: ReactNode;
}

export interface AlertLinkProps {
  as?: ElementType;
  bsPrefix?: string;
  children?: ReactNode;
  href?: string;
}

export interface AlertComponent extends ForwardRefExoticComponent<AlertProps & RefAttributes<HTMLDivElement>> {
  Heading: React.FC<AlertHeadingProps>;
  Link: React.FC<AlertLinkProps>;
}

declare const Alert: AlertComponent;

export default Alert;
