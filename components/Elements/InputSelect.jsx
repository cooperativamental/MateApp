const InputSelect = (props) => {
     const {
          inputStyle,
          id,
          value,
          type,
          name,
          placeholder,
          onChange,
          optionDisabled,
          select,
          conditionError,
          children,
          title,
          subtitle,
          styleTitle,
          styleSubtitle,
          forwardedRef,
          defaultValue,
          ...restAttr
     } = props || {}

     if (select) {
          return (
               <select
                    className={`${inputStyle} flex bg-slate-800 appearance-none rounded-xl h-20 text-xl pl-4 ${conditionError ? " shadow-red-600" : "shadow-green-light"}`}
                    name={name}
                    onChange={onChange}
                    defaultValue={defaultValue || optionDisabled}
                    id={id}
                    value={value}
                    type={type}
                    placeholder={placeholder}
                    ref={forwardedRef}
                    {...restAttr}
               >
                    {
                         optionDisabled &&
                         <option disabled>{optionDisabled} </option>
                    }
                    {children}
               </select>

          )
     }
     else {
          return (
               <input
                    className={`${inputStyle} flex bg-slate-900 appearance-none rounded-xl h-20 text-xl px-4 
                         ring-1 caret-slate-100
                         ${conditionError ? " shadow-red-600" : "shadow-green-light"} ${type === "date" && "date"}`}
                    name={name}
                    onChange={onChange}
                    id={id}
                    value={value}
                    type={type}
                    ref={forwardedRef}
                    placeholder={placeholder}
                    {...restAttr}
               />
          )
     }
};


export default InputSelect;