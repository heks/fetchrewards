import classNames from 'classnames';

const ErrorText = (props) => <p className="text-red-500 pt-2 text-xs" {...props} />

const Select = ({register, name, validation, errors, options = [], ...restProps}) => {
  const hasError = errors;
  const cx = classNames('mt-1 block w-full rounded-md border bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm', {
    'border-red-500': hasError,
    'border-gray-300': !hasError
  })
  return (
    <>
      <select
        className={cx}
        {...register(name, validation)}
        name={name}
        {...restProps}
      >
        <>
          <option value={''}></option>
          {options.map((opt, index) => {
            const val = opt?.abbreviation || opt;
            const name = opt?.name || opt;
            return (
              <option key={`${val}-${index}`} value={val}>{name}</option>
            );
          })}
        </>
      </select>
      {hasError && <ErrorText>{errors.message}</ErrorText>}
    </>
  )
};

export default Select;
