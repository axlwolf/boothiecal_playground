export interface PopupMetadata {
  popupId: string;
  startAt: string;
  endAt: string;
  priority: number;
  createdAt: string;
  branchIds?: number[];
  merchantIds?: number[];
  applyAll?: boolean;
}

export interface PopupData extends PopupMetadata {
  content: string;
}

export interface PopupShowResult {
  shown: boolean;
  popupId?: string;
  reason:
    | 'success'
    | 'not_first_payment'
    | 'already_shown_today'
    | 'no_eligible_popups'
    | 'missing_branch_id'
    | 'error'
    | 'popup_already_open';
}

export interface PopupDismissResult {
  dontShowAgain: boolean;
}
