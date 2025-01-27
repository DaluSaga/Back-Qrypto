import prisma from "../../lib/prisma.js";
import { getDate } from "../../utils/dateUtils.js";
import { useSend } from "../../utils/useSend.js";
import boom from '@hapi/boom';
import QrService from "../../services/qr/qr.service.js";
import i18n from "i18n";
import { fontPreviewByid,imgTemplateByid,userTemplateByid } from "../verifyQr/previewController.controller.js";

export const getQrType=async(id)=>{
  try{
    const qrType=await prisma.qrType.findUnique({
      where:{
        id:id
      }
    })
    return qrType.type
  }catch(error){
    console.log(error.message)
  }
}

export const patchQrs = async (req, res) => {
  const { id } = req.params;
  const { state } = req.body;

  try {
    // Obtener el QR para determinar el usuario asociado
    const qr = await prisma.qr.findUnique({
      where: { id },
      include: { user: true } // Incluye el usuario asociado al QR
    });

    if (!qr) {
      return res.status(404).json({ error: 'QR code not found' });
    }

    const userId = qr.userId;

    // Obtener la membresía del usuario
    const membershipUser = await prisma.membershipUser.findUnique({
      where: { userId },
      include: {
        membership: true,
      },
    });

    if (!membershipUser) {
      return res.status(404).json({ error: i18n.__('Membership not found for user') });
    }

    // Contar el número de QR activos del usuario
    const activeQrCount = await prisma.qr.count({
      where: {
        userId: userId,
        state: true, // Solo cuenta los QR activos
      },
    });

    // Verificar si la acción solicitada es válida según la membresía del usuario
    if (state && activeQrCount >= membershipUser.membership.active_qrs) {
      return res.status(403).json({ error: i18n.__('Cannot activate QR; limit of active QR codes reached.') });
    }

    if (!state && activeQrCount <= 0) {
      return res.status(403).json({ error: i18n.__('Cannot deactivate QR; no active QR codes to deactivate.') });
    }

    // Actualizar el estado del QR
    const updatedQR = await prisma.qr.update({
      where: { id },
      data: { state },
    });

    res.json(updatedQR);
  } catch (error) {
    console.error('Error updating QR code:', error);
    res.status(500).json({ error: i18n.__('Failed to update QR code') });
  }
};

/*
 * @UpdatedBy : Nicolas Barrios,   @date 2024-10-02 21:58:40
 * @description : se agrego funcionalidad para mostrar la preview del qr de menu de comidas
*/

