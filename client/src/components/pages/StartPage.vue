<template>
  <div class="body">

    <header-block :filter="filterList" :status-list="statusList"></header-block>

    <div class="content">

      <desk-item
        v-for="(desk, deskIndex) in deskList"
        :key="deskIndex"
        :desk="desk"
        :status-list="statusList"
      ></desk-item>

    </div>

    <footer-block></footer-block>

  </div>
</template>

<script>
  /*
  * TODO: в desk-item нужно передавать массив задач пользователя
  * */


  // Components
  import headerBlock from '@/components/Header';
  import footerBlock from '@/components/Footer';
  import DeskItem from '@/components/desks/DeskItem';

  // Services
  import DesksService from '@/services/DesksService';
  import FileService from '@/services/FileService';

  export default {
    name: 'desks-list-page',
    components: {
      headerBlock,
      footerBlock,
      DeskItem
    },
    data() {
      return {
        taskList: {
          type: Array
        },
        statusList: [],
        versionList: [],
        filterList: [],
        /*filterList: {
          type: Array,
          default: []
        },*/
        deskList: {},
      }
    },
    methods: {
      getStatusList() {
        this.statusList = FileService.getTaskStatusList();
      },
      getVersionList() {
        this.versionList = FileService.getVersionList();
      },
      initFilterList() {
        this.filterList = this.versionList;
      },
      getTaskList() {
        this.taskList = FileService.getTaskList();
      },
      getUserList() {
        this.userList = FileService.getUserList();
      },
      refreshDeskList(){

        this.deskList = {};

        if(this.taskList.length > 0
        && this.statusList.length > 0
        && this.userList.length > 0) {

          for (let taskIndex in this.taskList) {

            if (this.taskList.hasOwnProperty(taskIndex)) {
            
              let curUserId = this.taskList[taskIndex].user.id;

              // если юзеhа нет, то добавляем объект в массив
              if (!this.checkDeskListUser(curUserId)) {

                let newDeskItem = {
                  user: this.taskList[taskIndex].user,
                  taskList: []
                };

                newDeskItem.taskList.push(this.taskList[taskIndex]);

                //this.deskList.push(newDeskItem);
                this.deskList[curUserId] = newDeskItem;

              }
              //если задачи юзера уже есть
              else {

                //deskIndex - в данном случае сюда попадают id пользователей
                /*for (let deskIndex in this.deskList) {
                  if(this.deskList.hasOwnProperty(deskIndex) && this.deskList[deskIndex].user.id === curUserId) {

                    this.deskList[deskIndex].taskList.push(this.taskList[taskIndex]);
                    break;
                  }
                }*/
                this.deskList[curUserId].taskList.push(this.taskList[taskIndex]);
              }
            }
          }
        }
      },
      checkDeskListUser (userId) {
        if (this.deskList.length === 0) {
          return false;
        }
        else {

          for (let deskIndex in this.deskList) {

            if(this.deskList.hasOwnProperty(deskIndex)
              && this.deskList[deskIndex].hasOwnProperty('user')
              && this.deskList[deskIndex].user.hasOwnProperty('id')
              && this.deskList[deskIndex].user.id === userId) {
              return true;
            }
          }

          return false;
        }
      }
    },
    mounted: function () {
      this.getStatusList();
      this.getVersionList();
      this.initFilterList();
      this.getTaskList();
      this.getUserList();

      this.refreshDeskList();
    },
    watch: {
      taskList: function () {
        this.refreshDeskList();
      }
    }
  }
</script>

<style>
  .content {
  padding: 0 10px;
  }
</style>