<template>
  <div class = "main-page-section">
    <h1>To do list for each subject</h1>
    <div class = "add-course">
      <!-- Field for adding courses -->
      <input v-model="newCourseName" id="courseName" type="text" placeholder="Enter course name" />
      <button @click="addCourse" id="add-course-button" class="addButton">Add Course</button>
    </div>
    <section class="courses-container">
      <router-link v-for="course in courses" :key="course.id" :to="{ name: 'ACourse', params: { id: course.id } }" class="course-card" :style="{ backgroundColor: getBackgroundColor() }">
        <div class="course-text">
          <b>Course name:</b> {{ course.coursename }}<br>
          <b>Tasks:</b>
          <ul>
            <li v-for="task in course.tasks" :key="task.id" :style="{ 'text-decoration': task.crossedout ? 'line-through' : 'none' }">
              {{ task.description }}
            </li>
          </ul>
        </div>
      </router-link>
    </section>
  </div>
</template>


<script>
import { mapGetters } from 'vuex';

export default {
  name: "Courses",
  data() {
    return {
      courses: [],
      newCourseName: "", // New property for the input field
    };
  },
  computed: {
    ...mapGetters(['getUser']),
  },
  methods: {
    async fetchRecords() {
    try {
        const userId = this.$store.state.user;
        const response = await fetch(`http://localhost:3000/api/courses/${userId}`);
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

      const userId = this.$store.state.user;
      console.log(userId);

      fetch(`http://localhost:3000/api/courses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ coursename: this.newCourseName, userId: userId }),
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
    getBackgroundColor() {
    const colors = ["#FAE7EB","#F2D7E8","#ECF8F7","#B58EBC","#D8BBD3","#D1EDEA"];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  },
  },
  mounted() {
    this.fetchRecords();
    console.log("mounted");
  },
};
</script>


<style scoped>
h1, b {
  text-align: center;
  color: #7d3541;
}

.course-card {
  width: 300px; /* Adjust the width as needed based on your layout */
  min-height: 200px;
  margin-bottom: 20px;
  border-radius: 10px; /* Add rounded corners */
  overflow: hidden; /* Ensure rounded corners are applied */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Add a subtle shadow */
  text-decoration: none; /* Remove default link styling */

}

.courses-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between; /* Adjust as needed */
  gap: 10px; /* Add space between items */
}

.main-page-section {
  max-width: 1000px;
  margin: auto;
  padding: 20px;
  box-sizing: border-box;
  overflow: hidden; /* Add overflow to contain floated children */
}

/* Add a clearfix to handle floated children */
.main-page-section::after {
  content: "";
  display: table;
  clear: both;
}

.addButton {
  background-color: #ae5d6c;
  color: white; /* Set text color for better visibility */
}

.add-course {
  margin: 20px auto; /* Adjust the margin as needed */
  padding: 10px;
  border-radius: 8px; /* Optional: add rounded corners */
  justify-content: space-between;
}

.course-link {
  text-decoration: none;
  color:#7d3541; /* Set the color for the course link */
}

input {
  width: 80%;
  margin-right: 30px;
  margin-bottom: 20px; /* Add margin to the bottom of the input */
}

.course-text {
  padding: 20px 10px 10px;
  font-size: larger;
  color:#7d3541;
}

.course-text li {
  font-size: medium;
}
.course-text b {
  font-size: 25px;
}
</style>
