
const express = require('express');
const pool = require('./database');
const cors = require('cors');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const port = process.env.PORT || 3000;

const app = express();


app.use(cors({ origin: 'http://localhost:8080', credentials: true }));
app.use(express.json());
app.use(cookieParser());

const secret = "gdgdhdbcb770785rgdzqws"; // use a stronger secret
const maxAge = 60 * 60; //unlike cookies, the expiresIn in jwt token is calculated by seconds not milliseconds

const generateJWT = (id) => {
    return jwt.sign({ id }, secret, { expiresIn: maxAge })
        //jwt.sign(payload, secret, [options, callback]), and it returns the JWT as string
}

app.listen(port, () => {
    console.log("Server is listening to port " + port)
});

// is used to check whether a user is authinticated
app.get('/auth/authenticate', async(req, res) => {
    console.log('authentication request has been arrived');
    const token = req.cookies.jwt; // assign the token named jwt to the token const
    //console.log("token " + token);
    let authenticated = false; // a user is not authenticated until proven the opposite
    try {
        if (token) { //checks if the token exists
            //jwt.verify(token, secretOrPublicKey, [options, callback]) verify a token
            await jwt.verify(token, secret, (err) => { //token exists, now we try to verify it
                if (err) { // not verified, redirect to login page
                    console.log(err.message);
                    console.log('token is not verified');
                    res.send({ "authenticated": authenticated }); // authenticated = false
                } else { // token exists and it is verified 
                    console.log('author is authenticated');
                    authenticated = true;
                    res.send({ "authenticated": authenticated }); // authenticated = true
                }
            })
        } else { //applies when the token does not exist
            console.log('author is not authenticated');
            res.send({ "authenticated": authenticated }); // authenticated = false
        }
    } catch (err) {
        console.error(err.message);
        res.status(400).send(err.message);
    }
});

// signup a user
app.post('/auth/signup', async(req, res) => {
    try {
        console.log("a signup request has arrived");
        //console.log(req.body);
        const { email, password } = req.body;

        const salt = await bcrypt.genSalt(); //  generates the salt, i.e., a random string
        const bcryptPassword = await bcrypt.hash(password, salt) // hash the password and the salt 
        const authUser = await pool.query( // insert the user and the hashed password into the database
            "INSERT INTO users(email, password) values ($1, $2) RETURNING*", [email, bcryptPassword]
        );
        console.log(authUser.rows[0].id);
        const token = await generateJWT(authUser.rows[0].id); // generates a JWT by taking the user id as an input (payload)
        console.log(token);
        res.cookie("isAuthorized", true, { maxAge: 1000 * 60, httpOnly: true });
        res.cookie('jwt', token, { maxAge: 6000000, httpOnly: true });
        res
            .status(201)
            .cookie('jwt', token, { maxAge: 6000000, httpOnly: true })
            .json({ user_id: authUser.rows[0].id })
            .send;
    } catch (err) {
        console.error(err);
        console.error(err.message);
        res.status(400).send(err.message);
    }
});

app.post('/auth/login', async(req, res) => {
    try {
        console.log("a login request has arrived");
        const { email, password } = req.body;
        const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (user.rows.length === 0) return res.status(401).json({ error: "User is not registered" });
        //Checking if the password is correct
        const validPassword = await bcrypt.compare(password, user.rows[0].password);
        //console.log("validPassword:" + validPassword);
        if (!validPassword) return res.status(401).json({ error: "Incorrect password" });

        const token = await generateJWT(user.rows[0].id);
        res
            .status(201)
            .cookie('jwt', token, { maxAge: 6000000, httpOnly: true })
            .json({ user_id: user.rows[0].id })
            .send;
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
});

//logout a user = deletes the jwt
app.get('/auth/logout', (req, res) => {
    console.log('delete jwt request arrived');
    res.status(202).clearCookie('jwt').json({ "Msg": "cookie cleared" }).send
});


app.get('/api/courses', async(req, res) => {
    try {
        console.log("A GET all courses request has arrived");
        const course = await pool.query(
            "SELECT * FROM courses"
        );
        res.json(course.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.post('/api/courses', async (req, res) => {
    try {
    console.log("A POST  new course request has arrived");
      const { coursename } = req.body;
      const newCourse = await pool.query(
        'INSERT INTO courses (coursename) VALUES ($1) RETURNING *',
        [coursename]
      );
      res.status(201).json(newCourse.rows[0]);
    } catch (err) {
      console.error(err.message);
    }
  });

app.get('/api/courses/:id', async(req, res) => {
    try {
        console.log("Get a post with id request has arrived");
        const { id } = req.params;
        const posts = await pool.query(
            "SELECT * FROM courses WHERE id = $1", [id]
        );
        res.json(posts.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.get('/api/tasks/:courseId', async (req, res) => {
    try {
        console.log("A GET all tasks request has arrived");
        const { courseId } = req.params; // Use req.params to get the value from the URL
        const tasks = await pool.query('SELECT * FROM tasks WHERE courseid = $1', [courseId]);
        res.json(tasks.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/api/tasks', async (req, res) => {
    try {
        console.log("A post new task request has arrived");
        const { courseid, description, end_date } = req.body;
        const newTask = await pool.query(
            'INSERT INTO tasks (courseid, description, end_date) VALUES ($1, $2, $3) RETURNING *',
            [courseid, description, end_date]
        );

        res.json(newTask.rows[0]);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error');
    }
});

app.put('/api/tasks/:id', async (req, res) => {
    try {
        console.log("An update task request has arrived");
        const { id } = req.params;
        const { description, end_date } = req.body;
        const updatedTask = await pool.query(
            'UPDATE tasks SET description = $1, end_date = $2 WHERE id = $3 RETURNING *',
            [description, end_date, id]
        );
        res.json(updatedTask.rows[0]);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error');
    }
});

app.delete('/api/tasks/:id', async (req, res) => {
    try {
        console.log("A delete task request has arrived");
        const { id } = req.params;
        await pool.query('DELETE FROM tasks WHERE id = $1', [id]);

        res.json({ message: 'Task deleted' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error');
    }
});