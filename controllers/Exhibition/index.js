const createExhibition= require("./Exhibition/create");
const updateExhibition =require("./Exhibition/update");
const getExhibitionsByUserType=require("./Exhibition/get");
const deleteExhibitionById =require("./Exhibition/delete");
const getExhibitionbyuserId =require("./Exhibition/getbyuserId");
const getonlyartistseller =require("./Exhibition/getonlyartistseller");
const updateExhibitionStatus =require("./Exhibition/UpdateExhibtionStatus")






module.exports = {
createExhibition,
updateExhibition,
getExhibitionsByUserType,
deleteExhibitionById,
getExhibitionbyuserId,
getonlyartistseller,
updateExhibitionStatus
};