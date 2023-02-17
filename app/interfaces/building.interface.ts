enum BUILDING_TYPES {
  INVESTMENT='investment',
};
export interface IBuilding {
  name: string,
  address: string,
  passDate: string,
  incomePercentage: number,
  cityId: any,
  type: BUILDING_TYPES,
  totalArea: number,
  description: string,
}
