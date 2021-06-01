const router = require("express").Router();
const Workout = require("../models/workout.js");

router.post("/workouts", ({ body }, res) => {
    Workout.create(body)
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});
router.put("/workouts/:id", (req, res) => {
    try {
        Workout.updateOne(
            { _id: req.params.id },
            { $push: { exercises: req.body } })
            .then(dbWorkout => {    
                console.log(dbWorkout)
                res.json(dbWorkout);
            })
            .catch(err => {
                res.status(400).json(err);
            });


    } catch (error) {
        res.status(400).send(error)
    }
});
router.get("/workouts", ({ body }, res) => {
    Workout.aggregate( [
        {
          $addFields: {
            totalDuration: { $sum: "$exercises.duration" } 
          }
        }])
        .sort({ day: -1 })
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});
router.get("/workouts/range", ({ body }, res) => {
    Workout.aggregate( [
        {
          $addFields: {
            totalDuration: { $sum: "$exercises.duration" } 
          }
        }])
        .sort({ day: -1 })
        .limit(7)
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});
module.exports = router;
