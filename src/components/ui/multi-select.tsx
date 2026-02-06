import React from 'react';
import Select, { ActionMeta, MultiValue, StylesConfig } from 'react-select';
import makeAnimated from 'react-select/animated';
import { IOptions } from '@/features/base/types';

const animatedComponents = makeAnimated();

interface AnimatedMultiProps {
  value: MultiValue<IOptions>;
  data: IOptions[];
  onChange: (newValue: MultiValue<IOptions>, actionMeta: ActionMeta<IOptions>) => void;
  disabled?: boolean;
  className?: string;
  placeholder?: string;
  minHeight?: string;
  isSearchable?: boolean;
}

const MultiSelect: React.FC<AnimatedMultiProps> = ({
  value,
  data,
  onChange,
  disabled = false,
  className = '',
  placeholder = 'Select',
  minHeight = '36px',
  isSearchable = true
}) => {
  const customStyles: StylesConfig<IOptions, true> = {
    control: (provided, state) => ({
      ...provided,
      width: '100%',
      height: 'auto',
      minHeight, // Maintain a minimum height
      borderRadius: '8px',
      fontSize: 16,
      zIndex: 0,
      borderColor: state.isFocused ? 'var(--brand-300)' : provided.borderColor,
      boxShadow: state.isFocused ? '0 0 0 1px var(--brand-300)' : provided.boxShadow,
      '&:hover': {
        borderColor: state.isFocused ? 'var(--brand-300)' : provided.borderColor,
      },
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: 'var(--brand-100)',
      color: 'black',
      '&:hover': {
        backgroundColor: 'var(--brand-100)',
      },
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      '&:hover': {
        backgroundColor: 'var(--brand-100)',
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? 'var(--brand-100)'
        : state.isFocused
        ? 'var(--brand-100)'
        : provided.backgroundColor,
      zIndex: 1000,
      color: 'black',
      '&:hover': {
        backgroundColor: 'var(--brand-100)',
        color: 'black',
      },
    }),
  };
  return (
    <Select<IOptions, true>
      closeMenuOnSelect={false}
      components={animatedComponents}
      value={value}
      options={data}
      onChange={onChange}
      isMulti
      styles={customStyles}
      isDisabled={disabled}
      className={className}
      placeholder={placeholder}
      isSearchable={isSearchable}
      // filterOption={(option, inputValue) => {
      //   if (!inputValue) return true;
      //   const label = option.data.label?.toString() || '';
      //   return label.toLowerCase().includes(inputValue.toLowerCase().trim());
      // }}
    />
  );
};

export default MultiSelect;
