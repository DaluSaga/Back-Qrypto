import bcrypt from "bcryptjs";
import { getDate } from "../src/utils/dateUtils.js";
import prisma from "../src/lib/prisma.js";
import { v2 as cloudinary } from "cloudinary";

/**
 * @Author : Jobserd Julián Ocampo, @date 2024-08-13 09:39:19
 * @description : Script de inicialización de la base de datos. Crea roles, tipos de QR, un usuario administrador con una contraseña encriptada, y un registro de inicio de sesión.
 * @Params : None
 * @return : None
 * @nota : A PARTIR DE ACÁ SE CREAN LOS ARCHIVOS SEED PARA REGISTROS INCIALES
**/
cloudinary.config({
  cloud_name:"da3wunghw",
  api_key:"862334986127346",
  api_secret:"mM9Ot9gPnAOQkVi4DFqo_pjzJRI"
})

async function main() {
  const currentDate = getDate();

  await prisma.rol.createMany({
    data: [
      { name: "ADMIN", state: true, createdAt: currentDate },
      { name: "CLIENT", state: true, createdAt: currentDate },
    ],
  });

  await prisma.membership.createMany({
    data: [
      { type_membership: "Free", description: "", membership_duration: currentDate,price: 0, active_qrs: 2, scan_qrs: 10, premium_support: false, unlimited_static_qrs: false, state: true, createdAt: currentDate },
      { type_membership: "Basic", description: "", membership_duration: currentDate, price: 11.99, active_qrs: 5, scan_qrs: 10000, premium_support: false, unlimited_static_qrs: false, state: true, createdAt: currentDate },
      { type_membership: "Advanced", description: "", membership_duration: currentDate, price: 24.99, active_qrs: 50, scan_qrs: 0, premium_support: false, unlimited_static_qrs: true, state: true, createdAt: currentDate },
      { type_membership: "Professional", description: "", membership_duration: currentDate, price: 49.99, active_qrs: 250, scan_qrs: 0, premium_support: true, unlimited_static_qrs: true, state: true, createdAt: currentDate },
    ],
  });

  const qrTypes = [
    { type: "app-store", description: "Link your app in all stores" },
    {
      type: "social-media",
      description: "Link to all your social media channels",
    },
    { type: "website-url", description: "Link to the website of your choice" },
    { type: "pdf", description: "Show or download your pdf" },
    { type: "news", description: "hello world" },
    { type: "music", description: "Link your song in all music apps" },
    { type: "wifi", description: "Connect to a wireless network" },
    { type: "curriculum", description: "Share your electronic business card" },
    { type: "food-menu", description: "Create a digital restaurant menu" },
  ];

  const fonts=[
    { fontFamily: 'Arial, sans-serif' }, 
    { fontFamily: 'Verdana, sans-serif' }, 
    { fontFamily: 'Courier New, monospace' }, 
    { fontFamily: 'Times New Roman, Times, serif' }, 
    { fontFamily: 'Georgia, serif' }, 
    { fontFamily: 'Lucida Console, Monaco, monospace' },
    { fontFamily: 'Tahoma, Geneva, sans-serif' },
    { fontFamily: 'Impact, Charcoal, sans-serif' },
    { fontFamily: 'Comic Sans MS, Chalkboard SE, sans-serif' },
    { fontFamily: 'Brush Script MT, cursive' }
  ]

  const urlTemplates=[
"https://res.cloudinary.com/da3wunghw/image/upload/v1728928299/iyk9xdsfkxipdcklw6oy.webp",
"https://res.cloudinary.com/da3wunghw/image/upload/v1728928307/kioegdrtcaraltvo6xzg.webp",
"https://res.cloudinary.com/da3wunghw/image/upload/v1728928302/cal5dxmiruj1yec0fsrg.webp",
"https://res.cloudinary.com/da3wunghw/image/upload/v1728928301/ounfwgpds4gabswaowu9.webp",
"https://res.cloudinary.com/da3wunghw/image/upload/v1728928297/ngppnakbx4oswjs8tgrf.webp",
"https://res.cloudinary.com/da3wunghw/image/upload/v1728928307/xaxta7mtml2ll5tyhkox.webp",
"https://res.cloudinary.com/da3wunghw/image/upload/v1728928304/sggztnx0jjq4x5t0c1ci.webp",
"https://res.cloudinary.com/da3wunghw/image/upload/v1728928309/jzhktxno4nmfpxksay0i.webp",
"https://res.cloudinary.com/da3wunghw/image/upload/v1728928298/ph2rhiyjbk1b8p3oglfx.webp",
"https://res.cloudinary.com/da3wunghw/image/upload/v1728928310/fl0xvoeryx95hihp78vt.webp",
"https://res.cloudinary.com/da3wunghw/image/upload/v1728928303/roox65uuko2tkaex1gbk.webp",
"https://res.cloudinary.com/da3wunghw/image/upload/v1728928305/voot2eqqsmfqnmygkzlx.webp",
"https://res.cloudinary.com/da3wunghw/image/upload/v1728928311/qbiduflny9xmznp0owmy.webp"]

  // const templates=[
  //   {url:"https://i.pinimg.com/236x/e9/75/4c/e9754cc39b0cf1fb7fa2a769874d69c5.jpg"},
  //   {url:"https://i.pinimg.com/originals/c1/e8/d8/c1e8d8b34ad020dfb1a0504bb507cd54.jpg"},
  //   {url:"https://i.pinimg.com/736x/9c/3d/48/9c3d48926c7e94966def78c6e702f919.jpg"},
  //   {url:"https://i.pinimg.com/originals/cb/16/93/cb16933b7b2111a663cdcecb541bf517.jpg"},
  //   {url:"https://i.pinimg.com/736x/b2/f1/14/b2f11499fd21b6ce13869b13850ae8ae.jpg"},
  //   {url:"https://i.pinimg.com/474x/74/43/27/744327b2f1016a2cdb2720226cdb5b9a.jpg"},
  //   {url:"https://i.pinimg.com/236x/c3/63/86/c363869d1539460176e3473a9bcbeae4.jpg"},
  //   {url:"https://i.pinimg.com/originals/59/9a/f3/599af3822110b467fd2a3fbea70e4e52.jpg"},
  //   {url:"https://i.pinimg.com/474x/3e/d4/b4/3ed4b40c8213023f3f142b1b2717678c.jpg"},
  //   {url:"https://i.pinimg.com/originals/3c/65/0a/3c650a149986773eb80c4a91a4139c48.jpg"},
  //   {url:"https://i.pinimg.com/736x/44/fa/db/44fadb844736466af3e3744fa1ec7b86.jpg"},
  //   {url:"https://i.pinimg.com/originals/98/a0/a2/98a0a236f291eceaf630e2392f2d0eaf.jpg"},
  //   {url:"https://png.pngtree.com/background/20210710/original/pngtree-gourmet-snack-afternoon-tea-poster-background-template-picture-image_1047140.jpg"}
  // ]

  // //funcion para subir las imagenes de los templates de la app al servidor
  // const changeLinkTemplates = async () => {
  //   try {
  //     for (const item of templates) {
  //       const response = await cloudinary.uploader.upload(item.url,{format:'webp'});
  //       const urlTemplate = response.secure_url;
  //       urlTemplates.push({url:urlTemplate});
  //     }
  //   } catch (error) {
  //     console.error("Error uploading template:", error);
  //   }
  // };
  
//  await changeLinkTemplates();
  

  await prisma.qrType.createMany({
    data: qrTypes.map((qrType) => ({
      type: qrType.type,
      description: qrType.description,
    })),
  });

  await prisma.fontsPreview.createMany({
    data: fonts.map((item)=>({
      fontName: item.fontFamily
    }))
  })

  await prisma.imgTemplates.createMany({
    data: urlTemplates.map((item) => ({
      image: item,
    })),
  });
  

  const hashedPassword = await bcrypt.hash("admin123", 10);

  const adminUser = await prisma.user.create({
    data: {
      username: "admin",
      email: "admin@gmail.com",
      password: hashedPassword,
      createdAt: currentDate,
      state: true,
      rol: {
        connect: { id: 1 },
      },
    },
  });

  await prisma.loginLogs.create({
    data: {
      created_ip: "127.0.0.1",
      user: {
        connect: { id: adminUser.id },
      },
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
