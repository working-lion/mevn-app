<template>

  <div class="modal-right" :class="{ active: isActive }">
    <div class="right-form-block">

      <div class="right-form-menu-container">
        <slot name="menu"></slot>
      </div>

      <span class="btn-close" @click="close">&times;</span>

      <header class="modal-header">
        <slot name="header">
          Форма справа!
        </slot>
      </header>

      <section class="modal-body">
        <slot name="body">
          Тело формы!
        </slot>
      </section>

      <footer class="modal-footer">
        <slot name="footer"></slot>
        <div class="form-row form-row-submit" v-if="showSubmitRow">
          <button
            type="button"
            class="modal-btn btn-green"
            @click="submitForm"
          >
            <slot name="btn-text">Отправить</slot>
          </button>

          <button
            type="button"
            class="modal-btn btn-blue"
            @click="cancel"
          >
            Отмена
          </button>
        </div>
      </footer>
    </div>
  </div>

</template>

<script>
  // bus
  import {bus} from '@/main';
  // если назвать компонент modal-right-view  -  будет ошибка:
  // Unknown custom element: <modal-right-view> - did you register the component correctly?

  export default {
    name: 'right-form-view',
    props: {
      showSubmitRow: Boolean,
      isActive: Boolean
    },
    methods: {
      close() {
        this.$emit('close-task-right');
        this.task = {}
        bus.$emit('close-right-form');
      },
      submitForm() {
        this.$emit('submit-form');
      },
      cancel() {
        this.$emit('cancel');
      },
    }
  };
</script>

<style>
  /*.modal-right {
    color: #666;
    width: 0;
    min-width: 0;
    background: #dfe3e6;
    overflow: hidden;
    transition: all 0.5s;
  }
  .modal-right.active {
    width: 350px;
    min-width: 350px;
    transition: all 0.5s;
  }*/
  .modal-right {
    color: #666;
    width: 350px;
    height: 100%;
    background: #dfe3e6;
    overflow: hidden;
    position: absolute;
    top: 0;
    right: -400px;
    transition: right 0.5s;
  }
  .modal-right.active {
    right: 0;
    transition: right 0.5s;
  }
  .modal-right .modal-body {
    position: relative;
    padding: 0 10px 20px;
  }
  .right-form-block {
    width: 350px;
    padding: 35px 15px 20px;
    position: relative;
  }
  .modal-right .modal-header, .modal-right .modal-footer {
    border-color: #999;
  }
  .modal-right .modal-header {
    font-size: 1.2em;
    color: #323232;
    margin-bottom: 10px;
  }
  .data-group {
    margin: 20px 0;
  }
  .data-group-title {
    font-size: 1.1em;
    color: #323232;
    margin-bottom: 15px;
  }
  .data-row {
    display: flex;
    margin-bottom: 10px;
  }
  .data-row * {
    flex-basis: 100%;
  }
  .data-row-100 {
    display: block;
  }
  .data-row-title {
    padding-right: 10px;
  }
  .btn-close {
    color: #323232;
    font-size: 30px;
    line-height: 1;
    cursor: pointer;
    padding: 0;
    background: transparent;
    position: absolute;
    top: 0;
    right: 6px;
    transform: rotate(0);
    transition: transform 0.3s;
  }
  .btn-close:hover {
    color: rgb(0, 174, 204);
    transform: rotate(90deg);
    transition: transform 0.3s;
  }
  .right-form-menu-container {
    position: absolute;
    top: 12px;
    left: 15px;
  }
  .modal-btn {
    display: inline-block;
    color: #fff;
    text-transform: uppercase;
    font-size: 14px;
    padding: 0 10px;
    height: 32px;
    line-height: 32px;
    vertical-align: middle;
    border-radius: 3px;
    background: green;
    outline: none;
    border: none;
    cursor: pointer;
  }
  .modal-btn:hover {
    text-decoration: underline;
  }
  .btn-green {
    background: #4AAE9B;
    border: 1px solid #4AAE9B;
    border-radius: 2px;
  }
  .btn-blue {
    background: rgb(0, 174, 204);
    border: 1px solid rgb(0, 174, 204);
    border-radius: 2px;
  }
  div[class^="form-row-"] {
    display: flex;
    justify-content: space-between;
  }
  .form-row-2 .form-row {
    width: 49%;
  }
  .form-row-3 .form-row {
    width: 32%;
  }
  .form-row {
    margin: 0 0 15px;
  }
  .form-row:last-child {
    margin-bottom: 0;
  }
  .form-row input:not([type="submit"]),
  .form-row textarea,
  .form-row select {
    color: #323232;
    font-size: 14px;
    width: 100%;
    height: 32px;
    padding: 0 10px;
    border-radius: 3px;
    border: 1px solid #dbdbdb;
    outline: none;
  }
  .form-row input:focus,
  .form-row textarea:focus,
  .form-row select:focus,
  .form-row [type="submit"]:hover {
    box-shadow: 1px 1px 3px 0 rgba(153, 153, 153, 1);
  }
  .form-row textarea {
    min-height: 100px;
    padding-top: 5px;
    padding-bottom: 5px;
    line-height: 1.2;
  }
  .form-row.form-row-submit {
    margin-bottom: 0;
  }
  .form-row label {
    width: 100%;
    color: #999999;
    font-size: 14px;
    display: block;
    margin-bottom: 5px;
  }
  .error {
    border-color: red !important;
  }
</style>