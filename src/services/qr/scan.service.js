import prisma from "../../lib/prisma.js";

/*
 * @Author : Nicolas Barrios,   @date 2024-10-30 22:23:26
 * @description : servicio que guarda los procedimientos requeridos en la base de datos para manejar el scaeno del qr
 * @Params :
 * @return :
*/

class ScanService {
    async GetQrById(qrId) {
        try {
            const qrData = await prisma.qr.findMany({
                where: { id: qrId },
                include: { user: true }
            });

            if (!qrData) {
                console.log("QR no existe");
                throw new Error("QR no encontrado");
            }

            const qr=qrData[0];

            return qr;
        } catch (error) {
            console.error("Error al obtener QR por ID: ", error.message);
            throw new Error("Error al obtener el QR por ID");
        }
    }

    async GetMembershipUserByQr(userId) {
        try {
            const membershipData = await prisma.membershipUser.findUnique({
                where: { userId: userId },
                include: { membership: true }
            });

            if (!membershipData) {
                console.error("El usuario no tiene una membresía");
                throw new Error("Usuario sin membresía encontrada");
            }

            return membershipData.membership;
        } catch (error) {
            console.error("Error al obtener la membresía del usuario: ", error.message);
            throw new Error("Error al obtener la membresía del usuario");
        }
    }

    async UpdateCounterScan(qrId) {
        try {
            const updatedCounter = await prisma.qr.update({
                where: { id: qrId },
                data: { scan_count: { increment: 1 } }
            });

            if (!updatedCounter) {
                throw new Error("Error al actualizar el contador de escaneos");
            }

            return true;
        } catch (error) {
            console.error("Error al actualizar el contador de escaneo del QR: ", error.message);
            throw new Error("Error al actualizar el contador de escaneo");
        }
    }
}

export default new ScanService();
