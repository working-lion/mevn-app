<template>

  <right-form-view
    :showSubmitRow="!isViewMode"
    :isActive="isActive"
    v-on:close-task-right="close"
    v-on:submit-form="saveTask"
    v-on:cancel="cancel"
  >

    <template slot="menu" v-if="isViewMode">
      <div class="menu-open-btn">
        <span class="menu-open-btn-circle"></span>
        <ul class="right-form-menu">
          <li @click="turnOnEditTaskMode">Редактировать</li>
        </ul>
      </div>
    </template>

    <!-- Вывод данных задачи -->

    <template slot="header" v-if="isViewMode">
      {{ task.title }}
    </template>

    <template slot="body" v-if="isViewMode">
      <div class="data-group">
        <div class="data-group-title">Подробная информация</div>
        <div class="data-row" v-if="task.priority.name">
          <div class="data-row-title">Приоритет:</div>
          <div class="data-row-value">{{ task.priority.name }}</div>
        </div>
        <div class="data-row" v-if="task.type.name">
          <div class="data-row-title">Тип:</div>
          <div class="data-row-value">{{ task.type.name }}</div>
        </div>
        <div class="data-row" v-if="task.version.name">
          <div class="data-row-title">Версия:</div>
          <div class="data-row-value">{{ task.version.name }}</div>
        </div>
        <div class="data-row" v-if="task.status.name">
          <div class="data-row-title">Статус:</div>
          <div class="data-row-value">{{ task.status.name }}</div>
        </div>
      </div>
      <div class="data-group">
        <div class="data-group-title">Иполнитель</div>
        <div class="data-row data-row-100" v-if="task.user.name">
          <div class="data-row-value">{{ task.user.name }}</div>
        </div>
      </div>

      <div class="data-group">
        <div class="data-group-title">Описание</div>
        <div class="data-row data-row-100" v-if="task.description">
          <div class="data-row-value">{{ task.description }}</div>
        </div>
      </div>
    </template>

    <!-- Редактирвоание данных задачи -->
    <template slot="header" v-if="!isViewMode">
      Редактирование задачи {{ task.number }}
    </template>

    <template slot="body" v-if="!isViewMode">
      <form>
        <div class="form-row">
          <label for="edit-task-title">Название:</label>
          <input id="edit-task-title"
                 type="text"
                 v-model="formData.title"
                 @change="validateFormData"
                 :class="{error: errors.hasOwnProperty('title')}"
          >
        </div>
        <div class="form-row">
          <label for="edit-task-deskr">Описание:</label>
          <textarea id="edit-task-deskr"
                    v-model="formData.description"
                    @change="validateFormData"
                    :class="{error: errors.hasOwnProperty('description')}"
          ></textarea>
        </div>
        <div class="form-row-2">
          <div class="form-row">
            <label for="edit-task-priority">Приоритет:</label>
            <select id="edit-task-priority"
                    v-model="formData.priority"
                    @change="validateFormData"
                    :class="{error: errors.hasOwnProperty('priority')}"
            >
              <option v-for="priorityItem in priorities">{{ priorityItem.name }}</option>
            </select>
          </div>
          <div class="form-row">
            <label for="edit-task-type">Тип:</label>
            <select id="edit-task-type"
                    v-model="formData.type"
                    @change="validateFormData"
                    :class="{error: errors.hasOwnProperty('type')}"
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
                    @change="validateFormData"
                    :class="{error: errors.hasOwnProperty('version')}"
            >
              <option v-for="versionItem in versions">{{ versionItem.name }}</option>
            </select>
          </div>
          <div class="form-row">
            <label for="edit-task-status">Статус:</label>
            <select id="edit-task-status"
                    v-model="formData.status"
                    @change="validateFormData"
                    :class="{error: errors.hasOwnProperty('status')}"
            >
              <option v-for="statusItem in statuses">{{ statusItem.name }}</option>
            </select>
          </div>
        </div>
        <div class="form-row">
          <label for="edit-task-user">Исполнитель:</label>
          <select id="edit-task-user"
                  v-model="formData.user"
                  @change="validateFormData"
                  :class="{error: errors.hasOwnProperty('user')}"
          >
            <option v-for="userItem in users">{{ userItem.name }}</option>
          </select>
        </div>
      </form>
    </template>

    <template slot="btn-text" v-if="!isViewMode">
      Сохранить
    </template>

  </right-form-view>

</template>

