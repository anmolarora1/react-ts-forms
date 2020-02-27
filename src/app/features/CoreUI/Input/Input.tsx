import React, { FC, forwardRef, Ref } from 'react';
import classNames from 'classnames';

import styles from './Input.module.scss';

interface Props {
  /**
   * Input value type
   */
  type?: 'text' | 'number' | 'email' | 'password' | 'checkbox';

  /**
   * Identifier for form submit
   */
  name?: string;

  /**
   * Placeholder to show when empty
   */
  placeholder?: string;

  /**
   * Register callback for change event
   */
  onChange?: () => void;

  /**
   * Read only mode. Default: false
   */
  disabled?: boolean;

  /**
   * Read only mode. Default: false
   */
  readOnly?: boolean;

  /**
   * Stretch to max width. Default: false
   */
  fillWidth?: boolean;

  /**
   * Display error state
   */
  error?: boolean;

  /**
   * input className
   */
  className?: string;

  /**
   * Current value of input
   */
  value?: string;

  /**
   * React ref passtrough to input node
   */
  ref?: Ref<HTMLInputElement>;
}

const Input: FC<Props> = forwardRef((props, ref) => {
  const { fillWidth, className, readOnly, error, ...otherProps } = props;

  return (
    <input
      className={classNames(styles.input, className, { [styles.fillWidth]: fillWidth, [styles.error]: error })}
      ref={ref}
      readOnly={readOnly}
      {...otherProps}
    />
  );
});

export default Input;
