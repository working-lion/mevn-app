<template>
  <div class="desk">
    <div class="desk-header">
      <div class="desk-header-left"><span class="desk-name">Название доски</span></div>
      <div class="desk-header-right"><a href="#" class="desk-menu">меню</a></div>
    </div>
    <div class="desk-body">
      <div class="column-list-scroll">
        <div class="column-list">
          <div class="column-item">
            <div class="column-header">
              <span class="column-name">Названия колонки</span>
              <a href="#" class="column-menu">меню</a>
            </div>
            <div class="column-body">
              <div class="tasks-list">
                <div class="task-item">
                  <div class="task-item-header">
                    header
                  </div>
                  <div class="task-item-body">
                    <div class="task-item-name">Название задачи</div>
                  </div>
                  <div class="task-item-footer">
                    footer
                  </div>
                </div>
                <div class="task-item">
                  <div class="task-item-header">
                    header
                  </div>
                  <div class="task-item-body">
                    <div class="task-item-name">Название задачи</div>
                  </div>
                  <div class="task-item-footer">
                    footer
                  </div>
                </div>
                <div class="task-item">
                  <div class="task-item-header">
                    header
                  </div>
                  <div class="task-item-body">
                    <div class="task-item-name">Название задачи</div>
                  </div>
                  <div class="task-item-footer">
                    footer
                  </div>
                </div>
              </div>
            </div>
            <div class="column-footer">
              <a href="#" class="add-task">Добавить карточку</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'desk',
  data () {
    return {
      name: 'Назваие рабочего стола'
    }
  }
}
</script>

<style scoped>
  .desk {
    padding: 0 10px;
  }
  .desk-name {
    font-weight: 600;
  }
  .desk-header {
    padding: 10px;
    display: flex;
    justify-content: space-between;
  }
</style>
