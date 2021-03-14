<template>
  <tbody>
    <tr v-for="(record, idx) in records" :key="record.id">
      <td v-for="(item, index) in getFormattedRecord(idx)" :key="index">{{ item }}</td>
      <td>
        <button
          v-if="receiptHasAttatchment(record)"
          class="btn btn-sm btn-outline-primary mx-1"
          @click="openDisplay(record)"
        >
          عرض
        </button>
        <router-link v-if="permissions.canEdit" :to="`/receipts/${record.ContractId}/edit/${record.id}`">
          <button class="btn btn-sm btn-outline-warning mx-1">تعديل</button>
        </router-link>
        <button
          v-if="permissions.canDelete"
          class="btn btn-sm btn-outline-danger mx-1"
          @click="handleDelete(record.id)"
        >
          حذف
        </button>
      </td>
      <slot />
    </tr>
  </tbody>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import ReceiptModel from '../../model/Receipt'
export default Vue.extend({
  inject: ['openPopup', 'closePopup', 'openDisplay', 'selectId'],
  computed: {
    ...mapGetters('receipts', ['records', 'isGettingData', 'headers']),
    ...mapGetters('users', ['permissions']),
  },
  methods: {
    receiptHasAttatchment(receipt) {
      return receipt.ReceiptAttachments?.length
    },
    getFormattedRecord(index) {
      return this.headers.map(want => {
        return ReceiptModel.Attributes[want].render(this.records[index][want])
      })
    },
    handleDelete(id) {
      this.selectId(id)
      this.openPopup()
    },
    handleView(id) {
      this.$router.push(`/receipts/view/${id}`)
    },
  },
})
</script>

<style lang="scss" scoped>
.delete- {
  &leave-to,
  &enter {
    opacity: 0;
    transform: translateX(30px);
  }
  &leave-active {
    position: absolute;
  }
}
tr {
  transition: all 0.65s;
}
</style>
