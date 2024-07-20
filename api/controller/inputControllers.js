var jwt = require("jsonwebtoken");
var bcryptjs = require("bcryptjs");
const query = require('../queries/queries1')
const pool = require('../db');

const inputVal = async (req, res, next) => {

    const { user_input_id, u_Height, u_Weight, u_Disease, u_Diet_goal, u_Diet_plan, veg_non } = req.body;

    // pool.query(query.addValues, [user_input_id, u_Height, u_Weight, u_Disease, u_Diet_goal, u_Diet_plan, veg_non], (err, result) => {
    //     if (err) {
    //         console.error(err);
    //         return res.status(500).json({ error: 'Internal Server Error' });
    //     }
    //     const dietValue = result.rows[0];
    //     res.status(201).json(dietValue);
    // });

    pool.query(query.addValues, [user_input_id, u_Height, u_Weight, u_Disease, u_Diet_goal, u_Diet_plan, veg_non], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        pool.query(query.fetchValuesById, [user_input_id], (fetchErr, fetchResult) => {
            if (fetchErr) {
                console.error(fetchErr);
                return res.status(500).json({ error: 'Error fetching newly created data' });
            }

            const newRecord = fetchResult.rows[0];
            res.status(201).json(newRecord);
        });
    });
}

const getDietVal = async (req, res, next) => {
    const { id } = req.params
    pool.query(query.getCardValues, [id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        const dietValue = result.rows[0];

        res.status(200).json(dietValue);
    });
}

const getRandomData = async (req, res, next) => {
    const rIds = [
        Math.floor(1000 * Math.random()),
        Math.floor(1000 * Math.random()),
        Math.floor(1000 * Math.random())
    ];

    pool.query(query.getCardValues, [rIds], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        const dietValues = result.rows;
        res.status(200).json(dietValues);
    });
};

const getPersonalised = async (req, res, next) => {
    const id = req.params.id

    pool.query(query.getPersonalisedValues, [id], (err, result) => {
        if (err) {
            console.error('Error executing query', err.stack);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (!result || !result.rows) {
            console.error('No results or rows in query response');
            return res.status(500).json({ error: 'Unexpected query result format' });
        }
        const dietPersonalised = result.rows;
        res.status(200).json(dietPersonalised)
    })

}
const updatePersonalised = async (req, res, next) => {
    const { user_input_id } = req.body;
    const { u_Height, u_Weight, u_Disease, u_Diet_goal, u_Diet_plan, veg_non } = req.body;

    try {
        // Update the personalised data
        await pool.query(query.updatePersonalisedData, [user_input_id, u_Height, u_Weight, u_Disease, u_Diet_goal, u_Diet_plan, veg_non]);

        // Fetch the updated record by ID
        const fetchResult = await pool.query(query.fetchValuesById, [user_input_id]);
        const updatedRecord = fetchResult.rows[0];

        // Respond with the updated record
        res.status(200).json(updatedRecord);
    } catch (error) {
        console.error('Error updating personalised data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { inputVal, getDietVal, getRandomData, getPersonalised, updatePersonalised }