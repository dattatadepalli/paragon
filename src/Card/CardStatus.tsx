import React, { useContext } from 'react';
import PropTypes, { Requireable } from 'prop-types';
import classNames from 'classnames';
import Skeleton from 'react-loading-skeleton';
import Icon from '../Icon';
import CardContext from './CardContext';

type Variant = 'primary' | 'success' | 'danger' | 'warning' | 'info';

export interface CardStatusProps {
  /** Specifies the content of the component. */
  children: React.ReactNode;
  /** The class to append to the base element. */
  className?: string;
  /** Icon that will be shown in the top-left corner. */
  icon?: React.ComponentType;
  /** Specifies variant to use. */
  variant?: Variant;
  /** Specifies title for the `Card.Status`. */
  title?: React.ReactNode;
  /** Specifies any optional actions, e.g. button(s). */
  actions?: React.ReactNode;
}

const CardStatus = React.forwardRef<HTMLDivElement, CardStatusProps>(({
  className,
  children,
  variant = 'warning',
  icon,
  title,
  actions,
  ...props
}, ref) => {
  const { isLoading } = useContext(CardContext);

  if (isLoading) {
    return (
      <div
        className={classNames(
          'pgn__card-status',
          className,
        )}
        data-testid="card-status-skeleton"
        ref={ref}
      >
        <Skeleton />
      </div>
    );
  }

  return (
    <div
      className={classNames(
        'pgn__card-status',
        `pgn__card-status__${variant}`,
        className,
      )}
      ref={ref}
      {...props}
    >
      <div className="pgn__card-status__content">
        {icon && <Icon className="pgn__card-status__content-icon" src={icon} />}
        <div className="pgn__card-status__message-content">
          {title && <div className="pgn__card-status__heading">{title}</div>}
          {children}
        </div>
      </div>
      {!!actions && (
        <div className="pgn__card-status__actions">
          {actions}
        </div>
      )}
    </div>
  );
});
CardStatus.displayName = 'CardStatus';

CardStatus.propTypes = {
  /** Specifies the content of the component. */
  children: (PropTypes.node as unknown as Requireable<React.ReactNode>).isRequired,
  /** The class to append to the base element. */
  className: PropTypes.string,
  /** Icon that will be shown in the top-left corner. */
  icon: PropTypes.func,
  /** Specifies variant to use. */
  variant: PropTypes.oneOf([
    'primary',
    'success',
    'danger',
    'warning',
    'info',
  ]),
  /** Specifies title for the `Card.Status`. */
  title: (PropTypes.node as unknown as Requireable<React.ReactNode>),
  /** Specifies any optional actions, e.g. button(s). */
  actions: (PropTypes.node as unknown as Requireable<React.ReactNode>),
};

CardStatus.defaultProps = {
  className: undefined,
  icon: undefined,
  variant: 'warning',
  title: undefined,
  actions: null,
};

export default CardStatus;
