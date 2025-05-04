
// Base types
export interface Song {
  id: string;
  title: string;
  alternate_titles?: string[];
  iswc: string;
  writers?: Contributor[];
  publishers?: Contributor[];
  splits?: Split[];
  audio_preview?: string;
}

export interface Contributor {
  id: string;
  name: string;
  ipi_number?: string;
  type: ContributorType;
  bio?: string;
  photo_url?: string;
  contact_url?: string;
}

export interface Split {
  id: string;
  song_id: string;
  contributor: Contributor;
  percentage: number;
}

export type ContributorType = "writer" | "publisher";

// Search & Filter types
export interface SearchFiltersType {
  type?: "songs" | "writers" | "publishers";
  year?: string;
  status?: string;
}

export interface SearchResult {
  songs?: Song[];
  writers?: Contributor[];
  publishers?: Contributor[];
  totalResults: number;
}

// Authentication types
export interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: "writer" | "publisher" | "admin";
  contributor_id?: string;
}

export interface DashboardSummary {
  total_songs: number;
  recent_songs: Song[];
  alerts?: Alert[];
}

export interface Alert {
  id: string;
  type: "info" | "warning" | "success";
  message: string;
  date: string;
  is_read: boolean;
  action_url?: string;
}
