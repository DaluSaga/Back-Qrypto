import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
    cloud_name:"da3wunghw",
    api_key:"862334986127346",
    api_secret:"mM9Ot9gPnAOQkVi4DFqo_pjzJRI"
})

export const deleteImgFromCloudinary=async(req,res)=>{
    const id=req.params;
    try{
        const deleteImg=await cloudinary.uploader.destroy(id);
        res.status(200).json({ success: true, deleteImg });
    }catch(error){
        console.error("error destroying image id: ",error.message);
        res.status(500).json({ success: false, message: 'No se pudo eliminar la imagen', error });
    }
}   