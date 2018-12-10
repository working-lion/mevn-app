<template>
  <div class="desks-list-container">
    <div class="desks-list">
      <a
        href=""
        class="desk-item"
        v-for="deskItem in desks"
        :key="deskItem._id"
      >
        <div class="desk-item-name">{{deskItem.title}}</div>
        <span class="desk-item-menu-btn">
          <span class="desk-item-menu-circle"></span>
          <ul class="desk-item-menu">
            <li>редактировать</li>
            <li @click="deleteDesk(deskItem._id, deskItem.title)">удалить</li>
          </ul>
        </span>
      </a>
      <a
        href="#"
        class="add-desk"
        @click="showModal"
      >
        <div class="add-desk-circle">
          <div class="add-desk-plus"></div>
        </div>
      </a>
    </div>

  </div>


</template>

<script>
  // Services
  import DesksService from '@/services/DesksService'

  export default {
    name: 'desks-list',
    data() {
      return {
        isModalVisible: false,
        addDeskData: {
          _id: '',
          title: ''
        },
        desks: []
      }
    },
    methods: {
      showModal() {
        this.isModalVisible = true
      },
      closeModal() {
        this.isModalVisible = false
      },
      async addDesk() {
        let response = await DesksService.addNewDesk({
          title: this.addDeskData.title,
        });

        if (response.data.success === true) {
          this.addDeskData._id = response.data._id;
          this.desks.push(this.addDeskData);

          closeModal();
          /*TODO:
          * 1) При добавлении второй доски первая меняется*/
        }
        else {
          //error-message
          console.log(response.data.error);
        }
        /*TODO:
        * 1) Валидация полей формы*/
      },
      async deleteDesk(id, title) {
        if (confirm('Удалить доску ' + title + '?')) {
          let response = await DesksService.deleteDesk(id);

          if (response.data.success === true) {
            for (let deskKey in this.desks) {
              if (!this.desks.hasOwnProperty(deskKey)) {
                continue;
              }
              if (this.desks[deskKey]._id === id) {
                this.$delete(this.desks, deskKey)
                break;
              }
            }
          }
          else {
            //error-message
            console.log(response.data.error);
          }
        }
      },
      async getDesks() {
        const response = await DesksService.getDesks()
        this.desks = response.data.desks
      },
    },
    mounted() {
      //this.getDesks()
    }
  }
</script>

<style scoped>
  .desks-list-container {
    width: 800px;
    margin: 0 auto;
    padding: 10px 0;
  }
  .desks-list {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
  }
  .desk-item, .add-desk {
    width: 23.5%;
    height: 80px;
    padding: 15px 5px;
    border-radius: 4px;
    margin-right: 2%;
    margin-bottom: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.3);
    text-decoration: none;
    position: relative;
  }
  .desk-item:hover, .add-desk:hover {
    background: rgba(0, 0, 0, 0.2);
  }
  .desk-item:nth-child(4n), .add-desk:nth-child(4n) {
    margin-right: 0;
  }
  .desk-item-name {
    color: #fff;
    font-size: 18px;
    font-weight: 600;
  }
  .add-desk-circle {
    width: 40px;
    height: 40px;
    background: rgba(255, 255, 255, 0.5);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .add-desk-plus {
    width: 4px;
    height: 26px;
    background: rgba(255, 255, 255, 0.8);
    position: relative;
  }
  .add-desk-plus::before, .add-desk-plus::after {
    content: '';
    display: block;
    width: 11px;
    height: 4px;
    background: rgba(255, 255, 255, 0.8);
    position: absolute;
    top: 11px;
  }
  .add-desk-plus::before {
    right: 100%;
  }
  .add-desk-plus::after {
    left: 100%;
  }
  .desks-list-empty {
    width: 100%;
    font-size: 18px;
    text-align: center;
    margin-bottom: 20px;
  }
  .desk-item-menu-btn {
    position: absolute;
    top: 5px;
    right: 5px;
    padding: 2px 10px;
    display: none;
  }
  .desk-item:hover .desk-item-menu-btn {
    display: block;
  }
  .desk-item-menu {
    position: absolute;
    top: 100%;
    right: 0;
    background: #fff;
    border-radius: 3px;
    padding: 5px 10px;
    margin: 0;
    display: none;
    list-style: none;
    width: 120px;
  }
  .desk-item-menu li {
    font-size: 13px;
    padding-left: 0;
    margin-bottom: 5px;
    transition: padding 0.3s;
    cursor: pointer;
  }
  .desk-item-menu li:hover {
    color: rgb(0, 174, 204);
    padding-left: 3px;
  }
  .desk-item-menu-btn:hover .desk-item-menu {
    display: block;
  }
  .desk-item-menu-circle, .desk-item-menu-circle::before, .desk-item-menu-circle::after {
    display: block;
    width: 5px;
    height: 5px;
    background: rgba(255, 255, 255, 0.5);
    border-radius: 50%;
    position: relative;
  }
  .desk-item-menu-btn:hover .desk-item-menu-circle,
  .desk-item-menu-btn:hover .desk-item-menu-circle::before,
  .desk-item-menu-btn:hover .desk-item-menu-circle::after {
    background: rgba(255, 255, 255, 0.9);
  }
  .desk-item-menu-circle::before, .desk-item-menu-circle::after {
    content: '';
    position: absolute;
    top: 0;
  }
  .desk-item-menu-circle::before {
    left: -8px;
  }
  .desk-item-menu-circle::after {
    right: -8px;
  }
</style>