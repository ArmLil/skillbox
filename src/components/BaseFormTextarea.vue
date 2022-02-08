<template lang="html">
  <BaseFormField :title="title" :error="error">
    <textarea
      class="form__input form__input--area"
      type="text"
      v-model="dataValue"
      placeholder="placeholder"
    />
  </BaseFormField>
</template>

<script>
import FormFieldMixin from "@/mixins/FormFieldMixin";

export default {
  mixins: [FormFieldMixin]
};
</script>

<style lang="css" scoped></style>
