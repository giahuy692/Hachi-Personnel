import { Component, Input, OnInit, ViewChild } from '@angular/core';
// import { faCheckCircle, faPenSquare } from '@fortawesome/free-solid-svg-icons';
import { DrawerComponent } from '@progress/kendo-angular-layout';
import { NotificationService } from '@progress/kendo-angular-notification';
import { ServiceAPIService } from 'src/app/services/service-api.service';
import { Item, ProductApi, ProductList } from 'src/app/share/DTO';

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.scss'],
})
export class CouponComponent implements OnInit {
  // //icon
  // faCheckCircle = faCheckCircle;
  // faPenSquare = faPenSquare;
  // Start: Variable Drawer right  \\
  expandedRight: boolean = false;
  @ViewChild('drawerRight') public DrawerRightComponent: DrawerComponent;
  @Input() ReponProduct: any;
  valueSearch: string = '';
  filterData: {
    skip: number;
    take: number;
    filter: {
      logic: string;
      filters: any;
    };
  };
  // End: Variable Drawer right  \\

  // Start: Variable dialog \\
  opened: boolean = false;
  products = new ProductApi();
  statusItem: Array<Item> = [
    { value: 0, text: 'Tạo mới' },
    { value: 1, text: 'Chờ duyệt' },
    { value: 2, text: 'Đã duyệt' },
    { value: 3, text: 'Ngừng hiển thị' },
    { value: 4, text: 'Trả về' },
  ];
  selectedItemStatus: Item = this.statusItem[this.products.StatusID];

  typeData: Array<Item> = [
    { value: 1, text: 'Sản phẩm thường' },
    { value: 2, text: 'Combo' },
    { value: 3, text: 'Quả tặng' },
  ];
  selectedItemTypeData: Item = this.typeData[this.products.TypeData];
  tempStatus: number = 0;
  // End: Variable dialog \\

  // Start: Variable dialog update \\
  openedUpdate: boolean = false;

  constructor(
    private serviceAPI: ServiceAPIService,
    private notificationService: NotificationService
  ) {
    this.loadData();
  }

  ngOnInit(): void {}

  loadData() {
    this.serviceAPI.getDataApi().subscribe(
      (data: ProductList) => {
        this.ReponProduct = data.ObjectReturn.Data;
      },
      (e) => {
        console.error(e);
      }
    );
  }

  loadValue() {
    this.serviceAPI.Product.subscribe((value: ProductApi) => {
      this.products = value;
      this.selectedItemStatus = this.statusItem[this.products.StatusID];
      this.selectedItemTypeData =
        this.typeData[parseInt(this.products.TypeData) - 1];
    });
  }

  reload(v: any) {
    this.serviceAPI.loaddData(v).subscribe(
      (data: ProductList) => {
        this.ReponProduct = data.ObjectReturn.Data;
      },
      (e) => {
        console.error(e);
      }
    );
  }
  // Start: Variable dialog update \\

  //  Start: Grid product \\
  // Handle Add product
  handleAddProduct(status: number) {
    this.serviceAPI.tempStatus.next(status);
    if (status == 0) {
      this.DrawerRightComponent.toggle();
    }
  }

  // Handle Search product
  handleSearch() {
    if (this.valueSearch == undefined || this.valueSearch == null) {
      this.valueSearch = '';
    }
    this.filterData = {
      skip: 0,
      take: 50,
      filter: {
        logic: 'or',
        filters: [
          {
            ignoreCase: true,
            field: 'ProductName',
            operator: 'contains',
            value: this.valueSearch,
          },
          {
            ignoreCase: true,
            field: 'Barcode',
            operator: 'contains',
            value: this.valueSearch,
          },
          {
            ignoreCase: true,
            field: 'Poscode',
            operator: 'contains',
            value: this.valueSearch,
          },
        ],
      },
    };

    this.serviceAPI.SearchShare.next(this.filterData);

    this.serviceAPI.SearchDataApi(this.filterData).subscribe(
      (data: ProductList) => {
        this.ReponProduct = data.ObjectReturn.Data;
      },
      (e) => {
        console.error(e);
      }
    );
  }

  // Handle Edit product
  handleEdit(code: any, status: number) {
    this.serviceAPI.tempStatus.next(status);

    if (status == 1) {
      this.DrawerRightComponent.toggle();
      this.serviceAPI.getProduct(code).subscribe((v) => {
        if (v.ErrorString != null) {
          this.notificationService.show({
            content: v.ErrorString,
            cssClass: 'button-notification',
            hideAfter: 2000,
            animation: { type: 'fade', duration: 400 },
            position: { horizontal: 'left', vertical: 'bottom' },
            type: { style: 'error', icon: true },
          });
        } else {
          this.serviceAPI.Product.next(v.ObjectReturn);
        }
      });
    }
  }
  // End: Grid product \\

  // Start: dialog \\
  // Handle Delete product
  onDelete(value: any) {
    if (value !== -1) {
      this.serviceAPI.DeletedProduct(value).subscribe((v) => {
        if (v.ErrorString != null) {
          this.notificationService.show({
            content: v.ErrorString,
            cssClass: 'button-notification',
            hideAfter: 2000,
            animation: { type: 'fade', duration: 400 },
            position: { horizontal: 'left', vertical: 'bottom' },
            type: { style: 'error', icon: true },
          });
        } else {
          this.notificationService.show({
            content: 'Xóa sản phẩm thành công ' + this.products.ProductName,
            cssClass: 'button-notification',
            hideAfter: 2000,
            animation: { type: 'fade', duration: 400 },
            position: { horizontal: 'left', vertical: 'bottom' },
            type: { style: 'success', icon: true },
          });
        }
      });
    }
    if (this.valueSearch == '') {
      this.loadData();
      this.opened = false;
    } else {
      this.reload(this.filterData);
      this.opened = false;
    }
  }

