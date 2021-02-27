<template>
  <div>
    <div class="header-content">
      <div class="title">Danh sách học sinh</div>
      <div class="page-feature">
        <BaseButton type="normal">
          <div slot="text">Button 1</div>
        </BaseButton>
        <button class="button" id="btnDelete" @click="deleteSelected">
          <div class="btn-icon btn-icon-delete"></div>
          <div class="btn-text">Xóa dòng chọn</div>
        </button>
        <button @click="openInsertDialog" class="button" id="btnAdd">
          <div class="btn-icon btn-icon-add"></div>
          <div class="btn-text">Thêm học sinh</div>
        </button>
      </div>
    </div>

    <div class="filter-bar">
      <input
        class="input-search filter-elem"
        type="text"
        id="txtFilterText"
        placeholder="Tìm kiếm theo Mã, Tên hoặc SĐT"
        v-model="filterValue"
      />
      <div class="m-cell filter-elem">
        <select
          class="m-cell-single select-box dynamic-filter-cbx"
          id="cbxFilterClass"
          fieldName="ClassId"
          fieldText="ClassName"
          apiRoute="classes/"
          v-model="selectedClass"
        >
          <option value="" selected>Tất cả lớp học</option>
          <option
            v-for="klass in classList"
            v-bind:value="klass.ClassId"
            v-bind:key="klass.ClassId"
          >
            {{ klass.ClassName }}
          </option>
        </select>
      </div>
      <div class="m-cell filter-elem">
        <select
          class="m-cell-single select-box dynamic-filter-cbx"
          id="cbxFilterPosition"
          fieldName="PositionId"
          fieldText="PositionName"
          apiRoute="positions/"
          v-model="selectedPosition"
        >
          <option value="">Tất cả chức vụ</option>
          <option
            v-for="position in positionList"
            v-bind:value="position.PositionId"
            v-bind:key="position.PositionId"
          >
            {{ position.PositionName }}
          </option>
        </select>
      </div>
      <button
        class="second-button btn-refresh"
        id="btnRefresh"
        @click="getStudentList"
      >
        <div class="btn-icon btn-icon-refresh"></div>
      </button>
    </div>

    <StudentGrid
      :columns="columns"
      :studentList="filteredList"
      @on-edit-dialog-open="openEditDialog"
      @on-row-select="addSelectedRow"
    />

    <div class="paging-bar">
      <div class="page-group">Hiển thị <b>01-10/1000</b> học sinh</div>
      <div class="page-nav">
        <div class="left-nav">
          <div class="nav-first nav-arrow"></div>
          <div class="nav-prev nav-arrow"></div>
        </div>
        <div class="page-number">
          <div class="table-number">1</div>
          <div class="table-number">2</div>
          <div class="table-number">3</div>
          <div class="table-number">4</div>
        </div>
        <div class="right-nav">
          <div class="nav-next nav-arrow"></div>
          <div class="nav-last nav-arrow"></div>
        </div>
      </div>
      <div class="rows-selector"><b>20</b> học sinh/trang</div>
    </div>
    <StudentDialog
      :student="student"
      :classList="classList"
      :positionList="positionList"
      v-if="isDialogOpen"
      @on-close="closeDialog"
      @on-dialog-submitted="submitDialog"
    />
  </div>
</template>

<script>
import StudentDialog from "./StudentDialog";
import StudentGrid from "./StudentGrid.vue";
import axios from "axios";

