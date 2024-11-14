import Joi from 'joi'

const qrPreviewSchemaMenu = Joi.object({
    restaurantName: Joi.string().required(),
    restaurantLogo: Joi.string().optional(),
    backgroundCard: Joi.string().required(),
    colorMenu: Joi.string().required(),
    idFontPreview: Joi.string().optional(),
    idImgTemplate: Joi.string().optional(),
    idUserTemplate: Joi.string().optional(),
    category: Joi.array()
      .items(
        Joi.object({
          categoryName: Joi.string().required(),
          products: Joi.array()
            .items(
              Joi.object({
                backgroundProductCard: Joi.string().required(),
                colorName: Joi.string().required(),
                colorDescription: Joi.string().required(),
                colorPrice: Joi.string().required(),
                productImg: Joi.string().optional(),
                productName: Joi.string().required(),
                productDescription: Joi.string().required(),
                top: Joi.boolean().required(), // Cambié 'Joi.bool()' a 'Joi.boolean()' para mayor claridad
                price: Joi.number().min(1).required()
              })
            )
            .min(1) // Asegura que haya al menos un producto
            .required() // Añadido para requerir la propiedad 'products' en la categoría
        })
      )
      .min(1) // Asegura que haya al menos una categoría
      .required() // Añadido para requerir el campo 'category'
  });
  
  // Ejemplo de uso
  const dataToValidate = {
    restaurantName: "Restaurante Ejemplo",
    restaurantLogo: "logo.png",
    backgroundCard: "background.png",
    colorMenu: "#FFFFFF",
    idFontPreview: "font123",
    idImgTemplate: "template123",
    idUserTemplate: "user123",
    category: [
      {
        categoryName: "Entrantes",
        products: [
          {
            backgroundProductCard: "product-background.png",
            colorName: "#000000",
            colorDescription: "#555555",
            colorPrice: "#FF0000",
            productImg: "product1.png",
            productName: "Ensalada",
            productDescription: "Ensalada fresca con verduras",
            top: true,
            price: 10.99
          }
        ]
      }
    ]
  };
  
  // Validar el objeto
  const { error, value } = qrPreviewSchemaMenu.validate(dataToValidate);
  
  if (error) {
    console.log("Error de validación:", error.details);
  } else {
    console.log("Validación exitosa:", value);
  }