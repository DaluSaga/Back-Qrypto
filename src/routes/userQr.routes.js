import express from "express";
import { qrDataSchema } from "../schemas/index.js";
import { validatorHandler } from "../middleware/validator.handler.js";
import { patchQrs, getpreview, edit, getPreviewToUpdate } from "../controllers/user/qr.controller.js";
import { createQrUserController, getQrUserController } from "../controllers/index.js";
import { deleteImgFromCloudinary } from "../controllers/cloudController.js";
import { ScanController } from "../controllers/scan.controller.js";

const router = express.Router();

    // @description : Esta ruta permite guardar un nuevo código QR en la base de datos.
    // @description : Esta ruta permite obtener todos los códigos QR asociados a un usuario específico. 
router.post(
    '/',
    validatorHandler(qrDataSchema, 'body'),
    createQrUserController
);
router.patch("/edit/:id", edit)
router.get("/", getQrUserController);

router.patch("/patchqrs/:id", patchQrs);
router.get("/getpreview/:id", getpreview);
router.get("/getPreviewUpdate/:id",getPreviewToUpdate)
router.delete("/imgCloudinary/:id",deleteImgFromCloudinary)
router.get("/scan/:qrId",ScanController)

export default router;
