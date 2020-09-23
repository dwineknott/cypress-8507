

   declare interface Meta {
    limit: number;
    next: string;
    offset: number;
    previous: any;
    total_count: number;
    }

    declare interface CurrencyRate {
        currency: string;
        id: number;
        is_zero_decimal: boolean;
        resource_name: string;
        value: string;
    }

    declare interface StatementUpload {
        file_url: string;
        filename: string;
        id: number;
        resource_uri: string;
        songtrust_user: string;
        statement_date: Date;
    }

    declare interface TaxCountry {
        id: number;
        iso_code: string;
        name: string;
        tax_witholding_percent: string;
    }

    declare interface ManagedBy {
        aliases: string[];
        cc_expiry_month: number;
        cc_expiry_year: number;
        commission_rate: number;
        counterpoint_territory_code?: number;
        currency_rate: CurrencyRate;
        current_balance: string;
        custom_territories_enabled: boolean;
        date_joined: Date;
        default_country?: string;
        direct_deposit_accounts: string[];
        email: string;
        email_verified: boolean;
        enable_licenses: boolean;
        enable_setlists: boolean;
        europe_optioned: boolean;
        external_websites?: string[];
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
        last_login: Date;
        last_name: string;
        middle_name: string;
        modified: Date;
        onboarding_popup_opened: boolean;
        payment_method: string;
        phone_number?: string;
        reviewed_song_modqueue_at: Date;
        royalties_display_currency?: string;
        royalties_loaded_at: Date;
        site: string;
        skipped_direct_deposit: boolean;
        skipped_statement_step: boolean;
        songs_count: number;
        songwriter_done?: boolean;
        songwriters_count: number;
        songwriters_used: number;
        statement_uploads: StatementUpload[];
        street_address: string;
        stripe_customer_id?: string;
        subscription_plan: string;
        tax_country: TaxCountry;
        terms_of_use: boolean;
        uses_default_search_terms: boolean;
        world_optioned: boolean;
        youtube_enabled: boolean;
        youtube_opt_out: boolean;
        youtube_opted_out_on?: Date;
        youtube_tos_approved: boolean;
        zip_code?: string;    
    }

    declare interface Perms {
        can_delete_access: boolean;
        can_manage: boolean;
        is_payee: boolean;
    }

    declare interface Pro {
        cdbaby_business_alias?: string;
        contact_email: string;
        counterpoint_code: string;
        id: number;
        ipi_number: string;
        language: string;
        name: string;
        requires_agreement_number: boolean;
        requires_lod_approval: string;
        requires_lod_in_home_territory: boolean;
        requires_lod_in_non_home_territory: string;
        send_lod_on_demand: boolean;
        signup_possible: boolean;
        songtrust_business_alias: string;
        url: string;
        writer_lod_signature_required: boolean;
    }

    declare interface PublishingCompany {
        _commission_rate: string;
        bio: string;
        counterpoint_code: string;
        created: Date;
        email: string;
        first_name?: string;
        has_ice_publisher: string;
        has_sacem_publisher: boolean;
        has_sgae_publisher: boolean;
        honorific: string;
        ice_agreement_number: number;
        id: number;
        ipi: string;
        last_name: string;
        middle_name: string;
        modified: Date;
        name: string;
        photo_file_url: string;
        pro_processed: boolean;
        sabam_agreement_number: number;
        sacem_agreement_number: number;
        sgae_agreement_number: number;
    }

    declare interface Object {
        _commission_rate?: any;
        access: string;
        all_files_submitted: boolean;
        alternate_names: any[];
        bio: string;
        bulk_catalog_uploads: any[];
        cancelled_in_cp_date?: any;
        complete: boolean;
        completed_modqueue_review_at?: any;
        counterpoint_code?: any;
        created: Date;
        current_status: string[];
        email: string;
        entered_modqueue_at?: any;
        fetched_work_numbers_at?: any;
        first_name: string;
        full_name: string;
        has_access: string;
        has_application: boolean;
        has_lod: boolean;
        has_pro_membership: boolean;
        honorific?: any;
        id: number;
        ipi: string;
        last_name: string;
        lod_tos_accepted: boolean;
        lod_verified: boolean;
        manageable: boolean;
        managed_by: ManagedBy;
        middle_name: string;
        modified: Date;
        payee: string;
        perms: Perms;
        photo_file_url: string;
        pro: Pro;
        pro_account_id?: any;
        pro_processed?: any;
        pro_reg_approved: boolean;
        pro_registration_log: string;
        publishing_company: PublishingCompany;
        registration_completed: boolean;
        registration_verified: boolean;
        reset_date?: any;
        reset_description?: any;
        reviewed_song_modqueue_at?: any;
        songs_closed_count: number;
        songs_open_count: number;
        songs_sent_count: number;
        songwriter_type: string;
        start_moqueue_review_at?: any;
        status_log: StatusLog;
        tax_withholding_rate?: any;
    }

    declare interface Log {
        _current_status: string;
        counterpoint_number_old?: any;
        created: Date;
        id: number;
        modified: Date;
        song_type: string;
    }
    

    declare interface StatusLog {
        approved: Date;
        created: Date;
        processing: Date;
        sent?: any;
    }

    declare interface Songwriter {
        _commission_rate?: any;
        access: string;
        all_files_submitted: boolean;
        alternate_names: any[];
        bio: string;
        bulk_catalog_uploads: any[];
        cancelled_in_cp_date?: any;
        complete: boolean;
        completed_modqueue_review_at?: any;
        counterpoint_code?: any;
        created: Date;
        current_status: string[];
        email: string;
        entered_modqueue_at?: any;
        fetched_work_numbers_at?: any;
        first_name: string;
        full_name: string;
        has_access: string;
        has_application: boolean;
        has_lod: boolean;
        has_pro_membership: boolean;
        honorific?: any;
        id: number;
        ipi: string;
        last_name: string;
        lod_tos_accepted?: any;
        lod_verified: boolean;
        manageable: boolean;
        managed_by: ManagedBy;
        middle_name?: any;
        modified: Date;
        payee: string;
        perms: Perms;
        photo_file_url: string;
        pro: Pro;
        pro_account_id?: any;
        pro_processed?: any;
        pro_reg_approved: boolean;
        pro_registration_log: string;
        publishing_company?: any;
        registration_completed: boolean;
        registration_verified: boolean;
        reset_date?: any;
        reset_description?: any;
        reviewed_song_modqueue_at?: any;
        songs_closed_count: number;
        songs_open_count: number;
        songs_sent_count: number;
        songwriter_type: string;
        start_moqueue_review_at?: any;
        status_log: StatusLog;
        tax_withholding_rate?: any;
    }

    declare interface Ownership {
        earned_rollup: number;
        id: number;
        lyrics: boolean;
        music: boolean;
        percent: string;
        publishing_company?: any;
        recordings_rollup?: any;
        songwriter: Songwriter;
        songwriter_rollup: string;
        territory?: any;
        uses_custom_territories: boolean;
    }

    declare interface Songwriter2 {
        id: string;
    }

    declare interface SongOwnership {
        lyrics: boolean;
        music: boolean;
        percent: number;
        songwriter: Songwriter2;
    }

    declare interface StatusLog2 {
        created: Date;
        processing: Date;
        registering?: any;
    }

    declare interface RootObject2 {
        alternate_title?: any;
        alternate_titles: any[];
        cdbaby_song_id?: any;
        chorus_lyrics: string;
        counterpoint_number?: any;
        created: Date;
        full_lyrics: string;
        hash_of_relevant_song_info?: any;
        id: number;
        iswc?: any;
        language: string;
        last_searched_for_videos_at?: any;
        log: Log;
        might_be_public_domain: boolean;
        modified: Date;
        origin: string;
        ownerships: Ownership[];
        pro_work_number?: any;
        public_domain: boolean;
        recordings_count: number;
        send_to_cp_task_id?: any;
        song_ownerships: SongOwnership[];
        status_log: StatusLog2;
        title: string;
        transferred_from_pro: boolean;
        translated_title?: any;
        youtube_asset_id?: any;
        youtube_comp_share_id?: any;
    }
    
    interface RootObject {
        meta?: Meta;
        objects: Object[];
    }


    declare namespace Cypress {

    interface Chainable {

        login(): Chainable<Element>
    }

}