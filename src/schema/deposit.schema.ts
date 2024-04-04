export default interface DepositSchema {
  baseList: BaseList[];
  err_cd: string;
  err_msg: string;
  max_page_no: number;
  now_page_no: number;
  optionList: OptionList[];
  prdt_div: string;
  total_count: number;
}

export interface CombinedDeposit extends BaseList {
  optionList: OptionList[];
}

export interface BaseList {
  //공시 제출월
  dcls_month: string;
  //금융회사 코드
  fin_co_no: string;
  //금융회사 명
  kor_co_nm: string;
  //금융 상품명
  fin_prdt_nm: string;
  //가입 방법
  join_way: string;
  //만기 후 이자율
  mtrt_int: string;
  //우대 조건
  spcl_cnd: string;
  /**
   * 가입 제한 1. 제한 없음 2.서민전용 3.일부제한
   */
  join_deny: string;
  //가입대상
  join_member: string;
  //기타 유의사항
  etc_note: string;
  //최고한도
  max_limit?: null;
  //공시 시작일
  dcls_strt_day: string;
  //공시 종료일
  dcls_end_day?: null;
  //금융회사 제출일
  fin_co_subm_day: string;
  //금융 상품 코드
  fin_prdt_cd: string;
}

export interface OptionList {
  //최고 우대 금리 (소수점 2자리)
  intr_rate2: number;
  //저축 금리
  intr_rate: number;
  //저축 금리 유형
  intr_rate_type: string;
  //저축 금리 유형명
  intr_rate_type_nm: string;
  //저축 기간
  save_trm: string;
  dcls_month: string;
  //금융 회사 코드
  fin_co_no: string;
  //금융 상품 코드
  fin_prdt_cd: string;
}
