import prisma from "../../lib/prisma.js";
import Boom from '@hapi/boom';
import { fontPreviewByid,imgTemplateByid,userTemplateByid } from "../verifyQr/previewController.controller.js";


/**
 * @Author : Jobserd Julián Ocampo,   @date 2024-07-19 09:02:42
 * @description : Esta función verifica la validez de un QR, comprobando la cantidad de escaneos permitidos, el estado del QR (activo o inactivo) y las membresías asociadas.
 * @Params : El id del QR se obtiene a través de una query
 * @return: Retorna mensajes de validación del QR y otros posibles errores. Si todo es correcto, también retorna el elemento QR correspondiente.
**/

const verifyQrController = async (req, res, next) => {
    const qrId = req.query.q;
    let responseData;

    if (!qrId) {
        return next(Boom.badRequest('ID de QR no proporcionado'));
    }

    try {
        // Buscar los datos del QR en la base de datos
        const qrData = await findQrInDatabase(qrId);

        if (!qrData) {
            return next(Boom.notFound('QR no encontrado'));
        }

        // Buscar el tipo de QR en la base de datos
        const qrType = await prisma.qrType.findUnique({ where: { id: qrData.qrTypeId } });

        if (!qrType) {
            return next(Boom.notFound('Tipo de QR no encontrado'));
        }

        // Si el tipo es "food-menu", cargar plantillas e información del menú
        if (qrType.type === "food-menu") {
            // Aquí aseguramos que MenuPreview viene de qrData
            const menuPreview = qrData.MenuPreview;

            if (!menuPreview) {
                return next(Boom.notFound('Datos del menú no encontrados'));
            }

            // Cargar las plantillas e información extra
            const imgTemplate = await imgTemplateByid(menuPreview.idImgTemplate);
            const fontPreview = await fontPreviewByid(menuPreview.idFontPreview);
            const userTemplate = await userTemplateByid(menuPreview.idUserTemplate);

            // Construir la respuesta
            responseData = {
                qrType: qrType.type,
                ...qrData,
                MenuPreview: {
                    restaurantName: menuPreview.restaurantName,
                    restaurantLogo: menuPreview.restaurantLogo,
                    backgroundCard: menuPreview.backgroundCard,
                    colorMenu: menuPreview.colorMenu,
                    category: menuPreview.category,
                }
            };

            // Añadir las plantillas si existen
            if (imgTemplate) {
                responseData.MenuPreview.imgTemplate = imgTemplate;
            }
            if (userTemplate) {
                responseData.MenuPreview.userTemplate = userTemplate;
            }
            if (fontPreview) {
                responseData.MenuPreview.fontPreview = fontPreview;
            }
        } else {
            // Para otros tipos de QR, manejar los datos de la previsualización de QR
            const qrPreview = qrData.QrPreview;

            if (!qrPreview) {
                return next(Boom.notFound('Datos de previsualización del QR no encontrados'));
            }

            // Convertir la imagen de fondo a base64 si existe
            const imgBoxBackgroundBase64 = qrPreview.imgBoxBackgroud
                ? qrPreview.imgBoxBackgroud.toString('base64')
                : null;

            // Construir la respuesta
            responseData = {
                qrType: qrType.type,
                ...qrData,
                QrPreview: {
                    ...qrPreview,
                    imgBoxBackgroundBase64,
                },
            };
        }

        // Devolver la respuesta JSON
        res.json(responseData);

    } catch (err) {
        console.error(err);
        next(Boom.internal('Error interno del servidor'));
    }
};


const findQrInDatabase = async (id) => {
    return await prisma.qr.findUnique({
        where: { 
            id,
            state: true,
        },
        include: {
            QrDesign: true,
            QrText: {
                include: {
                    QrTextFont: true,
                    QrTextBubble: true,
                },
            },
            QrLogo: true,
            QrPreview: true,
            MenuPreview:true,
            user: true,
        },
    });
};

export const getFonts=async(req,res)=>{
    try{
        const fonts= await prisma.qrTextFont.findMany();

        if(fonts.length){
            return res.status(200).json(fonts);
        }
    }catch(error){
        console.error("error request: ",error.message);
        res.status(500).json({message:error.message});
    }
}

export {verifyQrController};