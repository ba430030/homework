<template>
  <div>
    <panel>
      <template #header>
        <p>商品列表</p>
      </template>
      <template #content>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="商品ID">
                  <span>{{ props.row.id }}</span>
                </el-form-item>
                <el-form-item label="商品名称">
                  <span>{{ props.row.name }}</span>
                </el-form-item>
                <el-form-item label="所属分类">
                  <span>{{ props.row.category }}</span>
                </el-form-item>
                <el-form-item label="商品价格">
                  <span>{{ props.row.price }}</span>
                </el-form-item>
                <el-form-item label="商品图片">
                  <el-image
                    style="width: 100px; height: 100px"
                    :src="'http://127.0.0.1:5000/upload/imgs/goods_img/'+props.row.imgUrl"
                  ></el-image>
                </el-form-item>
                <el-form-item label="创建时间">
                  <span>{{ props.row.ctime }}</span>
                </el-form-item>
                <el-form-item label="商品评价">
                  <span>{{ props.row.rating }}</span>
                </el-form-item>
                <el-form-item label="商品销量">
                  <span>{{ props.row.sellCount }}</span>
                </el-form-item>
                <el-form-item label="商品描述">
                  <span>{{ props.row.goodsDesc }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column label="商品名称" prop="name"></el-table-column>
          <el-table-column label="所属分类" prop="category"></el-table-column>
          <el-table-column label="商品价格" prop="price"></el-table-column>
          <el-table-column label="商品图片" prop="imgUrl">
            <template v-slot="{row}">
              <el-image
                style="width: 100px; height: 100px"
                :src="'http://127.0.0.1:5000/upload/imgs/goods_img/'+row.imgUrl"
              ></el-image>
            </template>
          </el-table-column>
          <el-table-column label="商品描述" prop="goodsDesc"></el-table-column>
          <el-table-column label="操作" width="150px">
            <template v-slot="{row}">
              <el-button type="primary" size="mini">编辑</el-button>
              <el-button type="danger" size="mini" @click="delPro(row.id)">删除</el-button>
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
  </div>
</template>

<script>
import panel from '@/components/panel/Index.vue'
import { proGet, proDel } from '@/api/product.js'

export default {
  components: {
    panel
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 5,
      total: 0,
      tableData: []
    }
  },
  created() {
    this.getData()
  },
  methods: {
    async getData() {
      if (this.tableData.length === 1 && this.currentPage > 1) {
        this.currentPage--
      }
      const { data, total } = await proGet({
        currentPage: this.currentPage,
        pageSize: this.pageSize
      })
      this.tableData = []
      this.tableData = data
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
    delPro(id) {
      this.$confirm('确定要删除该商品吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const data = await proDel({ id })
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
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.el-pagination {
  margin: 20px 0;
}
</style>
