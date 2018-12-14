<template>
  <div class="filter-options-block">
    <div class="filter-options">
      <div class="option-item"
        v-for="filterItem in filterOptions"
        :key="filterItem.id"
      >
        <input type="checkbox"
          v-model="filterItem.isActive"
          :id="filterItem.id"
          :checked="filterItem.isActive"
          v-on:change="itemClickHandler()"
        />
        <label :for="filterItem.id">{{ filterItem.name }}</label>
      </div>
    </div>
  </div>
</template>

<script>
  // bus
  import { bus } from '@/main';

  export default {
    name: 'filter-options-list',
    props: {
      filterOptions: {
        type: Array
      },
    },
    methods: {
      itemClickHandler() {
        bus.$emit('apply-filter');
      }
    }
  }
</script>

<style scoped>
  .filter-options-block {
    padding-right: 10px;
    margin-right: 10px;
    border-right: 1px solid #fff;
  }
  .filter-options {
    display: flex;
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .filter-options-block:last-child {
    margin-right: 0;
    padding-right: 0;
    border: none;
  }
  .option-item {
    margin-right: 7px;
  }
  .option-item:last-child {
    margin-right: 0;
  }
  .option-item input[type="checkbox"] {
    display: none;
  }
  .option-item label {
    padding: 3px 7px;
    border-radius: 2px;
    cursor: pointer;
  }
  .option-item input[type="checkbox"]:checked + label {
    color: #323232;
    background: #fff;
  }
</style>