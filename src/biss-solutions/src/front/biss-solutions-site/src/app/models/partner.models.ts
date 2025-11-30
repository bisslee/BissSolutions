export interface Partner {
  id: number;
  name: string;
  logo: string | null;
  description: string | null;
  website: string | null;
  isActive: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface PartnerCreateRequest {
  name: string;
  logo?: string;
  description?: string;
  website?: string;
  isActive?: boolean;
  order?: number;
}

export interface PartnerUpdateRequest {
  name?: string;
  logo?: string;
  description?: string;
  website?: string;
  isActive?: boolean;
  order?: number;
}
