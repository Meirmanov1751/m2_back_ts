import mongoose from "mongoose";

enum BUILDING_TYPES {
  INVESTMENT='investment',
}

export interface IBuilding {
  name: string,
  address: string,
  passDate: Date,
  incomePercentage: number,
  cityId: any,
  type: BUILDING_TYPES,
  totalArea: number,
  description: string
}