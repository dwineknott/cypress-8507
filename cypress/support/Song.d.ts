
export interface Song {
  alternate_title?: null;
  alternate_titles?: (null)[] | null;
  cdbaby_song_id?: null;
  chorus_lyrics: string;
  counterpoint_number?: null;
  created: string;
  full_lyrics: string;
  hash_of_relevant_song_info?: null;
  id: number;
  iswc?: null;
  language: string;
  last_searched_for_videos_at?: null;
  log: Log;
  might_be_public_domain: boolean;
  modified: string;
  origin: string;
  ownerships?: (OwnershipsEntity)[] | null;
  pro_work_number?: null;
  public_domain: boolean;
  recordings_count: number;
  send_to_cp_task_id?: null;
  song_ownerships?: (SongOwnershipsEntity)[] | null;
  status_log: StatusLog;
  title: string;
  transferred_from_pro: boolean;
  translated_title?: null;
  youtube_asset_id?: null;
  youtube_comp_share_id?: null;
}
export interface Log {
  _current_status: string;
  counterpoint_number_old?: null;
  created: string;
  id: number;
  modified: string;
  song_type: string;
}
export interface OwnershipsEntity {
  earned_rollup: number;
  id: number;
  lyrics: boolean;
  music: boolean;
  percent: string;
  publishing_company?: null;
  recordings_rollup?: null;
  songwriter: Songwriter;
  songwriter_rollup: string;
  territory?: null;
  uses_custom_territories: boolean;
}
export interface Songwriter {
  _commission_rate?: null;
  access: string;
  all_files_submitted: boolean;
  alternate_names?: (null)[] | null;
  bio: string;
  bulk_catalog_uploads?: (null)[] | null;
  cancelled_in_cp_date?: null;
  complete: boolean;
  completed_modqueue_review_at?: null;
  counterpoint_code?: null;
  created: string;
  current_status?: (string)[] | null;
  email: string;
  entered_modqueue_at?: null;
  fetched_work_numbers_at?: null;
  first_name: string;
  full_name: string;
  has_access: string;
  has_application: boolean;
  has_lod: boolean;
  has_pro_membership: boolean;
  honorific?: null;
  id: number;
  ipi: string;
  last_name: string;
  lod_tos_accepted?: null;
  lod_verified: boolean;
  manageable: boolean;
  managed_by: ManagedBy;
  middle_name?: null;
  modified: string;
  payee: string;
  perms: Perms;
  photo_file_url: string;
  pro: Pro;
  pro_account_id?: null;
  pro_processed?: null;
  pro_reg_approved: boolean;
  pro_registration_log: string;
  publishing_company?: null;
  registration_completed: boolean;
  registration_verified: boolean;
  reset_date?: null;
  reset_description?: null;
  reviewed_song_modqueue_at?: null;
  songs_closed_count: number;
  songs_open_count: number;
  songs_sent_count: number;
  songwriter_type: string;
  start_moqueue_review_at?: null;
  status_log: StatusLog1;
  tax_withholding_rate?: null;
}
export interface ManagedBy {
  aliases?: (null)[] | null;
  cc_expiry_month: number;
  cc_expiry_year: number;
  commission_rate: number;
  counterpoint_territory_code?: null;
  currency_rate: CurrencyRate;
  current_balance: string;
  custom_territories_enabled: boolean;
  date_joined: string;
  default_country?: null;
  direct_deposit_accounts?: (string)[] | null;
  email: string;
  email_verified: boolean;
  enable_licenses: boolean;
  enable_setlists: boolean;
  europe_optioned: boolean;
  external_websites?: (null)[] | null;
  first_name: string;
  grid_settings: string;
  id: number;
  is_active: boolean;
  is_author: boolean;
  is_b2b_client: boolean;
  is_composer: boolean;
  is_neighboring_rights: boolean;
  is_performer: boolean;
  is_publisher: boolean;
  is_queued_for_royalty_import: boolean;
  is_queued_for_royalty_statement_export: boolean;
  is_read_only_user: boolean;
  is_semiannual: boolean;
  last_login: string;
  last_name: string;
  middle_name: string;
  modified: string;
  onboarding_popup_opened: boolean;
  payment_method: string;
  phone_number?: null;
  reviewed_song_modqueue_at: string;
  royalties_display_currency?: null;
  royalties_loaded_at: string;
  site: string;
  skipped_direct_deposit: boolean;
  skipped_statement_step: boolean;
  songs_count: number;
  songwriter_done?: null;
  songwriters_count: number;
  songwriters_used: number;
  statement_uploads?: (StatementUploadsEntity)[] | null;
  street_address: string;
  stripe_customer_id?: null;
  subscription_plan: string;
  tax_country: TaxCountry;
  terms_of_use: boolean;
  uses_default_search_terms: boolean;
  world_optioned: boolean;
  youtube_enabled: boolean;
  youtube_opt_out: boolean;
  youtube_opted_out_on?: null;
  youtube_tos_approved: boolean;
  zip_code?: null;
}
export interface CurrencyRate {
  currency: string;
  id: number;
  is_zero_decimal: boolean;
  resource_name: string;
  value: string;
}
export interface StatementUploadsEntity {
  file_url: string;
  filename: string;
  id: number;
  resource_uri: string;
  songtrust_user: string;
  statement_date: string;
}
export interface TaxCountry {
  id: number;
  iso_code: string;
  name: string;
  tax_witholding_percent: string;
}
export interface Perms {
  can_delete_access: boolean;
  can_manage: boolean;
  is_payee: boolean;
}
export interface Pro {
  cdbaby_business_alias?: null;
  contact_email: string;
  counterpoint_code: string;
  id: number;
  ipi_number?: null;
  language: string;
  name: string;
  requires_agreement_number: boolean;
  requires_lod_approval: string;
  requires_lod_in_home_territory: boolean;
  requires_lod_in_non_home_territory: string;
  send_lod_on_demand: boolean;
  signup_possible: boolean;
  songtrust_business_alias?: null;
  url?: null;
  writer_lod_signature_required: boolean;
}
export interface StatusLog1 {
  approved: string;
  created: string;
  processing: string;
  sent?: null;
}
export interface SongOwnershipsEntity {
  lyrics: boolean;
  music: boolean;
  percent: number;
  songwriter: Songwriter1;
}
export interface Songwriter1 {
  id: string;
}
export interface StatusLog {
  created: string;
  processing: string;
  registering?: null;
}
