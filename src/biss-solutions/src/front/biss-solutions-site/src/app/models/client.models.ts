export interface Client {
  id?: string; // GUID como string
  name: string;
  versions?: string | null;
  description?: string | null;
  servicesProvided?: string | null;
  logo?: string | null;
  projectImage?: string | null;
  projectLink?: string | null;
  website?: string | null;
  isActive: boolean;
  order: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ClientCreateRequest {
  name: string;
  versions?: string;
  description?: string;
  servicesProvided?: string;
  logo?: string;
  projectImage?: string;
  projectLink?: string;
  website?: string;
  isActive?: boolean;
  order?: number;
}

export interface ClientUpdateRequest extends ClientCreateRequest {
  id: string; // GUID como string
}