import { mapActions, mapGetters } from "vuex";
import BaseButton from "../../components/BaseButton.vue";
export default {
  data() {
    return {
      student: {
        StudentId: "",
        StudentCode: "",
        FullName: "",
        Gender: 0,
        GenderName: "",
        DateOfBirth: "01/01/1970",
        PhoneNumber: "",
        Email: "",
        IdentityNumber: "",
        IdentityDate: "01/01/1970",
        IdentityPlace: "",
        Address: "",
        ClassId: "",
        ClassName: "",
        PositionId: "",
        PositionName: "",
        JoinDate: "01/01/1970",
        Status: Number,
        StatusName: "",
      },
      isDialogOpen: false,
      dialogMode: Number,
      columns: [
        // { columnName: "StudentId", columnText: "Id học sinh" },
        { columnName: "StudentCode", columnText: "Mã học sinh" },
        { columnName: "FullName", columnText: "Họ tên" },
        { columnName: "Gender", columnText: "Giới tính" },
        // { columnName: "GenderName", columnText: "Giới tính" },
        { columnName: "DateOfBirth", columnText: "Ngày sinh" },
        { columnName: "PhoneNumber", columnText: "Số điện thoại" },
        { columnName: "Email", columnText: "Email" },
        { columnName: "IdentityNumber", columnText: "Số CMT" },
        { columnName: "IdentityDate", columnText: "Ngày cấp" },
        { columnName: "IdentityPlace", columnText: "Nơi cấp" },
        { columnName: "Address", columnText: "Địa chỉ" },
        { columnName: "ClassId", columnText: "Id lớp học" },
        { columnName: "ClassName", columnText: "Tên lớp" },
        { columnName: "PositionId", columnText: "Id Chức vụ" },
        { columnName: "PositionName", columnText: "Chức vụ" },
        { columnName: "JoinDate", columnText: "Ngày gia nhập" },
        { columnName: "Status", columnText: "Trạng thái" },
        // { columnName: "StatusName", columnText: "Trạng thái học" },
      ],
      // studentList:[],
      // classList: [],
      // positionList: [],
      selectedStudent: [],
      selectedClass: "",
      selectedPosition: "",
      filterValue: "",
      errors: [],
    };
  },
  props: {},
  methods: {
    openInsertDialog() {
      this.dialogMode = 0;
      this.isDialogOpen = true;
    },
    openEditDialog(oldStudent) {
      this.dialogMode = 1;
      this.student = oldStudent;
      this.isDialogOpen = true;
    },
    closeDialog() {
      this.isDialogOpen = false;
    },
    submitDialog(newStudent) {
      if (this.dialogMode == 0) {
        axios
          .post(`http://localhost:3000/students`, JSON.stringify(newStudent), {
            headers: { "Content-Type": "application/json" },
          })
          .then(function(response) {
            alert("Thêm thành công! " + response.statusText);
            this.getStudentList();
          })
          .catch(function(error) {
            alert("Thêm thất bại! " + error);
          });
      }
      if (this.dialogMode == 1) {
        console.log(this.student);
        axios
          .put(
            `http://localhost:3000/students/${this.newStudent.StudentId}`,
            JSON.stringify(newStudent),
            {
              headers: { "Content-Type": "application/json" },
            }
          )
          .then(function(response) {
            alert("Sửa thành công! " + response.statusText);
            this.getStudentList();
          })
          .catch(function(error) {
            alert("Sửa thất bại! " + error);
          });
      }
      this.getStudentList();
    },
    addSelectedRow(newSelected) {
      if (this.selectedStudent.indexOf(newSelected) === -1) {
        this.selectedStudent.push(newSelected);
      } else {
        this.selectedStudent.splice(
          this.selectedStudent.indexOf(newSelected),
          1
        );
        return;
      }
    },
    deleteSelected() {
      if (this.selectedStudent.length == 0) {
        alert("Bạn phải chọn ít nhất một dòng để xóa");
        return;
      }
      var cf = confirm("Bạn có chắc chắn muốn xóa các bản ghi đã chọn?");
      if (cf == false) return;
      var total = this.selectedStudent.length;
      var deleted = 0;
      this.selectedStudent.forEach((student) => {
        axios
          .delete(`http://localhost:3000/students/${student.StudentId}`)
          .then(function(response) {
            this.selectedStudent.splice(0, 1);
            console.log(response);
            deleted++;
            this.getStudentList();
          })
          .catch(function(error) {
            console.log(error);
          });
      });
      alert(
        "Xóa thành công " +
          deleted +
          " bản ghi trong tổng số " +
          total +
          " đã chọn"
      );
    },

    ...mapActions({
      getStudentList: "student/getList",
      getClassList: "klass/getList",
      getPositionList: "position/getList",
    }),
  },
  computed: {
    ...mapGetters({
      studentList: "student/students",
      classList: "klass/classes",
      positionList: "position/positions",
    }),
    filteredList: function() {
      var result = this.studentList;
      if (this.filterValue) {
        var filteredByName = this.studentList.filter((student) =>
          student.FullName.toLowerCase().includes(
            this.filterValue.toLowerCase()
          )
        );

        var filteredByCode = this.studentList.filter((student) =>
          student.StudentCode.toLowerCase().includes(
            this.filterValue.toLowerCase()
          )
        );

        var filteredByPhoneNo = this.studentList.filter((student) =>
          student.PhoneNumber.toLowerCase().includes(
            this.filterValue.toLowerCase()
          )
        );

        result = result.filter(
          (student) =>
            filteredByName.includes(student) ||
            filteredByCode.includes(student) ||
            filteredByPhoneNo.includes(student)
        );
      }

      if (this.selectedClass != "") {
        var filteredByClass = this.studentList.filter(
          (student) => student.ClassId == this.selectedClass
        );
        result = result.filter((student) => filteredByClass.includes(student));
      }

      if (this.selectedPosition != "") {
        var filteredByPosition = this.studentList.filter(
          (student) => student.PositionId == this.selectedPosition
        );
        result = result.filter((student) =>
          filteredByPosition.includes(student)
        );
      }

      return result;
    },
  },
  components: {
    StudentDialog,
    StudentGrid,
    BaseButton,
  },
  mounted() {},
  beforeMount() {
    this.getStudentList();
    this.getClassList();
    this.getPositionList();
  },
};
</script>

<style scoped></style>
