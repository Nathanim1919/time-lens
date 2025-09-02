import { ButtonProps } from '@/types';
import { cn } from '@/lib/utils';

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  className = '',
  type = 'button',
  loading = false,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer';
  
  const variantClasses = {
    primary: 'bg-purple-600 text-white hover:bg-purple-700 hover:shadow-lg hover:shadow-purple-500/25 focus:ring-purple-500 shadow-sm transform hover:scale-[1.02] active:scale-[0.98]',
    secondary: 'bg-slate-600 text-white hover:bg-slate-700 hover:shadow-lg focus:ring-slate-500 shadow-sm transform hover:scale-[1.02] active:scale-[0.98]',
    outline: 'border border-slate-600 bg-slate-700/30 text-gray-300 hover:bg-slate-700/50 hover:border-slate-500 focus:ring-purple-500 transform hover:scale-[1.02] active:scale-[0.98]',
    ghost: 'text-gray-300 hover:bg-slate-700/30 focus:ring-purple-500 transform hover:scale-[1.02] active:scale-[0.98]',
    danger: 'bg-red-600 text-white hover:bg-red-700 hover:shadow-lg hover:shadow-red-500/25 focus:ring-red-500 shadow-sm transform hover:scale-[1.02] active:scale-[0.98]',
    success: 'bg-green-600 text-white hover:bg-green-700 hover:shadow-lg hover:shadow-green-500/25 focus:ring-green-500 shadow-sm transform hover:scale-[1.02] active:scale-[0.98]',
    warning: 'bg-yellow-600 text-white hover:bg-yellow-700 hover:shadow-lg hover:shadow-yellow-500/25 focus:ring-yellow-500 shadow-sm transform hover:scale-[1.02] active:scale-[0.98]',
    gradient: 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 hover:shadow-lg hover:shadow-purple-500/25 focus:ring-purple-500 shadow-sm transform hover:scale-[1.02] active:scale-[0.98]',
    glass: 'bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 text-white hover:bg-slate-800/50 hover:border-slate-600 focus:ring-purple-500 transform hover:scale-[1.02] active:scale-[0.98]',
  };
  
  const sizeClasses = {
    xs: 'px-2 py-1 text-xs',
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
    xl: 'px-8 py-4 text-lg',
  };
  
  const classes = cn(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    className
  );
  
  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading ? (
        <div className="flex items-center gap-2">
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/30 border-t-white"></div>
          {children}
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;