<template>
  <transition name="modal">
    <div class="modal-backdrop">
      <div class="modal">
        <header class="modal-header">
          <button
            type="button"
            class="btn-close"
            @click="close"
          >
            &times;
          </button>
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
    name: 'modal',

    methods: {
      close() {
        this.$emit('close');
      },
      submitForm(){
        this.$emit('submit-form');
      }
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
  .modal-header,
  .modal-footer {
    padding: 15px;
    display: flex;
  }
  .modal-header {
    border-bottom: 1px solid #eeeeee;
    color: #4AAE9B;
    font-weight: 600;
    justify-content: space-between;
  }
  .modal-footer {
    border-top: 1px solid #eeeeee;
    justify-content: flex-end;
  }
  .modal-body {
    position: relative;
    padding: 20px 10px;
  }
  .form-row label, .form-row input:not([type="submit"]) {
    width: 100%;
  }
  .form-row input:not([type="submit"]), .form-row textarea {
    width: 100%;
    height: 32px;
    padding: 0 10px;
    border-radius: 3px;
    border: 1px solid #dbdbdb;
    outline: none;
  }
  .form-row input:focus,
  .form-row textarea:focus,
  [type="submit"]:hover {
    box-shadow: 1px 1px 3px 0 rgba(153, 153, 153, 1);
  }
  .form-row {
    margin: 0 0 15px;
  }
  .form-row:last-child {
    margin-bottom: 0;
  }
  .form-row.form-row-submit {
    margin-bottom: 0;
  }
  label {
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
    border: none;
    font-size: 20px;
    line-height: 1;
    cursor: pointer;
    font-weight: bold;
    color: #4AAE9B;
    padding: 0;
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
</style>