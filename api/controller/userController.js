const pool = require('../db');
const query = require('../queries/queries1')

const getUsers = (req, res) => {
    pool.query(query.getUsers, (error, result) => {
        if (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.status(200).json(result.rows);
        }
    });
};

const getUsersById = (req, res) => {
    const id = parseInt(req.params.id)
    pool.query(query.getuserById, [id], (error, result) => {
        if (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            if (result.rowCount != 0) {
                res.status(200).json(result.rows);
            }
            else {
                res.status(500).json({ error: 'Value is not in db ' });
            }
        }
    });
};


const addUser = (req, res) => {
    const { id, first_name, last_name, email, password } = req.body;

    // Check if email already exists
    pool.query(query.checkEmail, [email], (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        try {
            // If email exists, return a message
            if (data && data.rows && data.rows.length > 0) {
                return res.status(400).json({ error: 'Email Already Existed' });
            }

            // If email doesn't exist, proceed to insert new user
            pool.query(query.createUser, [id, first_name, last_name, email, password], (err, result) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ error: 'Internal Server Error' });
                }
                res.status(201).send("User Created Successfully");
            });
        } catch (err) {
            console.error('Error processing request:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
};


const updateUser = (req, res) => {
    const id = parseInt(req.params.id)
    const { first_name, last_name, password } = req.body;

    pool.query(query.getuserById, [id], (err, data) => {
        const noStudentFound = !data.rows.length;
        if (noStudentFound) { res.send("User Does not exist in db") }

        pool.query(query.updateUser, [first_name, last_name, password, id], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            res.status(201).send("User Updated Successfully");
        });
    })
};


const removeUser = (req, res) => {
    const id = parseInt(req.params.id)

    pool.query(query.getuserById, [id], (err, data) => {
        const noStudentFound = !data.rows.length;
        if (noStudentFound) { res.send("User Does not exist in db") }

        pool.query(query.removeUser, [id], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            res.status(201).send("User Removed Successfully");
        });
    })
};



module.exports = { getUsers, getUsersById, addUser, updateUser, removeUser };
