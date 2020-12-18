import readXlsxFile from "read-excel-file/node";
import Inventory from "../models/inventory";
import PharmacyProfile from "../models/pharmacy_profile";

export default class inventoryController {
  static async addInventory(req, res) {
    try {
      // eslint-disable-next-line object-curly-newline
      const { name, quantity, price, nafdac_number } = req.body;

      const productsNameExist = await Inventory.findOne({ name });
      if (productsNameExist) {
        return res.status(400).json({
          message: `Inventory name ${name} already exists`,
        });
      }
      const productsNafdacExist = await Inventory.findOne({ nafdac_number });
      if (productsNafdacExist) {
        return res.status(400).json({
          message: `nafdac number ${productsNafdacExist.nafdac_number} already exists`,
        });
      }
      const pharma = await PharmacyProfile.findOne({ user: req.decoded._id });

      const inventory = await new Inventory({
        user: req.decoded._id,
        pharmacy: pharma._id,
        name,
        quantity,
        price,
        nafdac_number,
      });
      const savedInventory = await inventory.save();
      return res.status(201).json({
        message: "Inventory has been added successfully",
        savedInventory,
      });
    } catch (error) {
      res.status(500).send({
        message: error.message,
      });
    }
  }

  static async uploadInventory(req, res) {
    try {
      // eslint-disable-next-line eqeqeq
      if (req.file == undefined) {
        return res.status(400).send("Please upload an excel file!");
      }

      const path = `uploads/${req.file.filename}`;

      const rows = await readXlsxFile(path, { Inventory });

      // skip header
      rows.shift();

      const inventories = [];

      rows.forEach((row) => {
        const inventory = {
          name: row[0],
          quantity: row[1],
          price: row[2],
          nafdac_number: row[3],
        };
        inventories.push(inventory);
      });

      await Inventory.insertMany(inventories);

      return res.send({
        message: `Uploaded the file successfully: ${req.file.originalname}`,
      });
    } catch (error) {
      res.status(500).send({
        message: `Could not upload the file: ${req.file.originalname}`,
      });
    }
  }

  static async getInventory(req, res) {
    try {
      let { search, page, limit } = req.query;
      page = page < 1 ? 1 : page;
      limit = 5;

      // Multiple search query
      const searchQueries = {
        $or: [
          {
            name: { $regex: new RegExp(search), $options: "i" },
          },
          {
            nafdac_number: { $regex: new RegExp(search), $options: "i" },
          },
        ],
      };

      let querySearch = search ? searchQueries : {};

      const count = await Inventory.countDocuments(querySearch);
      const totalPages = Math.ceil(count / limit);
      page = page > totalPages ? totalPages : page;
      const inventories = await Inventory.find(querySearch, {})
        .populate({
          path: "user",
          select: "username email phone_number",
        })
        .populate({
          path: "pharmacy",
          select: "contact_person pharmacy_address  description",
        })
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .collation({ locale: "en" })
        .sort({ name: 1 })
        .exec();
      if (!inventories) {
        return res.status(404).send("Inventory not found!");
      }
      return res.send({
        message: "Inventory retrieved successfully...",
        inventories,
        totalPages,
        currentPage: page,
        totalInventories: count,
      });
    } catch (error) {
      next(error);
    }
  }
}
