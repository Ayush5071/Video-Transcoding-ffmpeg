import multer from "multer"
import { v4 as uuidv4 } from "uuid";
import path from "path";

export const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,"./uploads")  // in cb 1st option is for error .. since we are not creating production app soleave it for now
    },
    filename: function(req,file,cb){
        cb(null,file.fieldname + "-" + uuidv4() + path.extname(file.originalname))
    }
})