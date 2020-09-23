<template>
  <div>
    <panel>
      <template #header>
        <div class="header-box">
          <span>商品分类</span>
          <el-button @click="addCate = true" type="primary" size="mini">添加分类</el-button>
        </div>
      </template>
      <template #content>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column type="index" label="序号" width="50"></el-table-column>
          <el-table-column label="分类名称">
            <template v-slot="{row}">
              <span v-if="row.isEdit">{{row.cateName}}</span>
              <el-input v-else v-model="row.cateName" size="mini"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="是否启用">
            <template v-slot="{row}">
              <el-switch
                v-model="row.state"
                :disabled="row.isEdit"
                active-color="#13ce66"
                inactive-color="#ff4949"
              ></el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template v-slot="{row}">
              <el-button
                :type="row.isEdit?'primary':'success'"
                size="mini"
                @click="editCate(row.id,row.isEdit)"
              >{{row.isEdit?'编辑':'完成'}}</el-button>
              <el-button @click="delCate(row.id)" type="danger" size="mini">删除</el-button>
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
      </template>
    </panel>
    <el-dialog title="添加分类" :visible.sync="addCate">
      <el-form :model="cateForm" label-width="150px" size="mini" :rules="rules" ref="addCateRef">
        <el-form-item label="分类名称" prop="cateName">
          <el-input v-model="cateForm.cateName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否启用">
          <el-switch v-model="cateForm.state" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addCate = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="addProductCate" size="mini">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import panel from '@/components/panel/Index.vue'
import { getCateList, cateEdit, cateAdd, cateDel } from '@/api/product.js'

export default {
  components: {
    panel
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 5,
      total: 0,
      addCate: false,
      tableData: [],
      cateForm: {
        cateName: '',
        state: true
      },
      rules: {
        cateName: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getData()
  },
  methods: {
    async getData() {
      // 删除之后，如果是大于1的页码，并且删除后本地数据只有一条，就往前翻一页
      if (this.tableData.length === 1 && this.currentPage > 1) {
        this.currentPage--
      }
      const { data, total } = await getCateList({
        currentPage: this.currentPage,
        pageSize: this.pageSize
      })
      this.tableData = []
      data.forEach((item) => {
        item.state = Boolean(item.state)
        item.isEdit = true
        this.tableData.push(item)
      })
      this.total = total
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getData()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getData()
    },
    async editCate(id, status) {
      const item = this.tableData.find((item) => item.id === id)
      if (status) {
        item.isEdit = false
      } else {
        const data = await cateEdit(item)
        if (data.code === 0) {
          item.isEdit = true
        }
      }
    },
    addProductCate() {
      // 验证一下表单
      this.$refs.addCateRef.validate(async (valid) => {
        if (valid) {
          const data = await cateAdd(this.cateForm)
          if (data.code === 0) {
            this.getData()
            this.cateForm.cateName = ''
            this.cateForm.state = true
          }
          this.addCate = false
        } else {
          this.$message.error('验证不通过')
          return false
        }
      })
    },
    delCate(id) {
      this.$confirm('是否删除这个分类?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          // 进入这里代表确认删除
          const data = await cateDel({ id })
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
    }
  }
}
</script>

<style lang="less" scoped>
.header-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
}
.el-pagination {
  margin: 20px 0;
}
.addInput {
  width: 200px;
}
</style>
