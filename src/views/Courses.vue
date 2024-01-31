<template>
  <div class = "main-page-section">
    <h3>To do list for each subject</h3>
    <div>
      <!-- Field for adding courses -->
      <input v-model="newCourseName" type="text" placeholder="Enter course name" />
      <button @click="addCourse">Add Course</button>
    </div>
    <section class="courses-container">
      <div v-for="course in courses" :key="course.id" class="course-card">
        <router-link :to="{ name: 'ACourse', params: { id: course.id } }">
          <b>Course name:</b> {{ course.coursename }}<br>
          <b>Tasks:</b>
          <ul>
            <li v-for="task in course.tasks" :key="task.id">{{ task.description }}</li>
          </ul>
        </router-link>
      </div>
    </section>
  </div>
</template>


<script>
export default {
  name: "Courses",
  data() {
    return {
      courses: [],
      newCourseName: "", // New property for the input field
    };
  },
  methods: {
    async fetchRecords() {
    try {
        const response = await fetch(`http://localhost:3000/api/courses`);
        const data = await response.json();

        for (const course of data) {
          course.tasks = await this.getTasksForCourse(course.id);
        }

        this.courses = data;
      } catch (err) {
        console.error(err.message);
      }
    },
    addCourse() {
      if (!this.newCourseName.trim()) {
        alert("Please enter a course name.");
        return;
      }

      fetch(`http://localhost:3000/api/courses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ coursename: this.newCourseName }),
      })
        .then((response) => response.json())
        .then(async (data) => {
          data.tasks = await this.getTasksForCourse(data.id);
          this.courses.push(data);
          this.newCourseName = "";
        })
        .catch((err) => console.log(err.message));
    },
    async getTasksForCourse(courseId) {
      try {
        const response = await fetch(`http://localhost:3000/api/tasks/${courseId}`);
        const data = await response.json();
        return data;
      } catch (err) {
        console.error(err.message);
        throw err;
      }
    },
  },
  mounted() {
    this.fetchRecords();
    console.log("mounted");
  },
};
</script>


<style scoped>

h3 {
  text-align: center;
  color: rgb(8, 110, 110);
}
th {
    background-color: lightpink;
}
th, td {
  font-size: 15px;
  margin-bottom: 5px;
  padding: 8px 10px;
}
.container {
    background: #d5d7d8;
    box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.2);
    margin-bottom: 30px;
    padding: 10px 20px;
    margin: auto;
    width: 60%;
    justify-content: center;
}

input {
  margin-right: 10px;
}

.courses-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between; /* Adjust as needed */
}

.course-card {
  width: 25%; /* Adjust the width as needed based on your layout */
  margin-bottom: 20px;
}

.main-page-section {
  max-width: 800px; /* Set your desired maximum width */
  margin: auto; /* Center the element horizontally */
  padding: 20px; /* Add padding for better spacing */
}
</style>
