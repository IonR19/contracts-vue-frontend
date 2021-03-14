<template>
  <table class="table table-striped">
    <thead>
      <table-head>
        <th v-for="(data, idx) in titles" :colspan="colSizes[idx]" :key="idx">{{ data }}</th>
      </table-head>
    </thead>
    <table-body></table-body>
    <!-- <table-cell></table-cell> -->
  </table>
</template>

<script>
// import tableCell from './TableRow'
import tableHead from './TableHead'
import TableBody from './TableBody'
import { mapActions } from 'vuex'
export default {
  created() {
    this.loadData()
  },
  provide() {
    return {
      colSizes: this.colSizes,
      tableData: this.sampleDataTable,
      selectReceipt: this.selectReceiptbyId,
    }
  },
  data() {
    return {
      selectedReceiptId: null,
      titles: ['رقم العقد', 'اسم العقد', 'الشركة المنفذة', 'نسبة الانجاز', 'القيمة المالية', 'أدوات'],
      colSizes: new Array(6).fill(1),
    }
  },
  methods: {
    selectReceiptbyId(id) {
      this.selectedReceiptId = id
    },
    ...mapActions({
      loadData: 'contracts/downloadContent',
    }),
  },
  components: {
    // tableCell,
    tableHead,
    TableBody,
  },
}
</script>

<style>
table {
  text-align: center;
}
#btns {
  position: fixed;
  height: 3.5rem;
  width: 3.5rem;
  top: 7rem;
  right: 3rem;
  border-radius: 50%;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
  transform: scaleY(1);
  transform-origin: top;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: scaleY(0);
}

.trasition {
  transition: all 0.3s;
}
</style>
