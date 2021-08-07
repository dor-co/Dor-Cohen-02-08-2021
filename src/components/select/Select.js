import React from 'react';
import Select, { components, createFilter } from 'react-select';
import './Style.css';

const DropdownIndicator = (props) => {
  return components.DropdownIndicator && (
    <components.DropdownIndicator {...props}>
    </components.DropdownIndicator>
  );
};

export default (props) => (
  <div className='selectContainer'>
    <Select
      {...props}
      className='test'
      inputId={props.inputId ? props.inputId : `${props.id}-select-input`}
      aria-labelledby={props['aria-labelledby'] ? props['aria-labelledby'] : `${props.id}-select-input ${props.id}-x ${props.id}-errors`}
      isSearchable={true}
      menuPlacement={props.mobileSearchable? "top" : "bottom"}
      components={{ DropdownIndicator, IndicatorSeparator:() => null }}
      filterOption={createFilter({ ignoreAccents: false })}
      aria-live="assertive"
      styles={{
        control: (base, state) => ({
          ...base,
          border: '0px',
          background: "#E6E6E6",
          boxShadow: state.isFocused ? "0 0 0 0.2rem rgba(25, 92, 183, 0.25)" : 0,
          borderColor: state.isFocused ? "#659eea" : "#CED4DA",
          "&:hover": {
            borderColor: state.isFocused ? "#659eea" : "#CED4DA"
          },
          borderRadius: '2px',
        }),

        menu: base => ({
          ...base,
          marginTop: 0,
        }),

        menuList: base => ({
          ...base,
          padding: 0
        })
      }}
    />
  </div>
);