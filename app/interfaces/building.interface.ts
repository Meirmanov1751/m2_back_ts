import mongoose from "mongoose";

export interface IBuilding extends mongoose.Document{
  name: string,
  address: string,
  passDate: Date,
  incomePercentage: number,
  cityId: any,
  totalArea: number,
  description: string,
}