<script>
  // bus
  import {bus} from '@/main';

  // components
  import rightFormView from '@/components/forms/RightFormView';

  export default {
    name: 'show-task-right',
    components: {
      rightFormView
    },
    data() {
      return {
        task: {},
        defaultTask: {
          description: "Введите описание",
          id: 1,
          number: "ATGSM-000",
          priority: {
            name: 'Выберите приоритет',
          },
          show: true,
          status: {
            name: 'Выберите статус',
          },
          title: "Заполните заголовок",
          type: {
            name: 'Выберите тип',
          },
          user: {
            name: 'Выберите исполнителя',
          },
          version: {
            name: 'Выберите версию',
          }
        },
        // без начальной инициаллизации не привязывается форма
        formData: {
          id: null,
          number: null,
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

        isActive: false,
        isViewMode: true,

        errors: {},
        turnOnValidation: false,

      }
    },
    methods: {
      /**
       * Получает список статусов задач из хранилища
       */
      getStatusList() {
        this.statuses = this.$store.getters.STATUSES;
      },
      /**
       * Получает список версий из хранилища
       */
      getVersionList() {
        this.versions = this.$store.getters.VERSIONS;
      },
      /**
       * ПОлучает список приоритетов задач из хранилища
       */
      getPriorityList() {
        this.priorities = this.$store.getters.PRIORITIES;
      },
      /**
       * Получает список типов задач из хранилища
       */
      getTypeList() {
        this.types = this.$store.getters.TYPES;
      },
      /**
       * Получает список исполнителей из хранилища
       */
      getUserList() {
        this.users = this.$store.getters.USERS;
      },
      /**
       * Открывает форму
       */
      open() {
        this.isActive = true;
      },
      /**
       * Закрывает форму
       */
      close() {
        this.isViewMode = true;
        this.isActive = false;
      },
      /**
       * Активирует вид редактирования задачи
       */
      turnOnEditTaskMode() {
        this.initData();
        this.initFormData();
        this.isViewMode = false;
      },
      /**
       * Вызывает методы инициализации данных компонента
       */
      initData() {
        this.getTypeList();
        this.getStatusList();
        this.getVersionList();
        this.getPriorityList();
        this.getUserList();
      },
      /**
       * Инициализирует форму
       */
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
      /**
       * Формирует новый объект с данными задачи
       * @param {Object} curTask - данные задачи
       */
      initTask(curTask) {
        let newTask = {};

        Object.keys(curTask).reduce((memo, propKey) => {
          newTask[propKey] = curTask[propKey];

          return memo;
        }, null);

        this.task = newTask;
      },
      /**
       * Инициализирует поле task данными по умолчанию
       */
      initTaskDefault() {
        this.initTask(this.defaultTask);
      },
      /**
       * Формирует объект с данными задачи и кидает событие его сохранения в bus
       */
      saveTask() {

        this.turnOnValidation = true;

        let newTask = {};
        let propField = null;

        if (this.validateFormData()) {

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

          bus.$emit('edit-task', newTask);

          this.isViewMode = true;
        }
      },
      /**
       * Отменяет редактирование, активирует режим просмотра задачи
       */
      cancel() {
        this.isViewMode = true;
        this.clearErrors();
      },
      /**
       * Проверяет поля формы
       * @returns {boolean}
       */
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
      /**
       * Очищает объект ошибок полей формы
       */
      clearErrors() {
        this.errors = {};
        this.turnOnValidation = false;
      }
    },
    created: function () {
      bus.$on('open-task-right', (curTask) => {
        this.isViewMode = true;
        this.initTask(curTask);
        this.open();
      });

      this.initTaskDefault();
      this.initData();
      this.initFormData();
    },
  }
</script>

<style>
  .menu-open-btn {
    padding: 2px 10px;
    display: none;
  }
  .right-form-block:hover .menu-open-btn {
    display: block;
  }
  .menu-open-btn-circle, .menu-open-btn-circle::before, .menu-open-btn-circle::after {
    display: block;
    width: 5px;
    height: 5px;
    background: rgba(0, 0, 0, 0.6);
    border-radius: 50%;
    position: relative;
  }
  .menu-open-btn:hover .menu-open-btn-circle,
  .menu-open-btn:hover .menu-open-btn-circle::before,
  .menu-open-btn:hover .menu-open-btn-circle::after {
    background: rgba(0, 0, 0, 1);
  }
  .menu-open-btn-circle::before, .menu-open-btn-circle::after {
    content: '';
    position: absolute;
    top: 0;
  }
  .menu-open-btn-circle::before {
    left: -8px;
  }
  .menu-open-btn-circle::after {
    right: -8px;
  }
  .right-form-menu {
    position: absolute;
    top: 100%;
    left: 0;
    border-radius: 3px;
    padding: 10px;
    margin: 0;
    display: none;
    list-style: none;
    width: 120px;
    background: #f1f1f1;
    border: 1px solid rgb(0, 174, 204);
  }
  .right-form-menu li {
    font-size: 13px;
    padding-left: 0;
    margin-bottom: 5px;
    transition: padding 0.3s;
    cursor: pointer;
    text-transform: lowercase;
  }
  .right-form-menu li:hover {
    color: rgb(0, 174, 204);
    padding-left: 3px;
  }
  .menu-open-btn:hover .right-form-menu {
    display: block;
  }
</style>