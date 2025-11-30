/**
 * Modelos relacionados a Company (Empresa)
 */

export interface Company {
  id?: string; // GUID como string
  name?: string | null;
  legalName?: string | null;
  cnpj?: string | null;
  email?: string | null;
  phone?: string | null;
  website?: string | null;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  zipCode?: string | null;
  linkedInUrl?: string | null;
  facebookUrl?: string | null;
  instagramUrl?: string | null;
  twitterUrl?: string | null;
  youtubeUrl?: string | null;
  logoUrl?: string | null;
  bannerUrl?: string | null;
  description?: string | null;
  mission?: string | null;
  vision?: string | null;
  values?: string | null;
  history?: string | null;
  foundedYear?: number | null;
  numberOfEmployees?: string | null;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CompanyUpdateRequest extends Company {
  id?: string; // GUID como string
}

