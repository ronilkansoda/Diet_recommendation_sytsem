const getUsers = 'SELECT * FROM users';
const getuserById = 'SELECT * FROM users WHERE id = $1';
const createUser = "INSERT INTO users (username, email, password, age, gender) VALUES ($1, $2, $3, $4, $5)";
const checkEmail = "SELECT * FROM users WHERE email = $1";
const updateUser = 'UPDATE users SET username = $1, password = $2 WHERE id = $3';
const removeUser = 'DELETE FROM users WHERE id=$1'

const addValues = 'INSERT INTO usersPref (user_input_id,u_Height, u_Weight, u_Disease, u_Diet_goal, u_Diet_plan, veg_non) VALUES ($1, $2, $3, $4, $5, $6, $7)';
const fetchValuesById = 'SELECT * FROM usersPref WHERE user_input_id = $1'
const getCardValues = 'SELECT * FROM nutri_1 WHERE food_id = ANY($1)';
const getPersonalisedValues = `
SELECT n.*
FROM nutri_1 n
JOIN usersPref u
ON u.Veg_Non = n.veg_non
AND u.u_diet_plan = n.diet_plan
AND u.u_diet_goal = n.diet_goal
WHERE u.u_height BETWEEN n.height - 10 AND n.height + 10
AND u.u_weight BETWEEN n.weight - 10 AND n.weight + 10
AND u.user_input_id = $1
`;
const updatePersonalisedData = `UPDATE usersPref
SET u_Height = $2,
    u_Weight = $3,
    u_Disease = $4,
    u_Diet_goal = $5,
    u_Diet_plan = $6,
    veg_non = $7
WHERE user_input_id = $1;`


module.exports = {
    getUsers,
    getuserById,
    createUser,
    checkEmail,
    updateUser,
    removeUser,
    addValues,
    getCardValues,
    getPersonalisedValues,
    fetchValuesById,
    updatePersonalisedData,
};
