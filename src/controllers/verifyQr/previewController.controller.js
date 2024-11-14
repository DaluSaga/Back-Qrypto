import prisma from "../../lib/prisma.js";
/*
 * @Author : Nicolas Barrios,   @date 2024-09-16 16:09:39
 * @description : controladores para traer las fuentes y templates de las preview
 * @Params : id 
 * @return : retornan los datos de estas tablas
*/

export const getPreviewFonts=async(req,res)=>{
    try{
        const queryFonts=await prisma.fontsPreview.findMany();
        return res.status(200).json(queryFonts)
    }catch(error){
        console.error("error getting fonts: ",error.message);
        res.status(500).json({message:error.message});
    }
}

export const getTemplates=async(req,res)=>{
    try{
        const queryTemplates=await prisma.imgTemplates.findMany();
        return res.status(200).json(queryTemplates);
    }catch(error){
        console.error("error getting templates: ",error.message);
        res.status(500).json({message:error.message});
    }
}

export const getOneFont=async(req,res)=>{
    const {id}=req.params;
    try{
        const queryFont=await prisma.fontsPreview.findUnique({
            where:{
                id:id
            }
        })
        if(queryFont.length == 0){
            console.log("doesnt exist a font with this id");
        }

        return res.status(200).json(queryFont);
    }catch(error){
        console.error("error getting font: ",error.message)
    }
}

export const getOneTemplate=async(req,res)=>{
    const {id}=req.params;
    try{
        const query=await prisma.imgTemplates.findUnique({
            where:{
                id:id,
            }
        })
        if(query.length == 0){
            console.log("doenst exist a template with this id");
        }

        return res.status(200).json(query);
    }catch(error){
        console.error("error getting template: ",error.message);
        res.status(500).json({message:error.message});
    }
}

export const getTemplateUser=async(req,res)=>{
    const {id}=req.params;
    try{
        const userTemplate=await prisma.userTemplates.findUnique({
            where:{
                id:id
            }
        })
        if(userTemplate){
            res.status(200).json(userTemplate.templateLink);
        }
    }catch(error){
        console.error("error getting user template ",error.message);
        res.status(500).json({message:error.message})
    }
}

export const imgTemplateByid=async(id)=>{
    try{
        const getimg=await prisma.imgTemplates.findUnique({
            where:{
                id:id
            }
        })

        if(getimg!==null){
            return getimg.image
        }else{
            return null
        }
    }catch(error){
        console.log(error.message)
    }
};

export const userTemplateByid=async(id)=>{
    try{
        const getusertemplate=await prisma.userTemplates.findUnique({
            where:{
                id:id
            }
        })

        if(getusertemplate!==null){
            return getusertemplate.templateLink
        }else{
            return null
        }
    }catch(error){
        console.log(error.message)
    }
};

export const fontPreviewByid=async(id)=>{
    try{
        const getfont=await prisma.fontsPreview.findUnique({
            where:{
                id:id
            }
        })

        if(getfont!==null){
            return getfont.fontName
        }else{
            return null
        }
    }catch(error){
        console.log(error.message)
    }
};