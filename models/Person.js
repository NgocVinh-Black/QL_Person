export class Person {
  constructor() {
    this.nhapMaId = "";
    this.nhapTenId = "";
    this.nhapEmailId = "";
    this.nhapDiaChiId = "";
    this.chonDTId = "";
  }
}

export class Student extends Person {
  constructor() {
    super();
    this.nhapDiemToan = "";
    this.nhapDiemLy = "";
    this.nhapDiemHoa = "";
  }
  tinhDiemTrungBinh = () => {
    let diemTrungBinh =
      (this.nhapDiemHoa + this.nhapDiemLy + this.nhapDiemToan) / 3;
    return diemTrungBinh;
  };
}

export class Employee extends Person {
  constructor() {
    super();
    this.nhapSoNgayLam = "";
    this.nhapLuongTheoNgay = "";
  }
  tinhLuong = () => {
    let luong = this.nhapSoNgayLam * this.nhapLuongTheoNgay;
    return luong;
  };
}

export class Customer extends Person {
  constructor() {
    super();
    this.nhapTenCongTy = "";
    this.nhapGiaTriHoaDon = "";
    this.nhapDanhGia = "";
  }
}
