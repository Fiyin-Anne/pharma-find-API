import readXlsxFile from "read-excel-file/node";
import Inventory from "../models/inventory";

export default class inventoryController {
  static async uploadInventory(req, res) {
    try {
      // eslint-disable-next-line eqeqeq
      if (req.file == undefined) {
        return res.status(400).send("Please upload an excel file!");
      }

      const path = `uploads/${req.file.filename}`;

      const rows = await readXlsxFile(path, { Inventory });
      console.log("rows", rows);

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
        console.log("inventory", inventory);
        inventories.push(inventory);
      });

      await Inventory.insertMany(inventories);

      return res.send({
        message: `Uploaded the file successfully: ${req.file.originalname}`,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: `Could not upload the file: ${req.file.originalname}`,
      });
    }
  }

  static async getInventory(req, res) {
    try {
      let { name, page, limit } = req.query;
      page = page < 1 ? 1 : page;
      limit = 5;
      const search = name
        ? { name: { $regex: new RegExp(name), $options: "i" } }
        : {};
      console.log("serch", search);
      const count = await Inventory.countDocuments();
      const totalPages = Math.ceil(count / limit);
      page = page > totalPages ? totalPages : page;
      const inventories = await Inventory.find(search, {})
        .populate({
          path: "user",
          select: "username email phone_number",
        })
        .populate({
          path: "pharmacy",
          select: "company_name  company_address",
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
        message: "Inventory retrieved succesfully...",
        inventories,
        totalPages,
        currentPage: page,
        totalInventories: count,
      });
    } catch (error) {
      console.log("error", error);
      next(error);
    }
  }
}
