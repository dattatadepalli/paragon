import React, { createContext } from 'react';
import PropTypes from 'prop-types';

type Orientation = 'horizontal' | 'vertical';
type Variant = 'light' | 'dark' | 'muted';

interface CardContextProviderProps {
  /** Specifies which orientation to use. */
  orientation: Orientation;
  /** Specifies loading state. */
  isLoading: boolean;
  /** Specifies content of the component. */
  children: React.ReactNode;
  /** Specifies `Card` style variant */
  variant: Variant;
}

const CardContext = createContext({
  orientation: 'vertical' as Orientation,
  isLoading: false,
  variant: 'light' as Variant,
});

function CardContextProvider({
  orientation,
  children,
  isLoading,
  variant,
}: CardContextProviderProps) {
  return (
    <CardContext.Provider value={{ orientation, isLoading, variant }}>
      {children}
    </CardContext.Provider>
  );
}

CardContextProvider.propTypes = {
  /** Specifies which orientation to use. */
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  /** Specifies loading state. */
  isLoading: PropTypes.bool,
  /** Specifies content of the component. */
  children: PropTypes.node,
  /** Specifies `Card` style variant */
  variant: PropTypes.oneOf(['light', 'dark', 'muted']),
};

CardContextProvider.defaultProps = {
  orientation: 'vertical',
  isLoading: false,
  children: null,
  variant: 'light',
};

export { CardContextProvider };
export default CardContext;
