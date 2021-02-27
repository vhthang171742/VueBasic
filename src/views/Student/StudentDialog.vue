<template>
  <div class="m-dialog dialog-detail">
    <div class="dialog-modal"></div>
    <div class="dialog-content">
      <div class="dialog-header">
        <div class="dialog-header-title">Thông tin học sinh</div>
        <div class="dialog-header-exit">
          <button id="btnClose" class="icon" @click="closeDialog"></button>
        </div>
      </div>
      <div class="dialog-body">
        <div class="grid-left-col">
          <div class="avatar">
            <div class="avatar-default"></div>
            <div class="avatar-constraint">
              Vui lòng chọn ảnh có định dạng .jpg .jped .png .gif
            </div>
          </div>
        </div>

        <div class="grid-right-col">
          <!--Thông tin chung-->
          <div class="group-header">
            A. Thông tin chung:
          </div>
          <hr class="group-header-line" />
          <div class="m-row">
            <div class="m-cell">
              <div>Mã học sinh (*)</div>
              <input
                type="text"
                class="m-cell-single"
                id="txtStudentCode"
                fieldName="StudentCode"
                required
                tabindex="1"
                pre-focus
                v-model="innerStudent.StudentCode"
              />
            </div>
            <div class="m-cell">
              <div>Họ và tên (*)</div>
              <input
                type="text"
                class="m-cell-single"
                id="txtFullName"
                fieldName="FullName"
                required
                tabindex="2"
                v-model="innerStudent.FullName"
              />
            </div>
          </div>
          <div class="m-row">
            <div class="m-cell">
              <div>Ngày sinh</div>
              <input
                type="date"
                class="m-cell-single date-picker"
                id="dtpDateOfBirth"
                fieldName="DateOfBirth"
                tabindex="3"
                v-model="DateOfBirth"
              />
            </div>
            <div class="m-cell">
              <div>Giới tính</div>
              <select
                class="m-cell-single select-box"
                id="cbxGender"
                fieldName="Gender"
                tabindex="4"
                v-model="innerStudent.Gender"
              >
                <option value="0">Nữ</option>
                <option value="1">Nam</option>
                <option value="2">Khác</option>
              </select>
            </div>
          </div>
          <div class="m-row">
            <div class="m-cell">
              <div>Số CMTND/ Căn cước (*)</div>
              <input
                type="text"
                class="m-cell-single"
                id="txtIdentityNumber"
                fieldName="IdentityNumber"
                required
                tabindex="5"
                v-model="innerStudent.IdentityNumber"
              />
            </div>
            <div class="m-cell">
              <div>Ngày cấp</div>
              <input
                type="date"
                class="m-cell-single date-picker"
                id="dtpIdentityDate"
                fieldName="IdentityDate"
                tabindex="6"
                v-model="IdentityDate"
              />
            </div>
          </div>
          <div class="m-row">
            <div class="m-cell">
              <div>Nơi cấp</div>
              <input
                type="text"
                class="m-cell-single"
                id="txtIdentityPlace"
                fieldName="IdentityPlace"
                tabindex="7"
                v-model="innerStudent.IdentityPlace"
              />
            </div>
            <div class="m-cell">
              <div>Địa chỉ</div>
              <input
                type="text"
                class="m-cell-single"
                id="txtAddress"
                fieldName="Address"
                tabindex="8"
                v-model="innerStudent.Address"
              />
            </div>
          </div>
          <div class="m-row">
            <div class="m-cell">
              <div>Email (*)</div>
              <input
                type="email"
                placeholder="example@domain.com"
                class="m-cell-single"
                id="txtEmail"
                fieldName="Email"
                required
                tabindex="9"
                v-model="innerStudent.Email"
              />
            </div>
            <div class="m-cell">
              <div>Số điện thoại (*)</div>
              <input
                type="text"
                class="m-cell-single"
                id="txtPhoneNumber"
                fieldName="PhoneNumber"
                required
                tabindex="10"
                v-model="innerStudent.PhoneNumber"
              />
            </div>
          </div>

          <!--Thông tin công việc-->
          <div class="group-header" style="margin-top:30px">
            B. Thông tin học tập:
          </div>
          <hr class="group-header-line" />
          <div class="m-row">
            <div class="m-cell">
              <div>Chức vụ</div>
              <select
                class="m-cell-single select-box dynamic-dialog-cbx"
                id="cbxDialogPosition"
                fieldName="PositionId"
                fieldText="PositionName"
                apiRoute="positions/"
                tabindex="11"
                v-model="innerStudent.PositionId"
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
            <div class="m-cell">
              <div>Lớp</div>
              <select
                class="m-cell-single select-box dynamic-dialog-cbx"
                id="cbxDialogClass"
                fieldName="ClassId"
                fieldText="ClassName"
                apiRoute="classs/"
                tabindex="12"
                v-model="innerStudent.ClassId"
              >
                <option value="" selected>Tất cả lớp học</option>
                <option
                  v-for="klass in classList"
                  v-bind:value="klass.ClassId"
                  v-bind:key="klass.ClassId"
                >
                  {{ klass.ClassName }}
                </option></select
              >
            </div>
          </div>
          <div class="m-row">
            <div class="m-cell">
              <div>Ngày gia nhập</div>
              <input
                type="date"
                class="m-cell-single date-picker"
                id="dtpJoinDate"
                fieldName="JoinDate"
                tabindex="13"
                v-model="JoinDate"
              />
            </div>
            <div class="m-cell">
              <div>Tình trạng học tập</div>
              <select
                class="m-cell-single select-box"
                id="cbxStatus"
                fieldName="Status"
                tabindex="14"
                v-model="innerStudent.Status"
              >
                <option value="0">Đã nghỉ học</option>
                <option value="1">Đang học tập</option>
                <option value="2">Tạm đình chỉ</option>
                <option value="3">Khác</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div class="dialog-footer">
        <button
          id="btnSave"
          class="button m-btn-save"
          tabindex="15"
          @click="submitDialog"
        >
          <i class="far fa-save"></i><span class="btn-text">Lưu</span>
        </button>
        <button
          id="btnCancel"
          class="second-button m-btn-cancel"
          tabindex="16"
          @click="closeDialog"
        >
          <span class="second-btn-text">Hủy</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      innerStudent: this.student,
    };
  },
  props: {
    student: Object,
    classList: Array,
    positionList: Array,
  },
  computed: {
    DateOfBirth: {
      get() {
        var original = this.innerStudent.DateOfBirth.split("/");
        return original[2] + "-" + original[1] + "-" + original[0];
      },
      set(newVal) {
        var newDate = new Date(newVal).toLocaleDateString("en-GB");
        this.innerStudent.DateOfBirth = newDate;
      },
    },
    IdentityDate: {
      get() {
        var original = this.innerStudent.IdentityDate.split("/");
        return original[2] + "-" + original[1] + "-" + original[0];
      },
      set(newVal) {
        var newDate = new Date(newVal).toLocaleDateString("en-GB");
        this.innerStudent.IdentityDate = newDate;
      },
    },
    JoinDate: {
      get() {
        var original = this.innerStudent.JoinDate.split("/");
        return original[2] + "-" + original[1] + "-" + original[0];
      },
      set(newVal) {
        var newDate = new Date(newVal).toLocaleDateString("en-GB");
        this.innerStudent.JoinDate = newDate;
      },
    },
  },
  methods: {
    closeDialog() {
      this.$emit("on-close");
    },
    submitDialog() {
      this.$emit("on-dialog-submitted", this.innerStudent);
    },
  },
};
</script>

<style scoped></style>
