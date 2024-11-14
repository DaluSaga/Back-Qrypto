import prisma from '../../lib/prisma.js';

/**
 * @Author : Jobserd Julián Ocampo,   @date 2024-08-10 16:45:12
 * @description : Refactorizacion, servicio central de la preview del qr
**/
class QrPreviewService {
  async createQrPreview (qrPreviewData, qrId){
  try {
    const qrPreview = await prisma.qrPreview.upsert({
      where: { qrId }, // Busca el registro existente por qrId
      update: {
        title: qrPreviewData.title || undefined,
        colorTitle: qrPreviewData.colorTitle || undefined,
        description: qrPreviewData.description || undefined,
        descriptionColor: qrPreviewData.descriptionColor || undefined,
        boxColor: qrPreviewData.boxColor || undefined,
        borderImg: qrPreviewData.borderImg || undefined,
        imgBoxBackgroud: qrPreviewData.imgBoxBackgroud || undefined,
        backgroudColor: qrPreviewData.backgroudColor || undefined,
        SelectOptions: qrPreviewData.SelectOptions || undefined,
        idFontPreview:qrPreviewData.idFontPreview || undefined
      },
      create: {
        title: qrPreviewData.title || undefined,
        colorTitle: qrPreviewData.colorTitle || undefined,
        description: qrPreviewData.description || undefined,
        descriptionColor: qrPreviewData.descriptionColor || undefined,
        boxColor: qrPreviewData.boxColor || undefined,
        borderImg: qrPreviewData.borderImg || undefined,
        imgBoxBackgroud: qrPreviewData.imgBoxBackgroud || undefined,
        backgroudColor: qrPreviewData.backgroudColor || undefined,
        SelectOptions: qrPreviewData.SelectOptions || undefined,
        idFontPreview:qrPreviewData.idFontPreview || undefined,
        qrId,
      },
    });
    return qrPreview;
  } catch (error) {
    console.error("Error upserting QR preview:", error);
    throw error;
  }
};

async createQrMenuPreview(menuPreviewData,qrId){
  const {idUserTemplate}=menuPreviewData;
  let userTemplate=null
  try{
      if(menuPreviewData.idUserTemplate!==null){
        const saveUserTemplate=await prisma.userTemplates.create({
          data:{
            templateLink:idUserTemplate,
          }
        });
        
        if(saveUserTemplate){
          userTemplate=saveUserTemplate.id
        }
      }

      const queryMenu=await prisma.menuPreview.upsert({
          where:{qrId},
          update:{
              restaurantName:menuPreviewData.restaurantName,
              restaurantLogo:menuPreviewData.restaurantLogo,
              backgroundCard:menuPreviewData.backgroundCard,
              colorMenu:menuPreviewData.colorMenu,
              idFontPreview:menuPreviewData.idFontPreview,
              idImgTemplate:menuPreviewData.idImgTemplate,
              idUserTemplate:menuPreviewData.idUserTemplate,
              category:menuPreviewData.category
          },
          create:{
              restaurantName:menuPreviewData.restaurantName,
              restaurantLogo:menuPreviewData.restaurantLogo,
              backgroundCard:menuPreviewData.backgroundCard,
              colorMenu:menuPreviewData.colorMenu,
              idFontPreview:menuPreviewData.idFontPreview,
              idImgTemplate:menuPreviewData.idImgTemplate,
              idUserTemplate:userTemplate,
              category:menuPreviewData.category,
              qrId
          }
      })
      console.log(queryMenu);
      return queryMenu;
  }catch(error){
      console.error("error saving or updating qr: ",error.message)
      throw error
  }
}
}

export default new QrPreviewService();