  // Handle Close dialog
  closeDialog(status: string): void {
    if (status == 'yes') {
      this.onDelete(this.products.Code);
    } else {
      this.opened = false;
    }
  }

  // Handle Open dialog
  openDialog(code: number): void {
    this.opened = true;
    if (code !== -1) {
      this.serviceAPI.getProduct(code).subscribe((v) => {
        this.products.ProductName = v.ObjectReturn.ProductName;
        this.products.Code = v.ObjectReturn.Code;
      });
    }
  }
  // End: dialog \\

  // Start: Dialog Update \\
  closeDialogUpdate(status: string): void {
    if (status == 'yes') {
      this.serviceAPI
        .UpdateProduct(
          this.products.Code,
          this.products.Barcode,
          this.products.Price,
          this.products.PriceBase,
          this.products.PriceVIP
        )
        .subscribe((v) => {
          if (v.ErrorString != null) {
            this.notificationService.show({
              content: v.ErrorString,
              cssClass: 'button-notification',
              hideAfter: 2000,
              animation: { type: 'fade', duration: 400 },
              position: { horizontal: 'left', vertical: 'bottom' },
              type: { style: 'error', icon: true },
            });
          } else {
            this.notificationService.show({
              content:
                'Cập nhật sản phẩm thành công ' + this.products.ProductName,
              cssClass: 'button-notification',
              hideAfter: 2000,
              animation: { type: 'fade', duration: 400 },
              position: { horizontal: 'left', vertical: 'bottom' },
              type: { style: 'success', icon: true },
            });
          }
        });
      this.valueSearch = '';
      this.loadData();
      this.openedUpdate = false;
    } else {
      this.valueSearch = '';
      this.loadData();
      this.openedUpdate = false;
    }
  }

  public openUpdate(code: number): void {
    this.openedUpdate = true;
    if (code !== -1) {
      this.serviceAPI.getProduct(code).subscribe((v) => {
        this.products = v.ObjectReturn;
      });
    }
  }
  // End: Dialog Update \\

  // Start: Drawer right  \\
  onChangeBarcode(value: string): void {
    if (this.products.Barcode == '') {
      this.notificationService.show({
        content: 'Vui lòng nhập Barcode',
        cssClass: 'button-notification',
        hideAfter: 2000,
        animation: { type: 'fade', duration: 400 },
        position: { horizontal: 'left', vertical: 'bottom' },
        type: { style: 'error', icon: true },
      });
    } else {
      this.serviceAPI.GetProduct(value).subscribe((v: any) => {
        if (v.ErrorString != null) {
          this.notificationService.show({
            content: v.ErrorString,
            cssClass: 'button-notification',
            hideAfter: 2000,
            animation: { type: 'fade', duration: 400 },
            position: { horizontal: 'left', vertical: 'bottom' },
            type: { style: 'error', icon: true },
          });
        } else {
          this.products = v.ObjectReturn;
          this.loadValue();
        }
      });
    }
  }

  onExpandChangeRight(e: boolean): void {
    if (e == true && this.tempStatus == 0) {
      this.products = new ProductApi();
    }
  }

  // End: Drawer right  \\

  // Start: dialog \\

  // Handle Close dialog
  closeDialogVeryfi(status: string): void {
    if (status == 'yes') {
      if (this.tempStatus == 1) {
        this.serviceAPI
          .UpdateProduct(
            this.products.Code,
            this.products.Barcode,
            this.products.Price,
            this.products.PriceBase,
            this.products.PriceVIP
          )
          .subscribe((v) => {
            if (v.ErrorString != null) {
              this.notificationService.show({
                content: v.ErrorString,
                cssClass: 'button-notification',
                hideAfter: 2000,
                animation: { type: 'fade', duration: 400 },
                position: { horizontal: 'left', vertical: 'bottom' },
                type: { style: 'error', icon: true },
              });
            } else {
              this.notificationService.show({
                content:
                  'Cập nhật sản phẩm thành công ' + this.products.ProductName,
                cssClass: 'button-notification',
                hideAfter: 2000,
                animation: { type: 'fade', duration: 400 },
                position: { horizontal: 'left', vertical: 'bottom' },
                type: { style: 'success', icon: true },
              });
            }
          });
        this.loadValue();
        this.DrawerRightComponent.toggle();
        this.opened = false;
      } else {
        this.serviceAPI
          .AddProduct(
            this.products.Barcode,
            this.products.Price,
            this.products.PriceBase
          )
          .subscribe((v) => {
            if (v.ErrorString != null) {
              this.notificationService.show({
                content: v.ErrorString,
                cssClass: 'button-notification',
                hideAfter: 2000,
                animation: { type: 'fade', duration: 400 },
                position: { horizontal: 'left', vertical: 'bottom' },
                type: { style: 'error', icon: true },
              });
            } else {
              this.notificationService.show({
                content:
                  'Thêm sản phẩm thành công ' + this.products.ProductName,
                cssClass: 'button-notification',
                hideAfter: 2000,
                animation: { type: 'fade', duration: 400 },
                position: { horizontal: 'left', vertical: 'bottom' },
                type: { style: 'success', icon: true },
              });
            }
          });
        this.serviceAPI.SearchShare.subscribe((v) => {
          this.reload(v);
        });
        this.DrawerRightComponent.toggle();
        this.opened = false;
      }
    } else {
      this.opened = false;
    }
  }

  // Handle Open dialog
  openDialogVeryfi(): void {
    this.opened = true;
  }

  // End: dialog \\

  ngOnDestroy() {
    // this.ReponProduct.unsubscribe();
  }
}
