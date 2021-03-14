<template>
  <transition-group tag="tbody" name="delete" mode="out-in">
    <tr v-for="(record, idx) in records" :key="record.id">
      <td v-for="(item, index) in getFormattedRecord(idx)" :key="index">{{ item }}</td>
      <td>
        <router-link :to="`/contracts/view/${record.id}`">
          <button class="btn btn-sm btn-outline-primary mx-1">عرض</button>
        </router-link>
        <router-link v-if="permissions.canEdit" :to="`/contracts/edit/${record.id}`">
          <button class="btn btn-sm btn-outline-warning mx-1">تعديل</button>
        </router-link>
        <button
          v-if="permissions.canDelete"
          class="btn btn-sm btn-outline-danger mx-1 "
          @click="handleDelete(record.id)"
        >
          حذف
        </button>
      </td>
      <slot />
    </tr>
  </transition-group>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import ContractModel from '../../model/Contract'
export default Vue.extend({
  inject: ['openPop', 'closePop', 'selectId'],
  computed: {
    ...mapGetters('contracts', ['records', 'isGettingData', 'headers']),
    ...mapGetters('users', ['permissions']),
  },
  methods: {
    getFormattedRecord(index) {
      return this.headers.map(want => {
        return ContractModel.Attributes[want].render(this.records[index][want])
      })
    },
    handleDelete(id) {
      this.selectId(id)
      this.openPop()
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
