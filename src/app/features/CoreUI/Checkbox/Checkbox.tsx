import React, { FC, forwardRef, Ref, useState, useEffect, useCallback } from 'react';
import classNames from 'classnames';

import styles from './Checkbox.module.scss';
import AlertCircleIcon from '../Icons/AlertCircleIcon';
import Label from '../Label/Label';

interface Props {
  /**
   * Identifier for form submit
   */
  name?: string;

  /**
   * Label to be displayed alongside with checkbox
   */
  label: string;

  /**
   * Default value of checkbox, does not make the input controlled
   */
  defaultValue?: boolean;

  /**
   * Label to be displayed alongside with checkbox
   */
  className?: string;

  /**
  * tab index
  */
  tabIndex?: number;

  /**
   * Read only mode. Default: false
   */
  disabled?: boolean;

  /**
   * Register callback for change event
   */
  onChange?: (newChecked: boolean) => void;

  /**
  * Displays error msg underneath the input field
  */
  error?: string;

  /**
   * React ref passtrough to input node
   */
  ref?: Ref<HTMLInputElement>;

  /**
   * Optional value of checkbox
   */
  value?: boolean;

}

const Checkbox: FC<Props> = forwardRef((props, ref) => {
  const { label, defaultValue, value, className, disabled, error, onChange, tabIndex, ...otherProps } = props;

  const [isChecked, setChecked] = useState(!!defaultValue);


  useEffect(() => {
    setChecked(value !== undefined ? value : !!defaultValue);
  }, [defaultValue, value]);

  const toggle = useCallback(
    () => {
      const newValue = !isChecked;
      setChecked(newValue);

      if (onChange) {
        onChange(newValue);
      }
    },
    [isChecked, onChange, value],
  );

  const errorLabel = error && (
    <div className={styles.errorLabel}>
      {error}
      <AlertCircleIcon />
    </div>
  );

  return (
    <Label
      title={label || ''}
      tabIndex={tabIndex}
      disabled={disabled}
      className={classNames(styles.label, className)}
      position='right'
    >
      <input
        type='checkbox'
        ref={ref}
        checked={isChecked}
        disabled={disabled}
        onChange={toggle}
        {...otherProps}
      />
      {errorLabel}
    </Label>
  );
});

export default Checkbox;
