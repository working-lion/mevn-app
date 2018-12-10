<template>

  <modal-form-view
    :task="task">

    <template slot="header">
      Редактировать задачу <b>{{ task.number }}</b>
    </template>

    <template slot="body">
      <form>
        <div class="form-row">
          <label for="edit-task-title">Название:</label>
          <input id="edit-task-title" type="text" v-model="task.title">
        </div>
        <div class="form-row">
          <label for="edit-task-deskr">Описание:</label>
          <textarea id="edit-task-deskr" v-model="task.description"></textarea>
        </div>
        <div class="form-row-3">
          <div class="form-row">
            <label for="edit-task-type">Тип:</label>
            <select id="edit-task-type" v-model="task.type.name">
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </div>
          <div class="form-row">
            <label for="edit-task-priority">Приоритет:</label>
            <select id="edit-task-priority" v-model="task.priority.name">
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </div>
          <div class="form-row">
            <label for="edit-task-version">Версия продукта:</label>
            <select id="edit-task-version" v-model="task.version.name">
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </div>
        </div>
        <div class="form-row">
          <label for="edit-task-user">Исполнитель:</label>
          <select id="edit-task-user" v-model="task.user.name">
            <option value="1">1</option>
            <option value="2">2</option>
          </select>
        </div>
      </form>
    </template>

    <template slot="btn-text">Сохранить</template>

  </modal-form-view>

</template>

<script>
  // components
  import ModalFormView from '@/components/forms/ModalFormView';

  export default {

    /*
    * TODO:
    * 1) получить массивы свойст задачи для вывода в select
    * 2) из задачи нужно создать новый объектв
    * 3) к этому объекту привязать поля формы
    * 4) обновлять задачу только по клику
    * 5) очищать форму после редактирования задачи
    * */

    name: 'edit-task-form',
    components: {
      ModalFormView
    },
    props: {
      task: Object
    },
    data() {
      return {
        taskClon: {}
      }
    },
    methods: {
      close() {
        this.$emit('close');
      },
      submitForm(){
        this.$emit('submit-form');
      }
    },
  }
</script>