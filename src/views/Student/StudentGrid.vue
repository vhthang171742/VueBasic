<template>
  <div class="grid">
    <div class="table-scroll">
      <table cellspacing="0">
        <thead>
          <tr>
            <th v-for="column in innerColumns" :key="column.columnName">
              {{ column.columnText }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            class=""
            v-for="student in studentList"
            :key="student.StudentId"
            @click="
              selectRow(student);
              $event.currentTarget.classList.toggle('selected-row');
            "
            @dblclick="openEditDialog(student)"
          >
            <td v-for="column in innerColumns" :key="column.columnName">
              <span :title="student[column.columnName]">{{
                student[column.columnName]
              }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="grid-loading">
      <div class="grid-loading-modal"></div>
      <div class="grid-loading-icon"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      innerColumns: this.columns,
      selectedRows: Array,
      dblClickedRow: Object,
    };
  },
  props: {
    columns: Array,
    studentList: Array,
  },
  methods: {
    selectRow(student) {
      this.$emit("on-row-select", student);
    },
    openEditDialog(student) {
      this.$emit("on-edit-dialog-open", student);
    },
  },
};
</script>
