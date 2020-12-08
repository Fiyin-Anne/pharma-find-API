import dotenv from "dotenv";

import axios from "axios";
import qs from "querystring";

import request from "request";
import PharmacyProfile from "../models/pharmacy_profile";

dotenv.config();

export default class pharmaProfile {
  static async editProfile(req, res, next) {
    try {
      const {
        company_name,
        company_email,
        company_address,
        company_phone_number,
        user,
      } = req.body;

      const companyName = await PharmacyProfile.findOne({ company_name });
      if (companyName) {
        return res.status(409).json({
          status: 409,
          error:
            "oopss! Company name is already associated with another account.",
        });
      }
      const companyEmail = await PharmacyProfile.findOne({ company_email });
      if (companyEmail) {
        return res.status(409).json({
          status: 409,
          error:
            "oopss! Company email is already associated with another account.",
        });
      }
      const companyNumber = await PharmacyProfile.findOne({
        company_phone_number,
      });
      if (companyNumber) {
        return res.status(409).json({
          status: 409,
          error:
            "oopss! Company phone number is already associated with another account.",
        });
      }
      const companyAddress = await PharmacyProfile.findOne({ company_address });
      if (companyAddress) {
        return res.status(409).json({
          status: 409,
          error:
            "oopss! Company address is already associated with another account.",
        });
      }
      await PharmacyProfile.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        {
          $set: {
            company_name,
            company_email,
            image: req.file.path,
            company_address,
            company_phone_number,
            user,
          },
        },
        {
          upsert: true,
        }
      );

      return res.status(200).json({
        success: 200,
        message: "Profile updated successfully",
      });
    } catch (error) {
      if (error.response) {
        return res.status(404).json({
          message: error.message,
        });
      }
      next(error);
    }
  }

  static async getProfile(req, res) {
    try {
      const profile = await PharmacyProfile.find({})
        .populate({
          path: "user",
          select: "username email phone_number",
        })
        .exec();
      res.json({
        success: true,
        profile,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}
