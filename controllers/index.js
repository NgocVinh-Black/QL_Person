import { Customer, Employee, Person, Student } from "../models/Person.js";
import { ListPerson } from "../models/ListPerson.js";

document.getElementById("chonDTId").onchange = (event) => {
  const { value } = event.target;
  if (value == "Student") {
    document.getElementById("renderStudent").style.display = "flex";
    document.getElementById("renderCustomer").style.display = "none";
    document.getElementById("renderEmployee").style.display = "none";
    document.getElementById("renderDanhGia").style.display = "none";
  }
  if (value == "Employee") {
    document.getElementById("renderEmployee").style.display = "flex";
    document.getElementById("renderCustomer").style.display = "none";
    document.getElementById("renderStudent").style.display = "none";
    document.getElementById("renderDanhGia").style.display = "none";
  }
  if (value == "Customer") {
    document.getElementById("renderCustomer").style.display = "flex";
    document.getElementById("renderEmployee").style.display = "none";
    document.getElementById("renderStudent").style.display = "none";
    document.getElementById("renderDanhGia").style.display = "block";
  }
  if (value == "") {
    document.getElementById("renderCustomer").style.display = "none";
    document.getElementById("renderEmployee").style.display = "none";
    document.getElementById("renderStudent").style.display = "none";
    document.getElementById("renderDanhGia").style.display = "none";
  }
};

const layoutThemPerson = () => {
  document.getElementById("renderCustomer").style.display = "none";
  document.getElementById("renderEmployee").style.display = "none";
  document.getElementById("renderStudent").style.display = "none";
  document.getElementById("renderDanhGia").style.display = "none";
  document.getElementById("btnCapNhatPerson").style.display = "none";
  document.getElementById("btnThemPerson").style.display = "block";
  document.getElementById("inputForm").reset();
  document.getElementById("nhapMaId").readOnly = false;
};

document.getElementById("btnThemNguoiDung").onclick = layoutThemPerson;

// khoi tao listPerson
const listPerson = new ListPerson();

// lay du lieu Person tu form
const layDuLieuPerson = () => {
  const arrFiled = document.querySelectorAll(
    "#inputId input, #inputId select, #inputId textarea"
  );
  const person = new Person();
  for (let filed of arrFiled) {
    let { id, value } = filed;
    person[id] = value;
  }
  return person;
};

// tat modal va clear du lieu trong form
const tatVaClearDulieu = () => {
  $("#exampleModal").modal("hide");
  document.getElementById("inputForm").reset();
};

// Them Person vao ListPerson
const themPerson = () => {
  const person = layDuLieuPerson();
  listPerson.themPerson(person);
  hienThiPerson();
  luuLocalStorage();
  tatVaClearDulieu();
};

document.getElementById("btnThemPerson").onclick = themPerson;

// hien thi listPerson len display
const hienThiPerson = (arr = listPerson.arrListPerson) => {
  let content = "";
  for (let person of arr) {
    let personNew = new Person();
    Object.assign(personNew, person);
    const { nhapMaId, nhapTenId, nhapDiaChiId, nhapEmailId, chonDTId } =
      personNew;
    let studentNew = new Student();
    Object.assign(studentNew, person);
    const { nhapDiemHoa, nhapDiemLy, nhapDiemToan, tinhDiemTrungBinh } =
      studentNew;
    let employeeNew = new Employee();
    Object.assign(employeeNew, person);
    const { nhapSoNgayLam, nhapLuongTheoNgay, tinhLuong } = employeeNew;
    let customerNew = new Customer();
    Object.assign(customerNew, person);
    const { nhapTenCongTy, nhapGiaTriHoaDon, nhapDanhGia } = customerNew;
    if (chonDTId == "Student") {
      content += `
    <tr style="vertical-align: middle;">
    <th class="text-center">${nhapMaId}</th>
    <th>${nhapTenId}</th>
    <th>${nhapDiaChiId}</th>
    <th>${nhapEmailId}</th>
    <th>${chonDTId}</th>
    <th>
    <p>Điểm Toán: ${nhapDiemToan}</p>
    <p>Điểm Lý: ${nhapDiemLy}</p>
    <p>Điểm Hóa: ${nhapDiemHoa}</p>
    <p>Điểm trung bình: ${tinhDiemTrungBinh()}</p>
    </th>
    <th>
      <button onclick="layThongTinPerson('${nhapMaId}')" class="px-3 py-2 fs-4 border-0" style="border-radius: 10px; background-color: greenyellow; margin-left: 35px;"><i class="fa-solid fa-pen-to-square"></i></button>
      <button onclick="xoaPerson('${nhapMaId}')" class="px-3 py-2 fs-4 border-0" style="border-radius: 10px; background-color: red;margin-left: 20px;"><i class="fa-solid fa-trash-can"></i></button>
    </th>
  </tr>
    `;
    }
    if (chonDTId == "Employee") {
      content += `
    <tr style="vertical-align: middle;">
    <th class="text-center">${nhapMaId}</th>
    <th>${nhapTenId}</th>
    <th>${nhapDiaChiId}</th>
    <th>${nhapEmailId}</th>
    <th>${chonDTId}</th>
    <th>
    <p>Số ngày làm: ${nhapSoNgayLam}</p>
    <p>Lương một ngày: ${nhapLuongTheoNgay}</p>
    <p>Tổng lương: ${tinhLuong()}</p>
    </th>
    <th>
      <button onclick="layThongTinPerson('${nhapMaId}')" class="px-3 py-2 fs-4 border-0" style="border-radius: 10px; background-color: greenyellow; margin-left: 35px;"><i class="fa-solid fa-pen-to-square"></i></button>
      <button onclick="xoaPerson('${nhapMaId}')" class="px-3 py-2 fs-4 border-0" style="border-radius: 10px; background-color: red;margin-left: 20px;"><i class="fa-solid fa-trash-can"></i></button>
    </th>
  </tr>
    `;
    }
    if (chonDTId == "Customer") {
      content += `
    <tr style="vertical-align: middle;">
    <th class="text-center">${nhapMaId}</th>
    <th>${nhapTenId}</th>
    <th>${nhapDiaChiId}</th>
    <th>${nhapEmailId}</th>
    <th>${chonDTId}</th>
    <th>
    <p>Tên công ty: ${nhapTenCongTy}</p>
    <p>Giá trị hóa đơn: ${nhapGiaTriHoaDon}</p>
    <p>Đánh giá: ${nhapDanhGia}</p>
    </th>
    <th>
      <button onclick="layThongTinPerson('${nhapMaId}')" class="px-3 py-2 fs-4 border-0" style="border-radius: 10px; background-color: greenyellow; margin-left: 35px;"><i class="fa-solid fa-pen-to-square"></i></button>
      <button onclick="xoaPerson('${nhapMaId}')" class="px-3 py-2 fs-4 border-0" style="border-radius: 10px; background-color: red;margin-left: 20px;"><i class="fa-solid fa-trash-can"></i></button>
    </th>
  </tr>
    `;
    }
  }
  document.getElementById("renderListStudent").innerHTML = content;
};

