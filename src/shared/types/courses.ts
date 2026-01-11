export interface ClassItem {
  key: number;
  dkmh_tu_dien_hoc_phan_ma: string;
  dkmh_nhom_hoc_phan_ma: string;
  dkmh_tu_dien_hoc_phan_ten_vn: string;
  dkmh_tu_dien_hoc_phan_so_tin_chi: number;
  dkmh_tu_dien_phong_hoc_ten: string;
  dkmh_thu_trong_tuan_ma: number;
  dkmh_tu_dien_giang_vien_ten_vn: string;
  dkmh_tu_dien_giang_vien_email: string;
  dkmh_tu_dien_lop_hoc_phan_si_so: number;
  dkmh_tu_dien_lop_hoc_phan_lop_ma: string;
  si_so_con_lai: number;
  tiet_hoc: string;
  [key: `tuanhoc-${number}`]: string;
}

export interface Course {
  ma_request: string;
  data: {
    data: {
      data: ClassItem[];
      tuan_max: number;
      hoc_phan_info: {
        dkmh_tu_dien_hoc_phan_ma: string;
        dkmh_tu_dien_phong_hoc_ten: string;
        dkmh_tu_dien_hoc_phan_ten_vn: string;
        dkmh_tu_dien_hoc_phan_so_tin_chi: number;

      };
    };
  };
}


export interface ClassGroupItem {
  nhom_hoc_phan_ma: string;              // 01, 02, 03...
  lop_hoc_phan_lop_ma: string;            // TN01201
  giang_vien_ten_vn: string;
  giang_vien_email: string;
  si_so: number;
  si_so_con_lai: number;
  phong_hoc_chinh?: string;
  ten_hoc_phan: string;
  hoc_phan_ma: string;
  hoc_phan_so_tin_chi: number;
  sessions: ClassSession[];
}


export interface ClassSession {
  key: number;
  thu_trong_tuan_ma: number;     // 2 → Thứ 2
  tiet_hoc: string;              // "123----------"
  phong_hoc: string;
  [key: `tuanhoc-${number}`]: string;
}
