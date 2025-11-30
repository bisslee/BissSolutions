/**
 * Modelos relacionados a Produtos
 */

export interface Product {
  id?: string; // GUID como string
  title: string;
  description?: string | null;
  currentVersion?: string | null;
  technologyItems?: string | null;
  features?: string | null;
  nugetLink?: string | null;
  documentationLink?: string | null;
  githubLink?: string | null;
  productLink?: string | null;
  image?: string | null;
  price?: number | null;
  category?: string | null;
  isActive: boolean;
  order: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductCreateRequest {
  title: string;
  description?: string | null;
  currentVersion?: string | null;
  technologyItems?: string | null;
  features?: string | null;
  nugetLink?: string | null;
  documentationLink?: string | null;
  githubLink?: string | null;
  productLink?: string | null;
  image?: string | null;
  price?: number | null;
  category?: string | null;
  isActive: boolean;
  order: number;
}

export interface ProductUpdateRequest extends ProductCreateRequest {
  id: string; // GUID como string
}