// luu localStorage
const luuLocalStorage = (
  arr = listPerson.arrListPerson,
  key = "arrListPerson"
) => {
  let jsonArr = JSON.stringify(arr);
  localStorage.setItem(key, jsonArr);
};

// lay du lieu tu localStorage
const layDuLieuLocalStorage = (key) => {
  let dataLocal = JSON.parse(localStorage.getItem(key));
  if (dataLocal) {
    listPerson.arrListPerson = dataLocal;
    hienThiPerson();
  }
};
layDuLieuLocalStorage("arrListPerson");

// xoa Person khoi ListPerson
const xoaPerson = (id) => {
  listPerson.xoaPerson(id);
  hienThiPerson();
  luuLocalStorage();
};
window.xoaPerson = xoaPerson;

// cap nhat du lieu Person
const layThongTinPerson = (id) => {
  document.getElementById("btnCapNhatPerson").style.display = "block";
  document.getElementById("btnThemPerson").style.display = "none";
  const person = listPerson.layThongTinPerson(id);
  const arrField = document.querySelectorAll(
    "#inputId input, #inputId select, #inputId textarea"
  );
  for (let field of arrField) {
    field.value = person[field.id];
    if (field.id == "nhapMaId") {
      field.readOnly = true;
    }
  }
  if (person.chonDTId == "Student") {
    document.getElementById("renderStudent").style.display = "flex";
    document.getElementById("renderCustomer").style.display = "none";
    document.getElementById("renderEmployee").style.display = "none";
    document.getElementById("renderDanhGia").style.display = "none";
  }
  if (person.chonDTId == "Employee") {
    document.getElementById("renderEmployee").style.display = "flex";
    document.getElementById("renderCustomer").style.display = "none";
    document.getElementById("renderStudent").style.display = "none";
    document.getElementById("renderDanhGia").style.display = "none";
  }
  if (person.chonDTId == "Customer") {
    document.getElementById("renderCustomer").style.display = "flex";
    document.getElementById("renderEmployee").style.display = "none";
    document.getElementById("renderStudent").style.display = "none";
    document.getElementById("renderDanhGia").style.display = "block";
  }
  $("#exampleModal").modal("show");
};

window.layThongTinPerson = layThongTinPerson;

const capNhatPerson = () => {
  const person = layDuLieuPerson();
  listPerson.updatePerson(person);
  document.getElementById("nhapMaId").readOnly = false;
  hienThiPerson();
  luuLocalStorage();
  tatVaClearDulieu();
};

document.getElementById("btnCapNhatPerson").onclick = capNhatPerson;

document.getElementById("renderFilter").onchange = (event) => {
  const { value } = event.target;
  console.log(value)
  const arrFilter = listPerson.arrListPerson.filter((item, index) => {
    return item.chonDTId == value;
  });
  console.log(arrFilter)
  if (arrFilter.length > 0) {
    hienThiPerson(arrFilter);
  } else {
    hienThiPerson();
  }
};

// sắp xếp
const sapXepTen = (id) => {
  const locTenMang = listPerson.arrListPerson;
  console.log(locTenMang);
  locTenMang.sort(function (sv1, sv2) {
    let a = sv1.nhapTenId.toLowerCase();
    let b = sv2.nhapTenId.toLowerCase();
    return a === b ? 0 : a > b ? 1 : -1;
  });
  if (locTenMang.length > 0) {
    hienThiPerson(locTenMang);
  } else {
    hienThiPerson();
  }
};
// window.sapXepTen = sapXepTen;
document.getElementById("sapXep").onclick = sapXepTen;
