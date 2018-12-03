import api from '@/services/api'

export default {
  getDesks() {
    return api().get('desks');
  },
  addNewDesk(params) {
    return api().post('desks', params);
  },
  deleteDesk(id) {
    return api().delete(`desks/${id}`)
  },
  getDesk(id) {
    return api().get(`desks/${id}`)
  },
  //tasks
  addNewTask(params){
    return api().post('desks/addTask', params);
  }

}