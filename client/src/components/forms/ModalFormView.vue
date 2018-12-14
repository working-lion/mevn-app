<template>
  <transition name="modal">
    <div class="modal-backdrop">
      <div class="modal">
        <header class="modal-header">
          <span class="btn-close" @click="close">&times;</span>
          <slot name="header">
            This is the default tile!
          </slot>
        </header>
        <section class="modal-body">
          <slot name="body">
            I'm the default body!
          </slot>
        </section>
        <footer class="modal-footer">
          <slot name="footer">
          </slot>
          <div class="form-row form-row-submit">
            <button
              type="button"
              class="modal-btn btn-green"
              @click="submitForm"
            >
              <slot name="btn-text">
                Отправить
              </slot>
            </button>
          </div>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'modal-form-view',
    methods: {
      /**
       * Закрывает форму
       */
      close() {
        this.$emit('close');
      },
      /**
       * Кидает событие отправки формы
       */
      submitForm(){
        this.$emit('submit-form');
      },
    },
  };
</script>

<style>
  .modal-enter {
    opacity: 0;
  }
  .modal-leave-active {
    opacity: 0;
  }
  .modal-enter .modal,
  .modal-leave-active .modal {
    transform: scale(1.1);
  }
  .modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    transition: opacity .3s ease;
  }
  .modal {
    width: 600px;
    max-width: 95%;
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
    position: relative;
    border-radius: 3px;
    transition: all .3s ease;
  }
  .modal-header {
    border-bottom: 1px solid #eeeeee;
    color: #4AAE9B;
    font-weight: 600;
    padding: 15px;
  }
  .modal-footer {
    border-top: 1px solid #eeeeee;
    padding: 15px;
    display: flex;
    justify-content: flex-end;
  }
  .modal-body {
    position: relative;
    padding: 20px 10px;
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
    font-size: 16px;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    width: 100%;
    height: 32px;
    padding: 0 10px;
    border-radius: 3px;
    border: 1px solid #dbdbdb;
    outline: none;
  }
  .form-row input:focus,
  .form-row textarea:focus,
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
  .btn-close {
    font-size: 20px;
    line-height: 12px;
    vertical-align: middle;
    text-align: center;
    cursor: pointer;
    font-weight: bold;
    color: #4AAE9B;
    padding: 0;
    display: block;
    width: 12px;
    height: 12px;
    background: transparent;
    position: absolute;
    top: 10px;
    right: 10px;
  }
  .btn-close:hover, .btn-close:focus {
    outline: none;
  }
  .btn-green {
    color: white;
    background: #4AAE9B;
    border: 1px solid #4AAE9B;
    border-radius: 2px;
  }
  .error {
    border-color: red !important;
  }
</style>