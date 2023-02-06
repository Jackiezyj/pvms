export interface Cars{
  "sum":number,
  "todayInSum": number,
  "todayOutSum": number,
  "focusOut_VehicleSum": number,
  "recordsSum": number,
  "cars": [
    {
      "id":number,
      "plateNO": string,
      "vehicleType": string,
      "in_outType": string,
      "timeOfEntry": string,
      "departureTime": string,
      "currentState": string,
      "name": string,
      "mobileNO": string,
      "records": number,
      "focus": boolean
    }],
    "carsReturnSum":number,
    "pagesSum":string[],
    "selectPage":number,
    "currentPage":string
  }

