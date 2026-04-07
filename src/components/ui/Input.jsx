import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const Input = React.forwardRef(({
  label,
  error,
  icon: Icon,
  className,
  type = 'text',
  ...props
}, ref) => {
  return (
    <div className="w-full space-y-1">
      {label && (
        <label className="block text-sm font-medium text-text-light dark:text-text-dark">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            <Icon size={18} />
          </div>
        )}
        <input
          ref={ref}
          type={type}
          className={twMerge(
            'input',
            Icon && 'pl-10',
            error && 'border-error ring-1 ring-error focus:ring-error',
            className
          )}
          {...props}
        />
      </div>
      {error && (
        <p className="text-xs text-error mt-1">{error}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
