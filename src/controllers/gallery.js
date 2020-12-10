import Gallery from "../models/gallery";

export default class galleryController {
  static async uploadImage(req, res) {
    try {
      let upload = new Gallery();
      upload.image = req.file.path;

      await upload.save();
      res.json({
        upload,
        status: true,
        message: "Successfully uploaded an image",
      });
    } catch (error) {
      console.log("error", error);
    }
  }

  static async getSingleImage(req, res) {
    try {
      const { id } = req.params;
      const images = await Gallery.findOne({ _id: id }).populate("user").exec();

      res.status(200).json({
        success: true,
        images,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  static async getImages(req, res) {
    try {
      const images = await Gallery.find({}).populate("user").exec();

      res.status(200).json({
        success: true,
        images,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}
