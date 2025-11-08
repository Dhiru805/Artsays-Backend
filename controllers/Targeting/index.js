const createAutoTargeting= require("./DefaultAutoTargeting/create");
const updateAutoTargeting= require("./DefaultAutoTargeting/update");
const getAutoTargeting= require("./DefaultAutoTargeting/get");
const deleteAutoTargeting= require("./DefaultAutoTargeting/delete");

const createGroupTargeting= require("./AutoGroupTargeting/create");
const updateGroupTargeting= require("./AutoGroupTargeting/update");
const getGroupTargeting= require("./AutoGroupTargeting/get");
const deleteGroupTargeting= require("./AutoGroupTargeting/delete");


const createKeywordTargeting= require("./KeywordTargeting/create");
const updateKeywordTargeting= require("./KeywordTargeting/update");
const getKeywordTargeting= require("./KeywordTargeting/get");
const deleteKeywordTargeting= require("./KeywordTargeting/delete");

const gettargetinggroupandauto =require("./GetAllTargeting/gettargetinggroupandauto");
const getallkeywordtagetingavaerage =require("./KeywordTargeting/getavargekeyword");

module.exports = {
createAutoTargeting,
updateAutoTargeting,
getAutoTargeting,
deleteAutoTargeting,

createGroupTargeting,
updateGroupTargeting,
getGroupTargeting,
deleteGroupTargeting,

createKeywordTargeting,
updateKeywordTargeting,
getKeywordTargeting,
deleteKeywordTargeting,

gettargetinggroupandauto,
getallkeywordtagetingavaerage


};