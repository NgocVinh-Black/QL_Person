export class Person {
  constructor() {
    this.nhapMaId = "";
    this.nhapTenId = "";
    this.nhapEmailId = "";
    this.nhapDiaChiId = "";
    this.chonDTId = "";
  }
}

class Student extends Person {
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

class Employee extends Person {
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

class Customer extends Person {
  constructor() {
    super();
    this.nhapTenCongTy = "";
    this.nhapGiaTriHoaDon = "";
    this.nhapDanhGia = "";
  }
}