import { Router } from "express";
import { getOneFont, getOneTemplate, getPreviewFonts, getTemplates, getTemplateUser } from "../controllers/verifyQr/previewController.controller.js";

const router=Router();

//rutas controladores de funciones previewController.controller.js

router.get('/getFonts',getPreviewFonts);
router.get('/getTemplates',getTemplates);
router.get('/getTemplates/:id',getOneTemplate);
router.get('/getFonts/:id',getOneFont);
router.get('/getUserTemplate/:id',getTemplateUser);

export default router;