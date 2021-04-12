import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import useIsVisible from '../hooks/useIsVisible';

const ModalDialogBody = ({
  as,
  children,
  ...props
}) => {
  const [isScrolledToTop, topSentinelRef] = useIsVisible();
  const [isScrolledToBottom, bottomSentinelRef] = useIsVisible();
  const className = classNames(
    'pgn__modal-body',
    props.className,
    {
      'pgn__modal-body-scroll-top': isScrolledToTop,
      'pgn__modal-body-scroll-bottom': isScrolledToBottom,
    },
  );
  return React.createElement(
    as,
    { ...props, className },
    (
      <>
        <div ref={topSentinelRef} />
        <div className="pgn__modal-body-content">
          {children}
        </div>
        <div ref={bottomSentinelRef} />
      </>
    ),
  );
};

ModalDialogBody.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

ModalDialogBody.defaultProps = {
  as: 'div',
  className: undefined,
};

export default ModalDialogBody;
