<template>
  <div class="ACourse">
    <h2>{{ this.course ? this.course.coursename : "heh" }}</h2>

    <!-- Table for displaying tasks -->
    <div v-if="tasks.length > 0">
  <table class="task-table">
    <thead>
      <tr>
        <th>Task Name</th>
        <th>End Date</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="task in tasks" :key="task.id">
        <td :style="{ 'text-decoration': task.crossedOut ? 'line-through' : 'none' }">
          <span v-if="!editing">{{ task.description }}</span>
          <input v-else name="description" id="description" type="text" required v-model="task.description">
        </td>
        <td>
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

    <!-- Form for adding a new task -->
    <div>
      <label for="taskName">Task Name:</label>
      <input v-model="newTaskName" type="text" id="taskName" />

      <label for="endDate">End Date:</label>
      <input v-model="newTaskEndDate" type="date" id="endDate" />

      <button @click="addTask">Add Task</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ACourse",
  data() {
    return {
      crossedOut: false,
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
        fetch(`http://localhost:3000/api/courses/${this.courseId}`)
        .then((response) => response.json())
        .then((data) => (this.course = data))
        .catch((err) => console.log(err.message));

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
          .then((data) => {
            window.location.reload();
          })
          .catch((err) => console.log(err.message));
    },
    crossOutTask(task) {
      task.crossedOut = !task.crossedOut;
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
      // Implement add task functionality
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
          this.tasks.push(data); // Add the new task to the local data
          this.newTaskName = ""; // Clear input fields
          this.newTaskEndDate = "";
        })
        .catch((err) => console.log(err.message));
    },
  },
  mounted() {
    this.courseId = this.$route.params.id;
    this.fetchInfo();
    console.log("mounted");
  },
};
</script>

<style scoped>
.ACourse {
  background-color: bisque;
  width: 60%;
  justify-content: center;
  margin: auto;
  padding: 10px;
}

.task-table {
  width: 100%;
  margin-top: 20px;
  border-collapse: collapse;
}

.task-table th, .task-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.task-table th {
  background-color: #f2f2f2;
}

.red {
  background-color: red;
}

.crossed-out {
  text-decoration: line-through;
}
</style>
