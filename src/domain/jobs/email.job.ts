import cron from 'node-cron';

import { EmailService } from '../service/email.service';
import { CasoModel } from '../../data/models/caso.model';
import { generateCasoEmailTemplate } from '../templates/email.template';
import { CasoDataSource } from '../datasources/Caso.datasource';
import { ICasoDocument } from '../entities/Caso.entitie';

export const emailJob = () => {

    cron.schedule('*/10 * * * * *', async () => {
        const emailService = new EmailService();
        const casoDataSource = new CasoDataSource();
        console.log("Cada 10 segundos")
        try {
            const casos = await CasoModel.find({ isSent: false });
            if (!casos.length) {
                console.log("No hay casos pendientes de enviar");
                return;
            }

            console.log(`procesando ${casos.length} casos.`);

            await Promise.all(
                casos.map(async (caso) => {
                    const htmlBody = generateCasoEmailTemplate(
                        caso.lat,
                        caso.lng,
                        caso.genre,
                        caso.age,
                        caso.creationDate
                    )
                    await emailService.sendEmail({
                        to: "",
                        subject: `Nuevo viruluado`,
                        htmlBody: htmlBody
                    });
                    console.log(`Email enviado del caso con ID: ${caso._id}`)
                    await casoDataSource.actualizarCaso(caso._id.toString(), { ...caso, isSent: true })

                    console.log('Caso actualizado')
                }));
        } catch (error) {
            console.error("Error durante el trabajo de envio de correos")
        }
    })
}