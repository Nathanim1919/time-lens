// Core user types
export interface User {
    id: string;
    email: string;
    name: string;
    credits: number;
    avatar_url?: string;
    created_at: string;
    updated_at: string;
  }
  
  // Image types
  export interface Image {
    id: string;
    user_id: string;
    original_url: string;
    generated_url: string;
    era_theme: EraTheme;
    created_at: string;
  }
  
  // Era/Theme types
  export type EraTheme = 
    | 'medieval'
    | 'cyberpunk'
    | 'anime'
    | '1920s'
    | 'space'
    | 'renaissance'
    | 'futuristic'
    | 'vintage';
  
  // Transaction types
  export interface Transaction {
    id: string;
    user_id: string;
    amount: number;
    credits_added: number;
    status: 'pending' | 'completed' | 'failed';
    created_at: string;
  }
  
  // API response types
  export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
  }
  
  // AI generation types
  export interface GenerationRequest {
    image_url: string;
    era_theme: EraTheme;
    user_id: string;
  }
  
  export interface GenerationResponse {
    generated_image_url: string;
    prompt_used: string;
    processing_time: number;
  }
  
  // Upload types
  export interface UploadResponse {
    image_url: string;
    image_id: string;
  }
  
  // Credit types
  export interface CreditPurchase {
    credits: number;
    amount: number;
    payment_method: 'stripe' | 'polar';
  }
  
  // Social sharing types
  export interface ShareData {
    platform: 'linkedin' | 'instagram' | 'twitter';
    image_url: string;
    era_theme: EraTheme;
    user_id: string;
  }
  
  // Form types
  export interface LoginForm {
    email: string;
    password: string;
  }
  
  export interface SignupForm {
    email: string;
    password: string;
    name: string;
  }
  
  // UI Component Props
  export interface ButtonProps {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    onClick?: () => void;
    className?: string;
    type?: 'button' | 'submit' | 'reset';
  }
  
  export interface InputProps {
    label?: string;
    placeholder?: string;
    value: string;
    onChange: (value: string) => void;
    error?: string;
    type?: 'text' | 'email' | 'password' | 'file';
    required?: boolean;
    className?: string;
  }
  
  export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    size?: 'sm' | 'md' | 'lg';
  }
  
  // Error types
  export interface AppError {
    code: string;
    message: string;
    details?: any;
  }
  
  // Loading states
  export interface LoadingState {
    isLoading: boolean;
    error?: AppError;
  }
  
  // Pagination types
  export interface PaginationParams {
    page: number;
    limit: number;
  }
  
  export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }