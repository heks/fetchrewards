import classNames from 'classnames';

const ErrorText = (props) => <p className="text-red-500 pt-2 text-xs" {...props}/>

const Input = ({register, name, validation, errors, ...restProps}) => {
  const hasError = errors;
  const cx = classNames('mt-1 block w-full rounded-md focus:border-indigo-500 focus:ring-indigo-500 shadow-sm sm:text-sm', {
    'border-red-500': hasError,
    'border-gray-300': !hasError
  })
  return (
    <>
      <input
        className={cx}
        {...register(name, validation)}
        name={name}
        {...restProps}
      />
      {hasError && <ErrorText>{errors.message}</ErrorText>}
    </>
  )
};

export default Input;
