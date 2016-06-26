/**
 * Created by Ben on 6/13/16.
 * Allows for competition CRUD operations. (Create, Read, Update, Delete)
 */

module.exports = function(app, models) {
    /* DB Model */
    var competitionModel = models.competitionModel;
    var userModel = models.userModel;
    var postModel = models.postModel;

    /* Paths that are allowed. */
    app.post("/project/api/user/:userId/competition", createCompetition);
    app.get("/project/api/user/:userId/competition", findCompetitionsByUser);
    app.get("/project/api/judge/:userId/competition", findCompetitionsForJudge);
    app.get("/project/api/competition/:competitionId", findCompetitionById);
    app.get("/project/api/competition/", findAllCompetitions);
    app.put("/project/api/competition/:competitionId/finish", finishCompetition);
    app.get("/project/api/competition/search/:text", search);
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

    function findCompetitionsForJudge(req, resp) {
        var userId =  req.params["userId"];

        competitionModel
            .findCompetitionsForJudge(userId)
            .then(
                function (competition) {
                    resp.json(competition);
                },
                function (error) {
                    resp.status(400).send("Judge with id: " + userId + " has no competitions.");
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

    function findAllCompetitions(req, resp) {
        competitionModel
            .findAllCompetitions()
            .then(
                function (competitions) {
                    resp.json(competitions);
                },
                function (error) {
                    resp.status(400).send(error);
                }
            );
    }

    function search(req, resp) {
        var searchText = req.params["text"];

        competitionModel
            .search(searchText)
            .then(
                function (competitions) {
                    resp.json(competitions);
                },
                function (err) {
                    resp.status(400).send(err);
                }
            );
    }

    function updateCompetition(req, resp) {
        var competitionId =  req.params["competitionId"];
        var newCompetition = req.body;
        delete newCompetition['_id'];
        competitionModel
            .findCompetitionById(competitionId)
            .then(
                function (competition) {
                    if(competition.complete) {
                        resp.status(400).send("Competition with id: " + competitionId + " is already complete.");
                    } else {
                        return competitionModel
                                .updateCompetition(competitionId, newCompetition);
                    }
                },
                function (error) {
                    resp.status(400).send("Competition with id: " + competitionId + " not found.");
                }
            )
            .then(
                function (competition) {
                    resp.json(competition);
                },
                function (error) {
                    resp.status(400).send("Competition with id: " + competitionId + " not found.");
                }
            );
    }

    function finishCompetition(req, resp) {
        var competitionId =  req.params["competitionId"];
        var newCompetition = req.body;
        delete newCompetition['_id'];
        var winner = '';
        competitionModel
            .findCompetitionById(competitionId)
            .then(
                function (competition) {
                    if(competition.complete) {
                        resp.status(400).send("Competition with id: " + competitionId + " is already complete.");
                    } else if(competition.votes.length < 1) {
                        resp.status(400).send("Competition with id: " + competitionId + " has no votes.");
                    } else {
                        var votes = newCompetition.votes;
                        //Improve.
                        newCompetition.winner = votes[0];
                        winner = newCompetition.winner;
                        newCompetition.complete = true;
                        delete newCompetition['_id'];

                        return competitionModel
                                .updateCompetition(competitionId, newCompetition);
                    }
                },
                function (error) {
                    resp.status(400).send("Competition with id: " + competitionId + " not found.");
                }
            )
            .then(
                function (competition) {
                    return postModel
                            .findPostById(winner);
                }, function (error) {
                    resp.status(400).send("Competition with id: " + competitionId + " was not completed." + error);
                }
            )
            .then(
                function (post) {
                    var userId = post._user;
                    return userModel
                        .findUserById(userId);
                }, function (error) {
                    resp.status(400).send("Competition with id: " + competitionId + " was not completed. Could not find post.");
                }
            )
            .then(
                function (user) {

                    var user = user._doc;
                    user.trophyCount += 1;
                    var userId = user._id;
                    delete user['_id'];

                    return userModel
                        .updateUser(userId, user);
                }, function (error) {
                    resp.status(400).send("Competition with id: " + competitionId + " was not completed. Could not find owner of post.");
                }
            )
            .then(
                function (user) {
                    resp.json(user);
                },
                function (error) {
                    resp.status(400).send("User with id: " + userId + " was not found. Update failed.");
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