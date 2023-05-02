export class ColumnSetting {
  field: string = '';
  title: string = '';
  format?: string;
  type?: 'text' | 'numeric' | 'boolean' | 'date';
}

export class Category {
  icon: string = '';
  value: string = '';
  viewValue: string = '';
}

export class Product {
  id: number = 0;
  img: string = '';
  title: string = '';
  poscode: number = 0;
  barcode: number = 0;
  seller: string = '';
  subgroup: string[] = [];
  origin: string = '';
  brand: string = '';
  price: number = 0;
  checkdate: boolean = false;
  category: string = '';
  status: string = 'active';
}

export class ProductApi {
  Code: number = 0;
  Barcode: string = '';
  ProductName: string = '';
  Alias: string = '';
  ImageThumb: string = '';
  ImageSmall: string = '';
  ImageLarge: string = '';
  FreeShippingImage: string = '';
  TypeData: string = '';
  StatusID: number = 0;
  IsNew: boolean = false;
  IsHachi24h: boolean = false;
  IsBestPrice: boolean = false;
  IsSpecial: boolean = false;
  IsGift: boolean = false;
  IsPromotion: boolean = false;
  PromotionID: number = 0;
  GroupIDList: [];
  IsCombo: boolean = false;
  Price: number = 0;
  PriceBase: number = 0;
  PriceVIP: number = 0;
  Discount: number = 0;
  CategoryID: number = 0;
  OrginalID: number = 0;
  OrginalName: string = '';
  BrandID: number = 0;
  BrandName: string = '';
}

export class ProductList {
  StatusCode: number;
  ErrorString: any;
  ObjectReturn: {
    Data: ProductApi[];
    Total: number;
    AggregateResults: null;
    Errors: null;
  };
}

export class Item {
  text: string;
  value: number;
}
