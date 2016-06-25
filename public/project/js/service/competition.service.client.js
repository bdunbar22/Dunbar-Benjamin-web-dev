/**
 * Created by Ben on 6/20/16.
 * Allows for API calls to the server to give CRUD operations.
 * Gives operations for the Competition services.
 */

(function () {
    angular
        .module("BenProject")
        .factory("CompetitionService", CompetitionService);

    function CompetitionService($http) {
        var api = {
            createCompetition: createCompetition,
            findCompetitionsByUser: findCompetitionsByUser,
            findCompetitionsForJudge: findCompetitionsForJudge,
            findCompetitionById: findCompetitionById,
            findAllCompetitions: findAllCompetitions,
            search: search,
            updateCompetition: updateCompetition,
            computeWinner: computeWinner,
            deleteCompetition: deleteCompetition
        };
        return api;

        function createCompetition(userId, competition) {
            var url = "/project/api/user/" + userId + "/competition";
            return $http.post(url, competition);
        }

        function findCompetitionsByUser(userId) {
            var url = "/project/api/user/" + userId + "/competition";
            return $http.get(url);
        }

        function findCompetitionsForJudge(userId) {
            var url = "/project/api/judge/" + userId + "/competition";
            return $http.get(url);
        }

        function findCompetitionById(competitionId) {
            var url = "/project/api/competition/" + competitionId;
            return $http.get(url);
        }

        function findAllCompetitions() {
            var url = "/project/api/competition/";
            return $http.get(url);
        }
        
        function computeWinner(competitionId) {
            var url = "/project/api/competition/" + competitionId + "/finish";
            return $http.get(url);
        }

        function search(text) {
            var url = "/project/api/competition/search/" + text;
            return $http.get(url);
        }

        function updateCompetition(competitionId, competition) {
            var url = "/project/api/competition/" + competitionId;
            return $http.put(url, competition);
        }

        function deleteCompetition(competitionId) {
            var url = "/project/api/competition/" + competitionId;
            return $http.delete(url);
        }
    }
})();