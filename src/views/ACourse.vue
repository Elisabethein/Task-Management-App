<template>
  <div :class="{ 'dark-mode': isDarkMode }">
  <div class="ACourse">
    <div class="course-header">
      <h1>{{ this.course ? this.course.coursename : "A course" }}</h1>
      <button @click="deleteCourse(this.course.id)" class="delete-button">
        <img src="@/assets/trash.png" alt="Delete Course">
      </button>
      <router-link to="/" class="links" active-class="links-hover">
        <button class="back-button">Back</button>
      </router-link>
    </div>
    <div v-if="tasks.length > 0">
      <table class="task-table">
        <thead>
          <tr>
            <th class="task-description">Task Name</th>
            <th class="task-end-date">End Date</th>
            <th class="task-actions">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="task in sortedTasks" :key="task.id">
            <td :style="{ 'text-decoration': task.crossedout ? 'line-through' : 'none' }">
              <span v-if="!editing">{{ task.description }}</span>
              <input v-else name="description" id="description" type="text" required v-model="task.description">
            </td>
            <td :class="{ 'urgent-end-date': isEndDateUrgent(task.end_date) }">
              <span v-if="!editing">{{ task.end_date }}</span>
              <input v-else name="end_date" id="end_date" type="text" required v-model="task.end_date">
            </td>
            <td>
              <button @click="crossOutTask(task)" :class="{ 'red': task.crossedOut }">Cross Out</button>
              <button @click="deleteTask(task)">Delete</button>
              <button @click="editTask()">Edit</button>
              <button @click="updateTask(task.id, task)">Update</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="add-task">
      <label for="taskName">Task Name:</label>
      <input v-model="newTaskName" type="text" id="taskName" />

      <label for="endDate">End Date:</label>
      <input v-model="newTaskEndDate" type="date" id="endDate" />

      <button @click="addTask">Add Task</button>
    </div>
  </div>
</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: "ACourse",
  data() {
    return {
      editing: false,
      course: null,
      courseId: null,
      tasks: [],
      newTaskName: "",
      newTaskEndDate: "",
    };
  },
  methods: {
    fetchInfo() {
      fetch(`http://localhost:3000/api/course/${this.courseId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          this.course = data;
        })
        .catch((error) => {
          console.error('Error fetching course info:', error);
        });


      fetch(`http://localhost:3000/api/tasks/${this.courseId}`)
        .then((response) => response.json())
        .then((data) => (this.tasks = data))
        .catch((err) => console.log(err.message));
    },
    editTask() {
        this.editing = !this.editing;
    },
    updateTask(id, task) {
      fetch(`http://localhost:3000/api/tasks/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify( {"id": id, "description": task.description, "end_date": task.end_date}),
        })
          .then((response) => response.json())
          .catch((err) => console.log(err.message));
    },
    crossOutTask(task) {
      task.crossedout = !task.crossedout;
      fetch(`http://localhost:3000/api/tasks/${task.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: task.id,
          description: task.description,
          end_date: task.end_date,
          crossedOut: task.crossedout,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Task status updated on the server:", data);
        })
        .catch((err) => console.log(err.message));
    },
    deleteTask(task) {
      fetch(`http://localhost:3000/api/tasks/${task.id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => {
          window.location.reload();
        })
        .catch((e) => {
          console.log(e);
        }); 
    },
    addTask() {
      const newTask = {
        courseid: this.courseId,
        description: this.newTaskName,
        end_date: this.newTaskEndDate,
      };
      fetch(`http://localhost:3000/api/tasks`, { 
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      })
        .then((response) => response.json())
        .then((data) => {
          this.tasks.push(data);
          this.newTaskName = "";
          this.newTaskEndDate = "";
        })
        .catch((err) => console.log(err.message));
    },
    deleteCourse(courseid) {
      fetch(`http://localhost:3000/api/course/${courseid}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => {
          this.$router.push("/");
        })
        .catch((e) => {
          console.log(e);
        }); 
    },
    isEndDateUrgent(endDate) {
    const timeDifference = new Date(endDate).getTime() - new Date().getTime();
    const daysDifference = timeDifference / (1000 * 3600 * 24);
    return daysDifference < 2;
  },
  },
  computed: {
    sortedTasks() {
      return this.tasks.slice().sort((a, b) => {
        if (a.crossedout && !b.crossedout) {
          return 1;
        } else if (!a.crossedout && b.crossedout) {
          return -1;
        }
        const dateA = new Date(a.end_date);
        const dateB = new Date(b.end_date);

        return dateA - dateB;
      });
    },
    ...mapState(['isDarkMode']),
  },
  mounted() {
    this.courseId = this.$route.params.id;
    this.fetchInfo();
    console.log("mounted");
  },
};
</script>

<style scoped>
*{
  color: #7d3541;
}
.ACourse {
  width: 60%;
  justify-content: center;
  margin: auto;
  padding: 10px;
  height: 100vh;
}
.dark-mode *{
  color: #eee2f8;
}

.course-header {
  display: flex;
  justify-content: center;
  align-items: center;
}

.task-table {
  width: 100%;
  margin-top: 20px;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.task-table th, .task-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.task-table th {
  background-color: #FADDE1;
}

.dark-mode .task-table th {
  background-color: #1b042b;
}

button {
  margin-right: 8px;
  padding: 6px 10px;
  color: white;
  border: none;
  cursor: pointer;
  background-color: #ae5d6c;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #7d3541; 
}

.task-table .red {
  background-color: rgb(145, 53, 53);
}

.task-description {
  width: 35%;
}

.task-end-date {
  width: 15%;
}

.add-task input{
  margin-right: 60px;
  margin-bottom: 20px;
  min-width: 200px;
}

.delete-button img{
  height: 30px;
  width: 30px;
}

.delete-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  margin-left: 10px;
}

.dark-mode .delete-button {
  background-color: #eee2f8;
}

.dark-mode button{
    background-color: #1b042b;
  }

  .dark-mode button:hover{
    background-color: #2d0748;
  }
  .dark-mode input{
    color: #1b042b;
  }

.urgent-end-date {
    background-color: rgb(195, 55, 55);
    color: #FADDE1;
  }
</style>
