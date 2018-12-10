/*
* Методы получения json-объектов из файлов
* */
import userList from '@/db_json/user_list';
import priorityList from '@/db_json/priority_list';
import taskStatusList from '@/db_json/task_status_list';
import taskTypeList from '@/db_json/task_type_list';
import versionList from '@/db_json/version_list';
// import filterValues from '@/db_json/filter_values_list';

export default {
  getTaskList() {
    let taskList = [],
      taskCount = 20,
      taskNum = 0;

    function randomInteger(min, max) {
      let rand = min + Math.random() * (max + 1 - min);
      rand = Math.floor(rand);
      return rand;
    }

    for (let taskIndex = 0; taskIndex < taskCount; taskIndex++) {

      taskNum = 'ATGSM-' + randomInteger(0, 1000);

      taskList.push({
        id: taskIndex,
        number: taskNum,
        title: 'Заголовок с кратким описанием задачи - ' + taskNum,
        description: 'По своей сути рыбатекст является альтернативой традиционному lorem ipsum, который вызывает у' +
        ' некторых людей недоумение при попытках прочитать рыбу текст. В отличии от lorem ipsum, текст рыба на' +
        ' русском языке наполнит любой макет непонятным смыслом и придаст неповторимый колорит советских времен.',
        user: userList[randomInteger(0, userList.length - 1)],
        type: taskTypeList[randomInteger(0, taskTypeList.length - 1)],
        priority: priorityList[randomInteger(0, priorityList.length - 1)],
        version: versionList[randomInteger(0, versionList.length - 1)],
        status: taskStatusList[randomInteger(0, taskStatusList.length - 1)],
        show: true
      });
    }

    return taskList;
  },
  getUserList() {
    return userList;
  },
  getPriorityList() {
    return priorityList;
  },
  getTaskStatusList() {
    return taskStatusList;
  },
  getTaskTypeList() {
    return taskTypeList;
  },
  getVersionList() {
    return versionList;
  },
  /*getFilterValues() {
    return filterValues;
  }*/
}