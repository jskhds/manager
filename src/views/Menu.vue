<template>
  <div class="user-manage">
    <div class="query-form">
      <el-form ref="form" :inline="true" :model="queryForm">
        <el-form-item label="菜单名称" prop="menuName">
          <el-input v-model="queryForm.menuName" placeholder="请输入菜单名称" />
        </el-form-item>
        <el-form-item label="菜单状态" prop="menuState">
          <el-select v-model="queryForm.menuState">
            <el-option :value="1" label="正常"></el-option>
            <el-option :value="2" label="停用"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="handleQuery">查询</el-button>
          <el-button @click="handleReset('form')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="base-table">
      <div class="action">
        <el-button type="primary" @click="handleAdd(1)">新增</el-button>
      </div>
      <!-- 树形菜单，虽然页面看起来层级多，但其实很简单，就是服务端接口实现+ep自带的控件 -->
      <el-table 
      :data="menuList" 
      row-key="_id"
      :tree-props="{ children: 'children' }">
        
        <el-table-column
          v-for="item in columns"
          :key="item.prop"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          :formatter="item.formatter"
        >
        </el-table-column>
        <el-table-column label="操作" width="210">
          <template #default="scope">
            <el-button @click="handleAdd(2,scope.row)" size="mini"
              >新增</el-button
            >
            <el-button @click="handleEdit(scope.row)" size="mini"
              >编辑</el-button
            >
            <el-button type="danger" size="mini" @click="handleDel(scope.row._id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>

    </div>
    <!-- 菜单新增 -->
    <!-- 以前用 v-if 和 v-show 来控制，现在用的是 v-model -->
     <el-dialog title="用户新增" v-model="showModal"
     :rules = "rules">
      <el-form
        ref="dialogForm"
        :model="menuForm"
        label-width="100px"
        :rules="rules"
      >
        <el-form-item label="父级菜单" prop="parentId">
          <!-- 级联选择器 -->
          <el-cascader
           v-model="menuForm.parentId"
            :options="menuList"
            :props="{ checkStrictly: true, value: '_id', label: 'menuName' }"
            clearable
          />
           <span>不选,则直接创建一级菜单</span>
        </el-form-item>

        <el-form-item label="菜单类型" prop="menuType">
          <el-radio-group v-model="menuForm.menuType">
            <el-radio :label="1">菜单</el-radio>
            <el-radio :label="2">按钮</el-radio>
          </el-radio-group>
        </el-form-item>


       <el-form-item label="菜单名称" prop="menuName">
          <el-input v-model="menuForm.menuName" placeholder="请输入菜单名称" />
        </el-form-item>

        <el-form-item
          label="菜单图标"
          prop="icon"
          v-show="menuForm.menuType == 1"
        >
          <el-input v-model="menuForm.icon" placeholder="请输入岗位" />
        </el-form-item>

        <!-- 路由地址是要输入的，不然后台没有 path 会出错 -->
        <el-form-item
          label="路由地址"
          prop="path"
          v-show="menuForm.menuType == 1"
        >
          <el-input v-model="menuForm.path" placeholder="请输入路由地址" />
        </el-form-item>


        <el-form-item
          label="权限标识"
          prop="menuCode"
          v-show="menuForm.menuType == 2"
        >
          <el-input v-model="menuForm.menuCode" placeholder="请输入权限标识" />
        </el-form-item>


        <el-form-item
          label="组件路径"
          prop="component"
          v-show="menuForm.menuType == 1"
        >
          <el-input v-model="menuForm.component" placeholder="请输入组件路径" />
        </el-form-item>

        
         <el-form-item
          label="菜单状态"
          prop="menuState"
          v-show="menuForm.menuState == 1"
        >
          <el-radio-group v-model="menuForm.menuState">
            <el-radio :label="1">正常</el-radio>
            <el-radio :label="2">停用</el-radio>
          </el-radio-group>
        </el-form-item>

      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleClose">取 消</el-button>
          <el-button type="primary" @click="handleSubmit">确 定</el-button>
        </span>
      </template>
    </el-dialog> 
  </div>
</template>
<script>
import utils from "./../utils/utils";
export default {
  name: "menu",
  data() {
    return {
      queryForm: {
        menuState: 1,
        menuName:""
      },

      menuList: [],
      //   每一列的格式
      columns: [
        {
          label: "菜单名称",
          prop: "menuName",
          width: 150,
        },
        {
          label: "图标",
          prop: "icon",
        },
        {
          label: "菜单类型",
          prop: "menuType",
          formatter(row,column,value){
            return{
              1:"菜单",
              2:"按钮",
            }[value];
          },
          
        },
        {
          label: "权限标识",
          prop: "menuCode",
           
        },
        {
          label: "路由地址",
          prop: "path",
           
        },
        {
          label: "组件路径",
          prop: "component",
        },
        {
          label: "菜单状态",
          prop: "menuState",
          
          formatter(row,column,value){
            return{
              1:"正常",
              2:"停用",
            }[value];
          }
        },
        {
          label: "创建时间",
          prop: "createTime",
          formatter(row,column,value){
            return utils.formateDate(new Date(value))
          },
          width:200
        },
      ],
      showModal: false,
      menuForm: {
        parentId: [null],
        menuType: 1,
        menuState: 1,
      },
      action:"",
      rules: {
        menuName: [
          {
            required: true,
            message: "请输入菜单名称",
            trigger: "blur",
          },
          {
            min: 2,
            max: 10,
            message: "长度在2-8个字符",
            trigger: "blur",
          },
        ],
      },
    };

  },
  mounted() {
    this.getMenuList();
  },
  methods: {
    async getMenuList() {
      try {
        let list = await this.$api.getMenuList(this.queryForm);
        this.menuList = list;
      } catch (e) {
        throw new Error(e);
      }
    },
    handleQuery() {

    },
    // 表单重置
    handleReset(form) {
      this.$refs[form].resetFields();
    },
    handleAdd(type, row) {
      this.showModal = true;
      this.action = "add";
      // type == 1 的时候不用潘墩
      if(type==2){
        this.menuForm.parentId = [...row.parentId, row._id].filter((item)=>item);
      }
    },
    // 编辑
     handleEdit(row) {
      this.showModal = true;
      this.action = "edit";
      this.$nextTick(() => {
        Object.assign(this.menuForm, row);  // 对应到初始化时表单里的值，所以需要用 nextTick，不然初始化时有值
      });
    },
    // 删除：包含的子菜单都需要删除
    async handleDel(_id) {
      await this.$api.menuSubmit({ _id, action: "delete" });
      this.$message.success("删除成功");
      this.getMenuList();
    },
    handleSubmit() {
      this.$refs.dialogForm.validate(async (valid) => {
        if (valid) {
          let { action, menuForm } = this;
          let params = { ...menuForm, action };
          let res = await this.$api.menuSubmit(params);
          this.showModal = false;
          this.$message.success("操作成功");
          this.handleReset("dialogForm");
          this.getMenuList();
        }
      });
    },
    handleClose(){
      this.showModal = false;
      this.handleReset("dialogForm");
    }
  },
};
</script>

<style lang="scss"></style>
