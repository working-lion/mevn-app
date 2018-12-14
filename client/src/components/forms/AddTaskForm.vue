<template>

  <modal-form-view v-if="isActive" v-on:submit-form="saveTask" v-on:close="close">

    <template slot="header">
      Добавить задачу <b>{{ formData.number }}</b>
    </template>

    <template slot="body">
      <form>
        <div class="form-row">
          <label for="edit-task-title">Название:</label>
          <input id="edit-task-title"
                 type="text"
                 v-model="formData.title"
                 :class="{error: errors.hasOwnProperty('title')}"
                 @change="validateFormData"
          >
        </div>
        <div class="form-row">
          <label for="edit-task-deskr">Описание:</label>
          <textarea id="edit-task-deskr"
                    v-model="formData.description"
                    :class="{error: errors.hasOwnProperty('description')}"
                    @change="validateFormData"
          >
          </textarea>
        </div>
        <div class="form-row-2">
          <div class="form-row">
            <label for="edit-task-priority">Приоритет:</label>
            <select id="edit-task-priority"
                    v-model="formData.priority"
                    :class="{error: errors.hasOwnProperty('priority')}"
                    @change="validateFormData"
            >
              <option v-for="priorityItem in priorities">{{ priorityItem.name }}</option>
            </select>
          </div>
          <div class="form-row">
            <label for="edit-task-type">Тип:</label>
            <select id="edit-task-type"
                    v-model="formData.type"
                    :class="{error: errors.hasOwnProperty('type')}"
                    @change="validateFormData"
            >
              <option v-for="typeItem in types">{{ typeItem.name }}</option>
            </select>
          </div>
        </div>
        <div class="form-row-2">
          <div class="form-row">
            <label for="edit-task-version">Версия продукта:</label>
            <select id="edit-task-version"
                    v-model="formData.version"
                    :class="{error: errors.hasOwnProperty('version')}"
                    @change="validateFormData"
            >
              <option v-for="versionItem in versions">{{ versionItem.name }}</option>
            </select>
          </div>
          <div class="form-row">
            <label for="edit-task-status">Статус:</label>
            <select id="edit-task-status"
                    v-model="formData.status"
                    :class="{error: errors.hasOwnProperty('status')}"
                    @change="validateFormData"
            >
              <option v-for="statusItem in statuses">{{ statusItem.name }}</option>
            </select>
          </div>
        </div>
        <div class="form-row">
          <label for="edit-task-user">Исполнитель:</label>
          <select id="edit-task-user"
                  v-model="formData.user"
                  :class="{error: errors.hasOwnProperty('user')}"
                  @change="validateFormData"
          >
            <option v-for="userItem in users">{{ userItem.name }}</option>
          </select>
        </div>
      </form>
    </template>

    <template slot="btn-text">Сохранить</template>

  </modal-form-view>

</template>

<script>
  // bus
  import {bus} from '@/main';

  // components
  import ModalFormView from '@/components/forms/ModalFormView';

  export default {
    name: 'add-task-form',
    components: {
      ModalFormView
    },
    data() {
      return {
        task: {},
        // служит для очистки формы
        defaultTask: {
          description: '',
          id: 1,
          number: 'ATGSM-999',
          priority: {
            name: '',
          },
          show: true,
          status: {
            name: '',
          },
          title: '',
          type: {
            name: '',
          },
          user: {
            name: '',
          },
          version: {
            name: '',
          }
        },
        // без начальной инициаллизации не привязывается форма
        formData: {
          id: 1,
          number: 'ATGSM-999',
          title: null,
          description: null,
          status: null,
          version: null,
          priority: null,
          type: null,
          user: null,
          show: null,
        },
        statuses: {},
        versions: {},
        priorities: {},
        types: {},
        users: [],

        errors: {},
        turnOnValidation: false,

        isActive: false,
      }
    },
    methods: {
      close() {
        this.isActive = false;
        this.initTaskDefault();
        this.initFormData();
        this.clearErrors();
      },
      open() {
        this.isActive = true;
      },
      submitForm() {
        // this.$emit('submit-form');
        console.log('Отправить форму');
      },
      getStatusList() {
        this.statuses = this.$store.getters.STATUSES;
      },
      getVersionList() {
        this.versions = this.$store.getters.VERSIONS;
      },
      getPriorityList() {
        this.priorities = this.$store.getters.PRIORITIES;
      },
      getTypeList() {
        this.types = this.$store.getters.TYPES;
      },
      getUserList() {
        this.users = this.$store.getters.USERS;
      },
      initData() {
        this.getTypeList();
        this.getStatusList();
        this.getVersionList();
        this.getPriorityList();
        this.getUserList();
      },
      initFormData() {
        Object.keys(this.task)
          .reduce((memo, propKey) => {

            if (typeof(this.task[propKey]) === 'object' && this.task[propKey].hasOwnProperty('name')) {
              this.formData[propKey] = this.task[propKey].name;
            }
            else {
              this.formData[propKey] = this.task[propKey];
            }

            return memo;
          }, null);
      },
      initTask(curTask) {
        let newTask = {};

        Object.keys(curTask).reduce((memo, propKey) => {
          newTask[propKey] = curTask[propKey];

          return memo;
        }, null);

        this.task = newTask;
      },
      initTaskDefault() {
        this.initTask(this.defaultTask);
      },
      saveTask() {

        this.turnOnValidation = true;

        /*
        * TODO: нужно генерировать ID задачи и номер
        * */
        if (this.validateFormData()) {

          let newTask = {};
          let propField = null;

          Object.keys(this.task)
            .reduce((memo, propKey) => {

              if (typeof(this.task[propKey]) === 'object') {

                switch (propKey) {
                  case 'priority':
                    propField = this.priorities;
                    break;
                  case 'status':
                    propField = this.statuses;
                    break;
                  case 'version':
                    propField = this.versions;
                    break;
                  case 'type':
                    propField = this.types;
                    break;
                  case 'user':
                    propField = this.users;
                    break;
                }

                let vurPropValue = propField.filter(el => el.name === this.formData[propKey]);

                newTask[propKey] = vurPropValue[0];

              }
              else {
                newTask[propKey] = this.formData[propKey];
              }

              return memo;
            }, null);

          this.initTask(newTask);

          bus.$emit('add-new-task', newTask);

          // очищаем форму
          this.initTaskDefault();
          this.initFormData();

          this.close();
        }

      },
      validateFormData() {

        this.errors = {};

        if (this.turnOnValidation) {

          for (let propKey in this.formData) {
            if (this.formData.hasOwnProperty(propKey) && !this.formData[propKey]) {

              this.errors[propKey] = true;
            }
          }

          for (let errorKey in this.errors) {
            if (this.errors.hasOwnProperty(errorKey)) return false;
          }

          return true;
        }

        return false;
      },
      clearErrors() {
        this.errors = {};
        this.turnOnValidation = false;
      }
    },
    created: function () {
      bus.$on('open-add-task-form', () => {
        this.initTaskDefault();
        this.open();
      });

      this.initData();
      this.initTaskDefault();
      this.initFormData();
    }
  }
</script>