export const getpreview = async (req, res) => {
  const { id } = req.params;
  let responseData=null;

  try {
    // Suponiendo que tienes una relación definida entre Qr y QrPreview
    const qrData = await prisma.qr.findUnique({
      where: { id },
      include: {
        QrPreview: true,
        MenuPreview:true,
        QrDesign: true,
        QrLogo: true,
        QrText: {
          include: {
            QrTextBubble: true,
            QrTextFont:true
          }
        }
        // Utiliza el nombre correcto de la relación en tu esquema de Prisma
      },
    });

    if (!qrData) {
      return res.status(404).json({ message: 'QR code not found' });
    }

    const { QrPreview , QrDesign, QrLogo, QrText, MenuPreview} = qrData;
    let imgTemplate;
    let fontPreview;
    let userTemplate;

    const typeQr=await getQrType(qrData.qrTypeId);
    console.log("tipo de qr: ",typeQr," tipo: ",typeof typeQr);

    
    if(typeQr==="food-menu"){
      imgTemplate=await imgTemplateByid(MenuPreview.idImgTemplate);
      fontPreview=await fontPreviewByid(MenuPreview.idFontPreview);
      userTemplate=await userTemplateByid(MenuPreview.idUserTemplate);
      
      responseData=({
      typeQr:typeQr,
      restaurantName:MenuPreview.restaurantName,
      restaurantLogo:MenuPreview.restaurantLogo,
      backgroundCard:MenuPreview.backgroundCard,
      colorMenu:MenuPreview.colorMenu,
      fontPreview:fontPreview,
      imgTemplate:imgTemplate,
      userTemplate:userTemplate,
      category:MenuPreview.category,
      frame: QrDesign.frame,
      frameColor: QrDesign.frameColor,
      dots: QrDesign.dots,
      dotsColor: QrDesign.dotsColor,
      cornerSquare: QrDesign.cornerSquare,
      cornerSquareColor: QrDesign.cornerSquareColor,
      cornerDot: QrDesign.cornerDot,
      cornerDotColor: QrDesign.cornerDot,
      logo: QrLogo ? QrLogo.logo : null
      })
    }else{
      const imgBoxBackgroundBase64 = QrPreview.imgBoxBackgroud
      ? QrPreview.imgBoxBackgroud.toString('base64')
      : null; 

        responseData = ({
        typeQr:typeQr,
        title: QrPreview.title,
        colorTitle: QrPreview.colorTitle,
        description: QrPreview.description,
        descriptionColor: QrPreview.descriptionColor,
        boxColor: QrPreview.boxColor,
        borderImg: QrPreview.borderImg,
        image: imgBoxBackgroundBase64,
        backgroundColor: QrPreview.backgroudColor,
        selectedOptions: QrPreview.SelectOptions,
        idFontPreview:QrPreview.idFontPreview,
        frame: QrDesign.frame,
        frameColor: QrDesign.frameColor,
        dots: QrDesign.dots,
        dotsColor: QrDesign.dotsColor,
        cornerSquare: QrDesign.cornerSquare,
        cornerSquareColor: QrDesign.cornerSquareColor,
        cornerDot: QrDesign.cornerDot,
        cornerDotColor: QrDesign.cornerDot,
        logo: QrLogo ? QrLogo.logo : null
      });  
    }

    
    if(QrText){
      responseData.text = QrText.text,
      responseData.position = QrText.position,
      responseData.colorText = QrText.colorText;

    if(QrText.QrTextBubble) {
      responseData.qrTextBubble = {
        burbble: QrText.QrTextBubble.bubble,
        color: QrText.QrTextBubble.color
      }
    }
    if(QrText.QrTextFont){
      responseData.qrTextFont = {
        fontFamily: QrText.QrTextFont.fontFamily
      }
    }
    }

    console.log("pingili", responseData);
    res.json(responseData)
  } catch (error) {
    console.error('Error fetching QR data:', error.message);
    res.status(500).json({ message:error.message });
  }
};


