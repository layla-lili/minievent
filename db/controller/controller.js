const db = require("./db/models");
const { event } = require("./db/models/Events");

const express = require("express");
const app = express();
app.use(express.json());
const { QueryTypes ,sequelize} = require('sequelize');

db.sequelize.sync();

const getEvent = async (request, response) => {
    await sequelize.query('SELECT * FROM event ORDER BY id ASC', {model: event},(error, results) => {
      if (error) {
          console.log("🚀 ~ file: app.js ~ line  ~ event", event)
        throw error
      
      }
      response.status(200).json(results.rows)
    })
  }

   const getEventById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM event WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  //post
  const createEvent = (request, response) => {
    const { name, email, organizer, date, numOfSeats, bookedSeats, startDate, endDate,image} = request.body
  
    pool.query('INSERT INTO event (name, email,organizer, date, numOfSeats, bookedSeats, startDate, endDate,image) VALUES ($1, $2)', 
    [name, email,organizer, date, numOfSeats, bookedSeats, startDate, endDate,image], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`User added with ID: ${result.insertId}`)
    })
  }

  const updateEvent = (request, response) => {
    const id = parseInt(request.params.id)
    const { name, email, organizer, date, numOfSeats, bookedSeats, startDate, endDate,image} = request.body
  
    pool.query(
      'UPDATE users SET name = $1, email = $2, organizer=$3, date=$4, numOfSeats=$5, bookedSeats=$6, startDate=$7, endDate=$8,image=$9 WHERE id = $3',
      [name, email, id, organizer, date, numOfSeats, bookedSeats, startDate, endDate,image],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`User modified with ID: ${id}`)
      }
    )
  }

  const deleteEvent = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM event WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User deleted with ID: ${id}`)
    })
  } 