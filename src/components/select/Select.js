import React from 'react';
import Select, { components, createFilter } from 'react-select';
// import { FaCaretDown } from "react-icons/fa";
//import i18next from "../../i18n/index";
// import { isMobile } from "react-device-detect";
import './Style.css';

const DropdownIndicator = (props) => {
  return components.DropdownIndicator && (
    <components.DropdownIndicator {...props}>

      {/* <FaCaretDown color={'#264c88'} /> */}

    </components.DropdownIndicator>
  );
};


// const onFocus = focused => `Option ${focused.label} is focused`;

// const ariaLiveMessages = { onFocus }

export default (props) => (
  <div className='selectContainer'>
    {/* <h4>בחר שנתון רכב</h4> */}
    <Select
      {...props}
      className='test'
      inputId={props.inputId ? props.inputId : `${props.id}-select-input`}
      aria-labelledby={props['aria-labelledby'] ? props['aria-labelledby'] : `${props.id}-select-input ${props.id}-x ${props.id}-errors`}
      isSearchable={true}
      menuPlacement={props.mobileSearchable? "top" : "bottom"}
      // placeholder='שנתון רכב'
      //noOptionsMessage={() => i18next.t('s_erncarloan_general_select_no_item')}
      components={{ DropdownIndicator, IndicatorSeparator:() => null }}
      filterOption={createFilter({ ignoreAccents: false })}
      aria-live="assertive"
      // ariaLiveMessages={ariaLiveMessages} 
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
          // kill the gap
          marginTop: 0,
        }),

        menuList: base => ({
          ...base,
          // kill the white space on first and last option
          padding: 0
        })
      }}
    // options={colourOptions}
    />
  </div>
);