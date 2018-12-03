<template>
  <div class="body">

    <header-block></header-block>

    <div class="content">

      <div class="desk-header">
        <div class="desk-header-left"><span class="desk-name">{{ desk.title }}</span></div>
        <div class="desk-header-right"><a href="#" class="desk-menu">меню</a></div>
      </div>

      <div class="desk-body">
        <div class="column-list-scroll">

          <task-list
            v-for="taskList in desk.list"
            :key="taskList._id"
            :task-list="taskList"
            v-on:open-modal="openModal"
          ></task-list>

        </div>

        <modal
          v-show="isModalVisible"
          @close="closeModal"
          v-on:submit-form="addTask"
        >
          <template slot="header">
            Добавить новую задачу
          </template>
          <template slot="body">
            <form>
              <div class="form-row">
                <label for="add-desk-title">Введите название задачи:</label>
                <input id="add-desk-title" type="text" v-model="addTaskData.title">
              </div>
            </form>
          </template>
          <template slot="btn-text">Добавить</template>
        </modal>

      </div>

    </div>

    <footer-block></footer-block>

  </div>
</template>

<script>
  // Components
  import headerBlock from '@/components/Header'
  import footerBlock from '@/components/Footer'
  import taskList from '@/components/tasks/TaskList'
  import modal from '@/components/forms/ModalForm';

  // Services
  import DesksService from '@/services/DesksService'

  var deskId = '5bfebc83ea132727dcb26da2';

  export default {
    name: 'task-list-page',
    components: {
      taskList,
      headerBlock,
      footerBlock,
      modal
    },
    data() {
      return {
        desk: {},
        isModalVisible: false,
        addTaskData: {
          _id: '',
          title: ''
        }
      }
    },
    methods: {
      openModal(){
        this.isModalVisible = true;
      },
      closeModal(){
        this.isModalVisible = false;
      },
      async addTask(){
        let response = await  DesksService.addNewTask({
          title: addTaskData.title
        });

        /*TODO: получить ключ списка задач, в который добавляем задачу*/
        let listKey = 0;

        if (response.data.success === true) {
          this.addTaskData._id = response.data._id;

          this.desk.list[listKey].push(this.addDeskData);

          closeModal();
          /*TODO:
          * 1) При добавлении второй задачи первая меняется*/
        }
        else {
          //error-message
          console.log(response.data.error);
        }
      },
      async getDesk() {
        const response = await DesksService.getDesk(deskId);
        this.desk = response.data.desk;
      },
    },
    mounted() {
      this.getDesk();
    }
  }
</script>

<style>
  .column-list-scroll {
    display: flex;
    justify-content: flex-start;
  }
  .desk-name {
    font-weight: 600;
  }
  .desk-header a {
    color: #fff;
  }
  .desk-header {
    padding: 10px;
    display: flex;
    justify-content: space-between;
  }
</style>