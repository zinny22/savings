export default interface BankSchema {
  baseList: BankBaseList[];
  err_cd: string;
  err_msg: string;
  max_page_no: number;
  now_page_no: number;
  optionList: [];
  prdt_div: string;
  total_count: number;
}

export interface BankBaseList {
  cal_tel: string;
  dcls_chrg_man: string;
  dcls_month: string;
  fin_co_no: string;
  homp_url: string;
  kor_co_nm: string;
}
