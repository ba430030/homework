<template>
  <div>
    <panel>
      <template #header>
        <p>账号列表</p>
      </template>
      <template #content>
        <el-table
          @selection-change="handleSelectionChange"
          ref="multipleTable"
          :data="tableData"
          border
          style="width: 100%"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="name" label="账号" width="180"></el-table-column>
          <el-table-column prop="group" label="用户组" width="180"></el-table-column>
          <el-table-column prop="date" label="创建时间" width="180"></el-table-column>
          <el-table-column label="操作">
            <template v-slot="{ row }">
              <el-button @click="editUser(row)" size="mini" type="primary">编辑</el-button>
              <el-button @click="delUser(row.id)" size="mini" type="danger">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
        <template>
          <div class="btns">
            <el-button @click="delAll()" size="small" type="danger">批量删除</el-button>
            <el-button @click="toggleSelection()" size="small" type="primary">取消选择</el-button>
          </div>
        </template>
      </template>
    </panel>
    <el-dialog title="修改账号" :visible.sync="dialogFormVisible">
      <el-form :model="editAccount" label-width="100px" size="mini" class="edit-form">
        <el-form-item label="账号">
          <el-input v-model="editAccount.account" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户组">
          <el-select v-model="editAccount.userGroup">
            <el-option label="普通管理员" value="普通管理员"></el-option>
            <el-option label="超级管理员" value="超级管理员"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="saveEdit" size="mini">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import panel from '@/components/panel/Index.vue'
import { getList, delAccount, batchdel, editAccount } from '@/api/acount.js'

export default {
  components: {
    panel
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 5,
      total: 0,
      tableData: [],
      ids: [],
      dialogFormVisible: false,
      editAccount: {
        id: '',
        account: '',
        userGroup: ''
      }
    }
  },
  created() {
    this.getData()
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val
      this.getData()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getData()
    },
    async getData() {
      if (this.tableData.length === 1 && this.currentPage > 1) {
        this.currentPage--
      }
      const { data, total } = await getList({
        currentPage: this.currentPage,
        pageSize: this.pageSize
      })
      this.tableData = []
      data.forEach((item) => {
        this.tableData.push({
          name: item.account,
          date: item.ctime,
          group: item.userGroup,
          id: item.id,
          img: item.imgUrl
        })
      })
      this.total = total
    },
    delUser(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const data = await delAccount({ id })
          if (data.code === 0) {
            this.getData()
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    handleSelectionChange(val) {
      this.ids = []
      val.forEach((item) => {
        this.ids.push(item.id)
      })
      console.log(this.ids)
    },
    toggleSelection(rows) {
      this.$refs.multipleTable.clearSelection()
    },
    delAll() {
      this.$confirm('确定全部删除吗, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const data = await batchdel({ ids: JSON.stringify(this.ids) })
          if (data.code === 0) {
            this.getData()
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    editUser(row) {
      console.log(row)
      this.editAccount.account = row.name
      this.editAccount.id = row.id
      this.editAccount.userGroup = row.group
      this.dialogFormVisible = true
    },
    async saveEdit() {
      const data = await editAccount(this.editAccount)
      if (data.code === 0) {
        this.getData()
        this.dialogFormVisible = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
.el-table {
  margin: 20px 0;
}
.btns {
  margin: 20px 0;
}
.edit-form {
  width: 200px;
  .el-input {
    width: 200px;
  }
  .el-select {
    width: 200px;
  }
}
</style>
