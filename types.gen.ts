export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      issues: {
        Row: {
          id: number;
          issue: string;
          created_at: string | null;
        };
        Insert: {
          id?: number;
          issue: string;
          created_at?: string | null;
        };
        Update: {
          id?: number;
          issue?: string;
          created_at?: string | null;
        };
      };
      unionevents: {
        Row: {
          id: number;
          created_at: string | null;
          creator: string | null;
          title: string | null;
          cover_image: string | null;
          description: string | null;
          short_description: string | null;
          url_slug: string | null;
          start_time: string | null;
          end_time: string | null;
          location: string | null;
          coordinates: string | null;
          interested: string[] | null;
          going: string[] | null;
          cost: number | null;
          union: string | null;
        };
        Insert: {
          id?: number;
          created_at?: string | null;
          creator?: string | null;
          title?: string | null;
          cover_image?: string | null;
          description?: string | null;
          short_description?: string | null;
          url_slug?: string | null;
          start_time?: string | null;
          end_time?: string | null;
          location?: string | null;
          coordinates?: string | null;
          interested?: string[] | null;
          going?: string[] | null;
          cost?: number | null;
          union?: string | null;
        };
        Update: {
          id?: number;
          created_at?: string | null;
          creator?: string | null;
          title?: string | null;
          cover_image?: string | null;
          description?: string | null;
          short_description?: string | null;
          url_slug?: string | null;
          start_time?: string | null;
          end_time?: string | null;
          location?: string | null;
          coordinates?: string | null;
          interested?: string[] | null;
          going?: string[] | null;
          cost?: number | null;
          union?: string | null;
        };
      };
      calendars: {
        Row: {
          id: number;
          name: string;
          created_at: string | null;
          code: string;
          url: string | null;
          parent_course: number | null;
          last_update: string | null;
          last_cache: string | null;
        };
        Insert: {
          id?: number;
          name: string;
          created_at?: string | null;
          code: string;
          url?: string | null;
          parent_course?: number | null;
          last_update?: string | null;
          last_cache?: string | null;
        };
        Update: {
          id?: number;
          name?: string;
          created_at?: string | null;
          code?: string;
          url?: string | null;
          parent_course?: number | null;
          last_update?: string | null;
          last_cache?: string | null;
        };
      };
      unionpage: {
        Row: {
          sidebar: Json | null;
          id: string;
        };
        Insert: {
          sidebar?: Json | null;
          id: string;
        };
        Update: {
          sidebar?: Json | null;
          id?: string;
        };
      };
      courses: {
        Row: {
          id: number;
          name: string;
          created_at: string | null;
          code: string | null;
          url: string | null;
        };
        Insert: {
          id?: number;
          name: string;
          created_at?: string | null;
          code?: string | null;
          url?: string | null;
        };
        Update: {
          id?: number;
          name?: string;
          created_at?: string | null;
          code?: string | null;
          url?: string | null;
        };
      };
      events: {
        Row: {
          id: string;
          name: string;
          created_at: string | null;
          start_time: string | null;
          end_time: string | null;
          location: string | null;
          last_update: string | null;
          group: string | null;
          room: string | null;
          teacher: string | null;
          aid: string | null;
          parent_calendar: string | null;
        };
        Insert: {
          id: string;
          name: string;
          created_at?: string | null;
          start_time?: string | null;
          end_time?: string | null;
          location?: string | null;
          last_update?: string | null;
          group?: string | null;
          room?: string | null;
          teacher?: string | null;
          aid?: string | null;
          parent_calendar?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          created_at?: string | null;
          start_time?: string | null;
          end_time?: string | null;
          location?: string | null;
          last_update?: string | null;
          group?: string | null;
          room?: string | null;
          teacher?: string | null;
          aid?: string | null;
          parent_calendar?: string | null;
        };
      };
      rooms: {
        Row: {
          id: number;
          name: string;
          created_at: string | null;
          location: string | null;
        };
        Insert: {
          id?: number;
          name: string;
          created_at?: string | null;
          location?: string | null;
        };
        Update: {
          id?: number;
          name?: string;
          created_at?: string | null;
          location?: string | null;
        };
      };
      unions: {
        Row: {
          name: string;
          id: string;
          cover_image: string | null;
          description: string | null;
          color: string | null;
          admins: string[];
        };
        Insert: {
          name: string;
          id?: string;
          cover_image?: string | null;
          description?: string | null;
          color?: string | null;
          admins: string[];
        };
        Update: {
          name?: string;
          id?: string;
          cover_image?: string | null;
          description?: string | null;
          color?: string | null;
          admins?: string[];
        };
      };
      personalcalendar: {
        Row: {
          id: number;
          user_id: string;
          created_at: string | null;
          calendar: string | null;
          calendar_id: number | null;
        };
        Insert: {
          id?: number;
          user_id: string;
          created_at?: string | null;
          calendar?: string | null;
          calendar_id?: number | null;
        };
        Update: {
          id?: number;
          user_id?: string;
          created_at?: string | null;
          calendar?: string | null;
          calendar_id?: number | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      search_courses: {
        Args: { keyword: string };
        Returns: Record<string, unknown>[];
      };
    };
    Enums: {
      [_ in never]: never;
    };
  };
}

