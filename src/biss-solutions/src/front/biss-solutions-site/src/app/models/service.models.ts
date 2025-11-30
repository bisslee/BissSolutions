/**
 * Modelos relacionados a Serviços
 */

export interface Service {
  id?: string; // GUID como string
  title: string;
  description?: string | null;
  serviceTypes?: string | null;
  image?: string | null;
  slug: string;
  isNew: boolean;
  featuredOnHome: boolean;
  isActive: boolean;
  order: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ServiceCreateRequest {
  title: string;
  description?: string | null;
  serviceTypes?: string | null;
  image?: string | null;
  slug?: string | null;
  isNew: boolean;
  featuredOnHome: boolean;
  isActive: boolean;
  order: number;
}

export interface ServiceUpdateRequest extends ServiceCreateRequest {
  id: string; // GUID como string
}

