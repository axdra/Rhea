import { Database } from "./database"

export type Calendar = Database['public']['Tables']['calendars']['Row']
export type Course = Database['public']['Tables']['courses']['Row']
export type Event = Database['public']['Tables']['events']['Row']
export type Issue = Database['public']['Tables']['issues']['Row']
export type PersonalCalendar = Database['public']['Tables']['personalcalendar']['Row']
export type Union = Database['public']['Tables']['unions']['Row']
export type UnionPage = Database['public']['Tables']['unionpage']['Row']
export type UnionEvent = Database['public']['Tables']['unionevents']['Row']
export type Room = Database['public']['Tables']['rooms']['Row']