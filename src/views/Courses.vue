<template>
  <div class="main-page-section" :class="{ 'dark-mode': isDarkMode }">
    <h1>To-do list for each subject</h1>
    <div class="add-course">
      <!-- Field for adding courses -->
      <input v-model="newCourseName" id="courseName" type="text" placeholder="Enter course name" />
      <button @click="addCourse" id="add-course-button" class="addButton">Add Course</button>
    </div>
    <section class="courses-container">
      <router-link v-for="course in courses" :key="course.id" :to="{ name: 'ACourse', params: { id: course.id } }" class="course-card" :style="{ backgroundColor: isDarkMode ? course.colorid_dark : course.colorid }">
        <div class="course-text">
          <b>Course name:</b> {{ course.coursename }}<br>
          <b>Tasks:</b>
          <ul>
            <li v-for="task in sortedTasks(course.tasks)" :key="task.id" :style="{ 'text-decoration': task.crossedout ? 'line-through' : 'none' }">
              {{ task.description }}
            </li>
          </ul>
        </div>
        <div class="color-menu">
          <div v-for="color in isDarkMode ? this.darkColorOptions : this.colorOptions" :key="color" @click.prevent="isDarkMode ? selectColorDark(course, color) : selectColor(course, color)" class="color-option" :style="{ backgroundColor: color }"></div>
        </div>
      </router-link>
    </section>
  </div>
</template>


<script>
import { mapState, mapGetters } from 'vuex';

export default {
  name: "Courses",
  data() {
    return {
      courses: [],
      newCourseName: "",
      colorOptions: ["#FAE7EB", "#F2D7E8", "#ECF8F7", "#B58EBC", "#D8BBD3", "#D1EDEA"],
      darkColorOptions: [ "#120e12", "#362a37", "#564357", "#755b78", "#87698a", "#9b7f9d" ],
    };
  },
  computed: {
    ...mapGetters(['getUser']),
    ...mapState(['isDarkMode']),
  },
  methods: {
    async fetchRecords() {
    try {
        const userId = this.$store.state.user;
        const response = await fetch(`http://localhost:3000/api/courses/${userId}`);
        const data = await response.json();

        for (const course of data) {
          course.tasks = await this.getTasksForCourse(course.id);
          course.color = this.isDarkMode ? course.colorid_dark : course.colorid;
        }

        this.courses = data.sort((a, b) => a.id - b.id);
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

      const randomColor = this.getBackgroundColor();
      const randomColorDark = this.getBackgroundColorDark();

      fetch(`http://localhost:3000/api/courses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ coursename: this.newCourseName, userId: userId, colorid: randomColor, colorid_dark: randomColorDark}),
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
    const randomIndex = Math.floor(Math.random() * this.colorOptions.length);
    return this.colorOptions[randomIndex]
  },
  getBackgroundColorDark() {
    const randomIndex = Math.floor(Math.random() * this.darkColorOptions.length);
    return this.darkColorOptions[randomIndex]
  },
  sortedTasks(tasks) {
      return tasks.slice().sort((a, b) => {
        //check if one of them is crossed out
        if (a.crossedout && !b.crossedout) {
          return 1; // a should come after b
        } else if (!a.crossedout && b.crossedout) {
          return -1; // a should come before b
        }
        // If both are crossed out or not crossed out, sort by end date
        const dateA = new Date(a.end_date);
        const dateB = new Date(b.end_date);

        return dateA - dateB;
      });
    },
    selectColor(course, color) {
      fetch(`http://localhost:3000/api/course/${course.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ colorid: color }),
      })
        .then((response) => response.json())
        .then((data) => {
          window.location.reload();
        })
        .catch((err) => console.log(err.message));
    },
    selectColorDark(course, color) {
      fetch(`http://localhost:3000/api/course/dark/${course.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ colorid_dark: color }),
      })
        .then((response) => response.json())
        .then((data) => {
          window.location.reload();
        })
        .catch((err) => console.log(err.message));
    },
  },
  mounted() {
    this.fetchRecords();
    console.log("mounted");
  },
};
</script>


<style scoped>
*{
  color: #7d3541;
}
h1, b {
  text-align: center;
}
.dark-mode *{
  color: #eee2f8;
}

.course-card {
  width: 300px; /* Adjust the width as needed based on your layout */
  min-height: 200px;
  margin-bottom: 20px;
  border-radius: 10px; /* Add rounded corners */
  overflow: hidden; /* Ensure rounded corners are applied */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Add a subtle shadow */
  text-decoration: none; /* Remove default link styling */
  position: relative;
  border: 1px solid #7d3541;
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

.add-course {
  margin: 20px auto; /* Adjust the margin as needed */
  padding: 10px;
  border-radius: 8px; /* Optional: add rounded corners */
  justify-content: space-between;
}

input {
  width: 80%;
  margin-right: 30px;
  margin-bottom: 20px; /* Add margin to the bottom of the input */
}

.course-text {
  padding: 20px 10px 10px;
  font-size: larger;
}

.dark-mode .course-text{
  color: #eee2f8;
}

.dark-mode input{
    color: #1b042b;
}

.course-text li {
  font-size: medium;
}
.course-text b {
  font-size: 25px;
}

.color-menu {
  position: absolute;
  bottom: 10px;
  right: 10px;
  display: flex;
  flex-direction: row-reverse; /* Reverse the order of color options for appearance */
  background-image: url('~@/assets/background.jpg');
  border-radius: 10px;
  padding: 2px;
  border: 1px solid #7d3541;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.color-option {
  width: 20px;
  height: 20px;
  cursor: pointer;
  border-radius: 10px;
  border: 1px solid #7d3541;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.addButton {
  background-color: #ae5d6c;
  color: white; /* Set text color for better visibility */
}

.dark-mode button{
    background-color: #1b042b;
  }

  .dark-mode button:hover{
    background-color: #2d0748;
  }
.dark-mode .course-card{
  border: 1px solid #1b042b;
}
.dark-mode .color-menu {
  background-image: url('~@/assets/dark-background.jpg');
  border: 1px solid #9c8fa8;
}

.dark-mode .color-option {
  border: 1px solid #9c8fa8;
}
</style>
