import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Client-side client (for uploads from browser)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Server-side client (for admin operations)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

// Storage bucket name
export const STORAGE_BUCKET = 'timelens-images';

// File path helpers
export const getOriginalImagePath = (userId: string, filename: string) => 
  `original/${userId}/${Date.now()}-${filename}`;

export const getTransformedImagePath = (userId: string, originalFilename: string) => {
  const timestamp = Date.now();
  const extension = originalFilename.split('.').pop() || 'jpg';
  return `transformed/${userId}/${timestamp}-transformed.${extension}`;
};

// Storage operations
export const uploadImage = async (file: File, path: string) => {
  const { data, error } = await supabase.storage
    .from(STORAGE_BUCKET)
    .upload(path, file, {
      cacheControl: '3600',
      upsert: false
    });

  if (error) throw error;
  return data;
};

export const getImageUrl = (path: string) => {
  const { data } = supabase.storage
    .from(STORAGE_BUCKET)
    .getPublicUrl(path);
  return data.publicUrl;
};

export const deleteImage = async (path: string) => {
  const { error } = await supabaseAdmin.storage
    .from(STORAGE_BUCKET)
    .remove([path]);

  if (error) throw error;
};

export const uploadBase64Image = async (base64Data: string, path: string, mimeType: string) => {
  // Convert base64 to blob
  const base64Response = await fetch(base64Data);
  const blob = await base64Response.blob();
  
  const { data, error } = await supabaseAdmin.storage
    .from(STORAGE_BUCKET)
    .upload(path, blob, {
      contentType: mimeType,
      cacheControl: '3600',
      upsert: false
    });

  if (error) throw error;
  return data;
};
