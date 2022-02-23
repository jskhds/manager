<template>
  <div class="dept-manage">
    <div class="query-form">
      <el-form ref="queryForm" :inline="true" :model="queryForm">
        <el-form-item label="部门名称" prop="roleName">
          <el-input v-model="queryForm.deptName" placeholder="请输入部门名称" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getdeptList">查询</el-button>
          <el-button @click="handleReset('queryForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="base-table">
      <div class="action">
        <el-button type="primary" @click="handleOpen">创建</el-button>
      </div>
      <el-table
        :data="deptList"
        row-key="_id"
        :tree-props="{ children }"
        stripe
      >
        <el-table-column v-for="item in columns" :key="item.prop" v-bind="item">
        </el-table-column>
        <el-table-column label="操作" width="260">
          <template #default="scope">
            <el-button size="mini" @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button
              type="danger"
              size="mini"
              @click="handleDel(scope.row._id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog
      :title="action == 'create' ? '创建部门' : '编辑部门'"
      v-model="showModal"
    >
      <el-form
        ref="dialogForm"
        :model="deptForm"
        :rules="rules"
        label-width="120px"
      >
        <el-form-item label="上级部门" prop="parentId">
          <el-cascader
            placeholder="请选择上级部门"
            v-model="deptForm.parentId"
            :props="{ checkStrictly: true, value: '_id', label: 'deptName' }"
            clearable
            :options="deptList"
            :show-all-levels="true"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="部门名称" prop="deptName">
          <el-input
            placeholder="请输入部门名称"
            v-model="deptForm.deptName"
          ></el-input>
        </el-form-item>
        <el-form-item label="负责人" prop="user">
          <!-- 选择了部门负责人的时候需要绑定事件，把邮箱信息拿到 -->
          <el-select
            placeholder="请选择部门负责人"
            v-model="deptForm.user"
            @change="handleUser"
          >
            <el-option
              v-for="item in userList"
              :key="item.userId"
              :label="item.userName"
              :value="`${item.userId}/${item.userName}/${item.userEmail}`"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="负责人邮箱" prop="userEmail">
          <el-input
            placeholder="请输入负责人邮箱"
            v-model="deptForm.userEmail"
            disabled
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleClose">取消</el-button>
          <el-button @click="handleSubmit" type="primary">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script>
import utils from "../utils/utils";
export default {
  name: "dept",
  data() {
    return {
      queryForm: {
        deptName: "",
      },
      deptList: [],
      columns: [
        {
          label: "部门名称",
          prop: "deptName",
        },
        {
          label: "负责人",
          prop: "userName",
        },
        {
          label: "更新时间",
          prop: "updateTime",
        },
        {
          label: "创建时间",
          prop: "createTime",
        },
      ],
      pager: {
        pageNum: 1,
        pageSize: 10,
      },
      action: "create",
      showModal: false,
      deptForm: {
        parentId: [null],
      },
      userList: [],
      rules: {
        parentId: [
          {
            required: true,
            message: "请选择上级部门",
            trigger: "blur",
          },
        ],
        deptName: [
          {
            required: true,
            message: "请输入部门名称",
            trigger: "blur",
          },
        ],
        user: [
          {
            required: true,
            message: "请选择负责人",
            trigger: "blur",
          },
        ],
      },
    };
  },
  mounted() {
    this.getDeptList(), this.getAllUserList();
  },
  methods: {

    async getDeptList() {
      try {
        let list = await this.$api.getDeptList(this.queryForm);
        this.deptList = list;
      } catch (err) {
         console.log(err.stack);
      }
    },
    async getAllUserList() {
      try {
        let list = await this.$api.getAllUserList();
        this.userList = list;
      } catch (err) {
        console.log(err.stack);
      }
    },
    handleUser(val) {
      //  console.log(val) user: '1000002/admin/admin@imooc.com'
      const [userId, userName, userEmail] = val.split("/");
      Object.assign(this.deptForm, { userId, userName, userEmail });
    },
    handleReset(form) {
      this.$refs[form].resetFields();
    },
    handleOpen() {
      this.action = "create";
      this.showModal = true;
    },
    handleEdit(row) {
      this.action = "edit";
      this.showModal = true;
      this.$nextTick(() => {
        Object.assign(this.deptForm, row, {
          // 弹框中的负责人字段 需要从 row 的这三个字段拼接过来
          user: `${row.userId}/${row.userName}/${row.userEmail}`,
        });
      });
    },
    async handleDel(_id) {
      this.action = "delete";
      let res = await this.$api.deptOperate({ _id, action: this.action });
      if (res) {
        this.$message.success("操作成功");
        this.getDeptList();
      }
    },
    handleClose() {
      this.showModal = false;
      this.handleReset("dialogForm");
    },
    handleSubmit() {
      this.$refs.dialogForm.validate(async (valid) => {
        if (valid) {
          let params = { ...this.deptForm, action: this.action };
          delete params.user;
          await this.$api.deptOperate(params);
            //   this.showModal = false;
            this.$message.success("操作成功");
            this.handleClose();
            this.getDeptList();
          
        }
      });
    },
  },
};
</script>

<style lang="scss"></style>
