import multer from 'multer'
import path from 'path'
// import { CloudinaryStorage } from 'multer-storage-cloudinary'
// import { cloudinaryUpload } from './cloudinary.config'

// const removeExtension = (filename: string) => {
//   return filename.split('.').slice(0, -1).join('.')
// }

// const storage = new CloudinaryStorage({
//   cloudinary: cloudinaryUpload,
//   params: {
//     public_id: (_req, file) =>
//       Math.random().toString(36).substring(2) +
//       '-' +
//       Date.now() +
//       '-' +
//       file.fieldname +
//       '-' +
//       removeExtension(file.originalname),
//   },
// })

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), 'src/uploads'))
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname)
  },
})

export const multerUpload = multer({ storage })
