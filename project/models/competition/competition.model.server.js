/**
 * Created by Ben on 6/13/16.
 */

module.exports = function (projectDB) {
    var CompetitionSchema = require("./competition.schema.server.js")();
    var Competition = projectDB.model("Competition", CompetitionSchema);

    var api = {
        createCompetition: createCompetition,
        findCompetitionsByUser: findCompetitionsByUser,
        findCompetitionById: findCompetitionById,
        findAll: findAll,
        updateCompetition: updateCompetition,
        deleteCompetition: deleteCompetition
    };
    return api;

    function createCompetition(userId, competition) {
        competition._user =  userId;
        return Competition.create(competition);
    }

    function findCompetitionsByUser(userId) {
        return Competition.find({_user: userId});
    }

    function findCompetitionById(competitionId) {
        return Competition.findById(competitionId);
    }

    function findAll() {
        return Competition.find();
    }

    function updateCompetition(competitionId, competition) {
        return Competition.update({_id: competitionId}, {$set: competition});
    }

    function deleteCompetition(competitionId) {
        return Competition.remove({_id: competitionId});
    }
};