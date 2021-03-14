<template>
  <tr>
    <td colspan="100" class="border py-3">
      <table class="table">
        <thead>
          <tr>
            <th>what</th>
            <th>A</th>
            <th>B</th>
            <th>C</th>
          </tr>
        </thead>
        <tbody>
          <slot></slot>
        </tbody>
      </table>
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    isShown: {
      default: true,
    },
  },
};
</script>
