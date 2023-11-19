export class ListPerson {
  arrListPerson = [];

  // thêm Person
  themPerson = (person) => {
    this.arrListPerson.push(person);
  };
  // tìm vị trí Person trong mang
  timPerson = (id) => {
    let index = this.arrListPerson.findIndex((item, index) => {
      return item.nhapMaId == id;
    });
    return index;
  };
  // xóa Person
  xoaPerson = (id) => {
    let index = this.timPerson(id);
    if (index != -1) {
      this.arrListPerson.splice(index, 1);
    }
  };
  // lấy thông tin Person (xóa,sửa)
  layThongTinPerson = (id) => {
    let person = this.arrListPerson.find((item, index) => {
      return item.nhapMaId == id;
    });
    if (person) {
      return person;
    }
  };
  updatePerson = (person) => {
    const { nhapMaId } = person;
    const index = this.timPerson(nhapMaId);
    if (index != -1) {
      this.arrListPerson[index] = person;
    }
  };
}
