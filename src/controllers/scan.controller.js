/*
 * @Author : Nicolas Barrios,   @date 2024-10-30 22:21:16
 * @description :controlador de scaneo de qr 
 * @Params : qrId que es el id del qr scaneado
 * @return :
*/

import scanService from "../services/qr/scan.service.js";

export const ScanController = async (req, res) => {
    const { qrId } = req.params;

    try {
        const qr = await scanService.GetQrById(qrId);

        if (!qr) {
            console.error("QR no encontrado");
            return res.status(404).json({ message: "QR no encontrado" });
        }

        const user = qr.userId;
        const membershipUser = await scanService.GetMembershipUserByQr(user);

        if (!membershipUser) {
            console.error("Membresía de usuario no encontrada");
            return res.status(404).json({ message: "Membresía de usuario no encontrada" });
        }

        console.log("Contador de escaneos del QR:", qr.scan_count);
        console.log("Límite de escaneos de la membresía:", membershipUser.scan_qrs);

        if (membershipUser.description=="Free" || membershipUser.description=="Basic" && qr.scan_count >= membershipUser.scan_qrs) {
            console.log("Redirigiendo a limitScans por límite de escaneos alcanzado");
            return res.redirect("http://localhost:5173/limitScans");
        }

        const updateCounter = await scanService.UpdateCounterScan(qr.id);

        if (updateCounter) {
            return res.redirect(qr.url);
        } else {
            return res.status(500).json({ message: "Error al actualizar el contador de escaneos" });
        }
    } catch (error) {
        console.error("Error al escanear el QR: ", error.message);
        res.status(500).json({ message: error.message });
    }
};