export const edit = async (req, res) => {
  try {
    const { qrData } = req.body; // Recibir qrData del cuerpo de la solicitud
    const userId = req.userId;
    const qrId = req.params.id; // Obtener el ID del QR a editar desde los parámetros de la ruta
    const dateCurrent = getDate(); // Obtén la fecha actual

    if (!qrData || !userId || !qrId) {
      throw boom.badRequest("Missing required fields");
    }

    const updateFields = {};

    // Validar y asignar campos de qrData
    if (qrData.qr) {
      if (qrData.qr.qrName && qrData.qr.qrName.length > 30) {
        return res.status(400).json({ message: "QR code name must be less than 30 characters" });
      }
      updateFields.name_qr = qrData.qr.qrName || await QrService.generateUniqueName(userId);
      updateFields.qr = qrData.qr.qr; // Actualiza si qrData.qr.qr está presente
      updateFields.qr_image_base64 = qrData.qrBase64; // Actualiza si qrData.qrBase64 está presente
    }

    if (qrData.qrDesign) {
      // Actualiza solo si qrData.qrDesign está presente
      const qrDesign = await QrService.qrDesignService.createQrDesign(qrData.qrDesign);
      updateFields.qrDesignId = qrDesign.id;
    }

    // Actualizar los campos necesarios en la tabla QR
    const updatedQR = await prisma.qr.update({
      where: { id: qrId },
      data: {
        ...updateFields,
        update_date: dateCurrent, // Usa update_date para la fecha de actualización
      },
    });

    // Actualizar campos adicionales dependiendo de la presencia en qrData
    if (qrData.qr) {
      const qrDataValue = QrService.generateQrDataValue(null, qrData, qrId); // Aquí no necesitas qrType
      await prisma.qr.update({
        where: { id: qrId },
        data: { qr: qrDataValue },
      });
    }

    if (qrData.qrLogo && qrData.qrLogo.logo) {
      const qrLogo = await QrService.qrLogoService.createQrLogo(qrData.qrLogo, qrId);
      console.log("qrLogo created:", qrLogo);
    }

    let qrPreview;

      if (qrData.qrPreview) {
        if(qrData.qr.qrType==="food-menu"){
          qrPreview = await QrService.qrPreviewService.createQrMenuPreview(qrData.qrPreview, qrId);
        }else{
        qrPreview = await QrService.qrPreviewService.createQrPreview(qrData.qrPreview, qrId);
        }
        console.log("qrPreview created:", qrPreview);
      }

    if (qrData.qrText && qrData.qrText.text !== "") {
      const qrText = await QrService.qrTextService.createQrTextElements(qrData.qrText, qrData.qrTextBubble, qrData.qrTextFont, qrId);
      console.log("qrText created:", qrText);
    }

    res.status(200).json({ message: "QR updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(err.isBoom ? err.output.statusCode : 500).json(err.isBoom ? err.output.payload : { message: 'Internal Server Error' });
  }
};

export const getPreviewToUpdate=async(req,res)=>{
  const { id } = req.params;
  let responseData=null;
  try{
    const qrData = await prisma.qr.findUnique({
      where: { id },
      include: {
        QrPreview: true,
        MenuPreview:true,
        QrDesign: true,
        QrLogo: true,
        QrText: {
          include: {
            QrTextBubble: true,
            QrTextFont:true
          }
        }
        // Utiliza el nombre correcto de la relación en tu esquema de Prisma
      },
    });

    if (!qrData) {
      return res.status(404).json({ message: 'QR code not found' });
    }

    const typeQr=await getQrType(qrData.qrTypeId);

    const { QrPreview , QrDesign, QrLogo, QrText, MenuPreview} = qrData;

    if(typeQr=="food-menu"){
    responseData=({
      qrName:qrData.name_qr,
      typeQr:typeQr,
      restaurantName:MenuPreview.restaurantName,
      restaurantLogo:MenuPreview.restaurantLogo,
      backgroundCard:MenuPreview.backgroundCard,
      colorMenu:MenuPreview.colorMenu,
      idFontPreview:MenuPreview.idFontPreview,
      idImgTemplate:MenuPreview.idImgTemplate,
      idUserTemplate:MenuPreview.idUserTemplate,
      category:MenuPreview.category,
      frame: QrDesign.frame,
      frameColor: QrDesign.frameColor,
      dots: QrDesign.dots,
      dotsColor: QrDesign.dotsColor,
      cornerSquare: QrDesign.cornerSquare,
      cornerSquareColor: QrDesign.cornerSquareColor,
      cornerDot: QrDesign.cornerDot,
      cornerDotColor: QrDesign.cornerDot,
      logo: QrLogo ? QrLogo.logo : null
      })
    }else{
      const imgBoxBackgroundBase64 = QrPreview.imgBoxBackgroud
      ? QrPreview.imgBoxBackgroud.toString('base64')
      : null; 

        responseData = ({
        qrName:qrData.name_qr,
        typeQr:typeQr,
        title: QrPreview.title,
        colorTitle: QrPreview.colorTitle,
        description: QrPreview.description,
        descriptionColor: QrPreview.descriptionColor,
        boxColor: QrPreview.boxColor,
        borderImg: QrPreview.borderImg,
        image: imgBoxBackgroundBase64,
        backgroundColor: QrPreview.backgroudColor,
        selectedOptions: QrPreview.SelectOptions,
        idFontPreview: QrPreview.idFontPreview,
        frame: QrDesign.frame,
        frameColor: QrDesign.frameColor,
        dots: QrDesign.dots,
        dotsColor: QrDesign.dotsColor,
        cornerSquare: QrDesign.cornerSquare,
        cornerSquareColor: QrDesign.cornerSquareColor,
        cornerDot: QrDesign.cornerDot,
        cornerDotColor: QrDesign.cornerDot,
        logo: QrLogo ? QrLogo.logo : null
      });  
    }

    
    if(QrText){
      responseData.text = QrText.text,
      responseData.position = QrText.position,
      responseData.colorText = QrText.colorText;

    if(QrText.QrTextBubble) {
      responseData.qrTextBubble = {
        burbble: QrText.QrTextBubble.bubble,
        color: QrText.QrTextBubble.color
      }
    }
    if(QrText.QrTextFont){
      responseData.qrTextFont = {
        fontFamily: QrText.QrTextFont.fontFamily
      }
    }
    }

    console.log("pingili", responseData);
    res.json(responseData)
  }catch(error){
    console.error("error preview to update: ",error.message)
    res.status(err.isBoom ? err.output.statusCode : 500).json(err.isBoom ? err.output.payload : { message: 'Internal Server Error' });
  }
}

