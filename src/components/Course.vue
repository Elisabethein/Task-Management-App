<template>
    <div id= "course-component">
        <table>
            <tr class="item" v-for="course in courses" :key = "course.id"></tr>
              <tr>
                  <th>Course name:</th>
                  <th>Code:</th>
                  <th>ECTS:</th>
                  <th>Max No. of Stundents</th>
                  <th>No. of groups:</th>
              </tr>
                <td class = "name">{{ course.coursename }}</td>
                <td class = "code">{{ course.coursecode }}</td>
                <td class = "ects">{{ course.courseects }}</td>
                <td class = "students">{{ course.studentsnumbers }}</td>
                <td class = "groups">{{ course.groupsnumbers }}</td>
        </table>
    </div>
    </template>



    <script>
    export default {
    name: "CoursesPage",
    props: ["courses"],
    data: function() {
    return {
    
    }},
    computed: {

    }
    }
    </script>