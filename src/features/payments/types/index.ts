export type Bank = {
  name: string;
  code: string;
  logo: string;
};

export interface BankAccountPayload {
  title: string;
  school_name: string;
  school_email: string;
  primary_string: string;
  school_id: number | null;
  role: string;
  main_account: boolean;
  account: {
    account_number: string;
    bank_code: string;
    account_name: string;
  };
}

export interface RegisteredBankAccount {
  account_name: string;
  account_number: string;
  bank_code: string;
  createdAt: string;
  id: string;
  main_account: boolean;
  paystack_subaccount: string;
  school_id: number;
  title: string;
  updatedAt: string;
}

export type CreateInvoiceState = {
  discipline?: string;
  total_fees: number;
  accept_installments: "yes" | "no";
  minimum_acceptable_payment: number;
  role: string;
  transaction_fee_bearer: "school" | "parent";
  due_date: string;
  description: string;
  created_by: number;
  academic_session: string;
  term: string;
  level_id: number;
  line_items: Record<string, LineItem[]>;
  isSplittedAccount: boolean;
};

export type LineItem = {
  id: string;
  item: string;
  required: boolean;
  total_item_fee: number;
  line_item_breakdown: Record<string, number>;
};


export type InvoiceFromBackend = CreateInvoiceState & {
  _id: string;
  __v: number;
};


export interface IFilterProps {
  discipline?: string;
  academic_session?: string;
  term?: string;
}
