<template>
  <div class="filter">
    <div class="filter-title">{{ title }}:</div>

    <filter-options-list
      v-for="(filterOptions, filterOptionsKey) in filterList"
      :key="filterOptionsKey"
      :filter-options="filterOptions"
    ></filter-options-list>

      <span class="filter-clear" @click="clearFilter" title="Очистить фильтр">&times;</span>

  </div>
</template>

<script>
  // bus
  import {bus} from '@/main';

  // components
  import filterOptionsList from '@/components/filter/FilterOptionsList';

  export default {
    name: 'filter-block',
    components: {
      filterOptionsList
    },
    data() {
      return {
        title: 'Фильтр',

        // тянется из vuex, чтобы не передавать через два свойства
        filterList: {}
      }
    },
    methods: {
      getFilters() {
        this.filterList = this.$store.getters.FILTERS;
      },
      clearFilter () {

        for (let optionKey in this.filterList) {
          if (this.filterList.hasOwnProperty(optionKey)) {

            for (let itemKey in this.filterList[optionKey]) {
              if (this.filterList[optionKey].hasOwnProperty(itemKey)) {

                this.filterList[optionKey][itemKey].isActive = false;
              }
            }
          }
        }

        bus.$emit('apply-filter');
      }
    },
    created: function () {
      this.getFilters();
    },
  }
</script>

<style scoped>
  .filter {
    display: flex;
    align-items: center;
  }
  .filter-title {
    font-weight: 600;
    margin-right: 20px;
  }
  .filter-options li {
    padding: 3px 10px;
    border-radius: 3px;
    margin-right: 5px;
    cursor: pointer;
    font-size: 18px;
    transition: background-color 0.3s;
  }
  .filter-options li.active, .filter-options li:hover, .filter-clear:hover {
    color: #666;
    background: #fff;
    transition: background-color 0.3s;
  }
  .filter-options li:last-child {
    margin-right: 0;
  }
  .filter-clear {
    cursor: pointer;
    padding: 3px 6px;
    line-height: 1;
    border-radius: 3px;
  }
</style>