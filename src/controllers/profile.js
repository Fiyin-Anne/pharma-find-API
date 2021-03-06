import dotenv from "dotenv";

import axios from "axios";
import qs from "querystring";

import request from "request";
import PharmacyProfile from "../models/pharmacy_profile";
import User from "../models/user";

dotenv.config();

export default class pharmaProfile {
  static async updatePharmaProfile(req, res) {
    try {
      const { _id } = req.decoded;

      const {
        contact_person,
        pharmacy_address,
        license_number,
        description,
      } = req.body;
      const profile = await PharmacyProfile.findOneAndUpdate(
        {
          _id,
        },

        {
          $set: {
            contact_person,
            pharmacy_address,
            license_number,
            description,
          },
        },
        {
          upsert: true,
        }
      );
      console.log("profile", profile);
      const data = {
        contact_person: profile.contact_person,
        pharmacy_address: profile.pharmacy_address,
        license_number: profile.license_number,
        description: profile.description,
      };
      return res.status(200).json({
        success: 200,
        message: "Profile updated successfully",
        data,
      });
    } catch (error) {
      console.log(error);
      if (error) {
        return res.status(404).json({
          message: error.message,
        });
      }
    }
  }

  static async editProfile(req, res) {
    try {
      const { _id } = req.decoded;

      const { email, phone_number } = req.body;
      const profile = await User.findOneAndUpdate(
        {
          _id,
        },

        {
          $set: {
            email,
            phone_number,
          },
        },
        {
          upsert: true,
        }
      );
      delete profile.password;
      const data = {
        role: profile.role,
        _id: profile._id,
        username: profile.username,
        email: profile.email,
        description: profile.description,
      };
      return res.status(200).json({
        success: 200,
        message: "Profile updated successfully",
        data,
      });
    } catch (error) {
      console.log(error);
      if (error) {
        return res.status(404).json({
          message: error.message,
        });
      }
    }
  }

  static async getProfile(req, res) {
    try {
      const profile = await User.find({});

      res.json({
        users: profile.length,
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
