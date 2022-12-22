export interface I_LEAD {
    region: string;
    depot: string;
    advertiseYn: string;
    leadSource: string;
    leadStatus: string;
    leadSubStatus: string;
    leadType: string;
    fromDate: string;
    toDate: string;
    leadDateColumn: string;
    ceGrade: string;
    ceDesignation: string;
    ceCoomonSearch: string;
    dealerCommonSearch: string;
    painter: string;
    userId: string;
}
export interface I_LEAD_SUMMARY_LIST {
    xsh_tab_id: number;
    xst_tab_name: string;
    xsh_id: number;
    xsh_head: string;
    xsh_parent_head_id: number;
    xsh_level: number;
    xsh_seq: number;
    count: number;
    show_count_yn: string;
    drill_yn: string;
}