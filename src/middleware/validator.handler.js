import boom from '@hapi/boom';

/**
 * @Author : Jobserd Julián Ocampo, @date 2024-08-13 09:28:31
 * @description : Middleware para validar datos de la solicitud según un esquema Joi. Si falla, lanza un error personalizado con los campos requeridos.
 * @Params : schema (Joi schema), property (req property to validate)
 * @return : Middleware function
**/

const validatorHandler = (schema, property) => {
    return function (req, res, next) {
        const data = req[property];
        const { error } = schema.validate(data, { abortEarly: false });

        if (error != null) {
            const fields = error.details.map(detail => detail.context.label);
            const errorMessage = error.message;
            const customError = boom.badRequest(errorMessage);

            // Manejo de errores específicos para qrPreview
            const qrPreviewErrors = error.details
                .filter(detail => detail.path.includes('qrPreview'))
                .map((err, index) => ({
                    field: `qrPreview`,  // Campo relacionado
                    message: `Error en qrPreview: ${err.message}`, // Mensaje específico
                    index: index + 1     // Índice para la referencia (opcional)
                }));

            if (qrPreviewErrors.length > 0) {
                customError.output.payload.qrPreviewErrors = qrPreviewErrors; // Añadir errores específicos de qrPreview
            }

            customError.output.payload.requiredFields = fields;

            return next(customError);
        }
        
        // Si no hay errores, continuar con el siguiente middleware
        next();
    };
};

export { validatorHandler };
