/**
 * Created by Ben on 6/13/16.
 * Allows for competition CRUD operations. (Create, Read, Update, Delete)
 */

module.exports = function(app, models) {
    /* DB Model */
    var competitionModel = models.competitionModel;

    /* Paths that are allowed. */
    app.post("/project/api/user/:userId/competition", createCompetition);
    app.get("/project/api/user/:userId/competition", findCompetitionsByUser);
    app.get("/project/api/competition/:competitionId", findCompetitionById);
    app.put("/project/api/competition/:competitionId", updateCompetition);
    app.delete("/project/api/competition/:competitionId", deleteCompetition);

    /* Functions */
    function createCompetition(req, resp) {
        var newCompetition = req.body;
        var userId = req.params["userId"];

        competitionModel
            .createCompetition(userId, newCompetition)
            .then(
                function (competition) {
                    resp.json(competition);
                },
                function (error) {
                    resp.status(400).send("Competition creation failed.");
                }
            );
    }

    function findCompetitionsByUser(req, resp) {
        var userId =  req.params["userId"];

        competitionModel
            .findCompetitionsByUser(userId)
            .then(
                function (competition) {
                    resp.json(competition);
                },
                function (error) {
                    resp.status(400).send("User with id: " + userId + " has no competitions.");
                }
            );
    }

    function findCompetitionById(req, resp) {
        var competitionId =  req.params["competitionId"];

        competitionModel
            .findCompetitionById(competitionId)
            .then(
                function (competition) {
                    resp.json(competition);
                },
                function (error) {
                    resp.status(400).send("Competition with id: " + competitionId + " not found.");
                }
            );
    }

    function updateCompetition(req, resp) {
        var competitionId =  req.params["competitionId"];
        var newCompetition = req.body;

        competitionModel
            .updateCompetition(competitionId, newCompetition)
            .then(
                function (competition) {
                    resp.json(competition);
                },
                function (error) {
                    resp.status(400).send("Competition with id: " + competitionId + " not found.");
                }
            );
    }

    function deleteCompetition(req, resp) {
        var competitionId =  req.params["competitionId"];

        competitionModel
            .deleteCompetition(competitionId)
            .then(
                function (competition) {
                    resp.json(competition);
                },
                function (error) {
                    resp.status(400).send("Competition with id: " + competitionId + " not found.");
                }
            );
    }
};