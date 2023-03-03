import { useState } from 'react';
import React from 'react';
import './App.css';
import { Table, Button, Checkbox, SelectPicker, Input, Modal, List, Form,  InputNumber, AutoComplete, InputGroup } from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';


const STATUSES = [
  { label: "Tất cả", value: 2 },
  { label: "Đang kinh doanh", value: 1 },
  { label: "Ngừng kinh doanh", value: 0 },
];
const DATA = [
  {
    BrandCode: "SAMSUNG",
    CateProCode: "DIENTHOAI",
    ProductCode: "GALAXYS22ULTRA",
    ProductName: "Galaxy S22 Ultra 5G 128GB",
    Price: 27000000,
    UPDc: 2000000,
    UPRateDc: 0,
    FlagPrice: 1,
    FlagActive: 0,
  },
  {
    BrandCode: "SAMSUNG",
    CateProCode: "DIENTHOAI",
    ProductCode: "GALAXYZFLIP3",
    ProductName: "Galaxy Z Flip3 5G 256GB",
    Price: 17000000,
    UPDc: 1700000,
    UPRateDc: 10,
    FlagPrice: 0,
    FlagActive: 1,
  },
  {
    BrandCode: "IPHONE",
    CateProCode: "DIENTHOAI",
    ProductCode: "IPHONE13PROMAX",
    ProductName: "iPhone 13 Pro Max 128GB",
    Price: 29000000,
    UPDc: 2900000,
    UPRateDc: 10,
    FlagPrice: 0,
    FlagActive: 1,
  },
  {
    BrandCode: "IPHONE",
    CateProCode: "DIENTHOAI",
    ProductCode: "IPHONE13MINI",
    ProductName: "iPhone 13 Mini 526GB",
    Price: 24000000,
    UPDc: 3000000,
    UPRateDc: 0,
    FlagPrice: 1,
    FlagActive: 0,
  },
  {
    BrandCode: "OPPO",
    CateProCode: "DIENTHOAI",
    ProductCode: "OPPORENO7",
    ProductName: "Oppo Reno7",
    Price: 9990000,
    UPDc: 1500000,
    UPRateDc: 0,
    FlagPrice: 1,
    FlagActive: 1,
  },
  {
    BrandCode: "XIAOMI",
    CateProCode: "DIENTHOAI",
    ProductCode: "XIAOMIREDMINOTE11",
    ProductName: "Xiaomi Redmi Note 11",
    Price: 4490000,
    UPDc: 449000,
    UPRateDc: 10,
    FlagPrice: 0,
    FlagActive: 1,
  },
];

function App() {
  const styles = {
    width: 300,
    marginBottom: 10,
  };
  const { Column, HeaderCell, Cell } = Table;
  const [data, setData] = useState<Object[]>(DATA)
  const [search, setSearch] = useState("")
  const [min, setMin] = useState("")
  const [max, setMax] = useState("")
  const [trangthai, setTrangthai] = useState<any>()
  const [open, setOpen] = React.useState(false);
  const [size, setSize] = React.useState();
  const [boolean, setBoolean] = useState(false)
  const [masp, setMasp] = useState("");
  const [tensp, setTensp] = useState("");
  const [gia, setGia] = useState<number>(0);
  const [edittingRow, setEdittingRow] = useState("");
  const [product, setProduct] = useState<string>("");
  const [thuonghieu, setThuonghieu] = useState<string>("");
  const [updc, setUpdc] = useState<any>();
  const [upratedc, setUpratedc] = useState<any>();
  const [price, setPrice] = useState(0);
  const [opendeleter, setOpendeleter] = useState(false);
  const [xoa, setXoa] = useState <any>()
  const handlChange = (e: any) => {
    console.log(e)

    setData(DATA)
    setTrangthai(e)
  }
  const handleListDeltel = (item:any) => {
    setThuonghieu(item.BrandCode);
    setProduct(item.CateProCode);
    setMasp(item.ProductCode);
    setTensp(item.ProductName);
    setGia(item.Price);
    setTrangthai(item.FlagActive);
    setEdittingRow(item.ProductCode);
    setBoolean(true)
    setUpdc(item.UPDc)
    setUpratedc(item.UPRateDc)
    setOpendeleter(true)
    setXoa(item)
  }
  const handleDeltel= ()=>{

    let index = data.filter((item: any) => item.ProductCode !== xoa.ProductCode);
    setData(index) 
    setOpendeleter(false)
  }
  const handelMin = (e: any) => {
    setMin(e)
    setData(DATA)
  }
  const handelMax = (e: any) => {
    setMax(e)
    setData(DATA)
  }
  const handleMasplist = (e: any) => {
    setSearch(e)
    setData(DATA)
  };
  const handLSearch = () => {

    let price: object[] = data.filter((item: any) =>
      item.Price >= min && item.Price <= max
    )
    let name: object[] = data.filter((item: any) => item.ProductName === search
    )
    let active = data.filter((item: any) => item.FlagActive === trangthai)


    if (price.length === 0 && name.length === 0 && active.length === 0) {
      setData(DATA)
    } else if (price.length === 0 || name.length === 0 || active.length > 0) {
      setData([...price, ...name, ...active])
    } else {
      setData(data.filter((item: any) =>
        item.ProductName === search && item.Price >= min && item.Price <= max && item.FlagActive === trangthai
      ))
    }

  }
  const handleMasp = (e: any) => {
    setMasp(e)
  }
  const handleTensp = (e: any) => {
    setTensp(e)
  }
  const handleGia = (e: any) => {
    setGia(e)
  }
  const handleThuongHieu = (e: any) => {
    setThuonghieu(e)
  }
  const handleProduct = (e: any) => {
    setProduct(e)
  }
  const handerTrangThai = (e: any) => {
    setTrangthai(e)
  }
  const handelAdd = () => {
    setOpen(false)
    let addData: {
      BrandCode: string;
      CateProCode: string;
      ProductCode: string;
      ProductName: string;
      Price: any;
      FlagActive: number;
      UPDc: number;
      UPRateDc: number,
      FlagPrice: number
    } = {
      BrandCode: thuonghieu,
      CateProCode: product,
      ProductCode: masp,
      ProductName: tensp,
      Price: gia,
      FlagActive: trangthai,
      UPDc: updc,
      UPRateDc: upratedc,
      FlagPrice: price,
    };
    var checkData: object[] = data.filter((item: any) => {
      return item.ProductCode === addData.ProductCode;

    });
    if ((addData.ProductCode).length === 0) {
      window.alert("bạn chưa thêm mã sản phẩm")
    } else if (checkData.length === 0) {
      setData([...data, addData])
    }
    else {
      window.alert("trùng mã sản phẩm")
    }
    setThuonghieu("")
    setProduct("")
    setMasp("")
    setGia(Number);
    setTensp("")
    setTrangthai("")

  }
  const handelEdit = () => {
    setOpen(false);
    let index = data.findIndex((item: any) => item.ProductCode === edittingRow);
    console.log(index)
    let Datas = [...data];
    Datas[index] = {
      BrandCode: thuonghieu,
      CateProCode: product,
      ProductCode: masp,
      ProductName: tensp,
      Price: gia,
      FlagActive: trangthai,
      UPDc: updc,
      UPRateDc: upratedc,
      FlagPrice: price
    };

    setData(Datas);
    setUpdc("")
    setUpratedc("")
    setThuonghieu("");
    setProduct("");
    setMasp("");
    setTensp("");
    setTrangthai("");
    setGia(Number);
    setEdittingRow("")
    setBoolean(false)
  }
  const onchangePrice = (value: any, checked: boolean) => {
    let a = checked
    console.log(a)
    if (a === true) {
      setPrice(1);
    } else {
      setPrice(0);
    }
  }
  const onchangeUpdc = (e: any) => {
    setUpdc(e);
    setUpratedc(0);
  }
  const onchangeUpdca = (e: any) => {

    let math = e;
    let maths = (math / 100) * gia;
    console.log(maths);
    if (maths > 650000) {
      setUpdc(650000);
    } else {
      setUpdc(maths);
    }
    setUpratedc(math);
  }


  const handleEditingrow = (item: any) => {
    setOpen(true);
    setThuonghieu(item.BrandCode);
    setProduct(item.CateProCode);
    setMasp(item.ProductCode);
    setTensp(item.ProductName);
    setGia(item.Price);
    setTrangthai(item.FlagActive);
    setEdittingRow(item.ProductCode);
    setBoolean(true)
    setUpdc(item.UPDc)
    setUpratedc(item.UPRateDc)

  }
  const handleClose = () => {
    setOpendeleter(false)
    setOpen(false);
  }

  const handleOpen = (value: any) => {
    setSize(value);
    setOpen(true);
  };


  return (
    <div className="App">
      <div>
        <span>Lọc theo trạng thái sản phẩm</span>
        <SelectPicker onChange={handlChange} data={STATUSES} style={{ width: 224 }} />
        <Button appearance="primary" type="submit" style={{ marginLeft: "40px" }} onClick={() => { handLSearch() }} >
          <SearchIcon />
          Tìm kiếm
        </Button>
        <Button size="md" onClick={() => handleOpen('md')} style={{ marginLeft: "40px", background: "#009900", color: "white" }}>
          Thêm
        </Button>
      </div>
      <>
        <Modal size={size} open={open} onClose={handleClose}>
          <Modal.Header>
            <Modal.Title   >{edittingRow ? "xóa" : "sửa"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form id='flex'>
              <Form.Group >
                <Form.ControlLabel>Mã sản phẩm</Form.ControlLabel>
                <Form.Control disabled={boolean} value={masp} onChange={(e) => handleMasp(e)} name="ProductCode" />
                <Form.HelpText>Mã sản phẩm là bắt buộc phải nhập</Form.HelpText>
              </Form.Group>
              <Form.Group >
                <Form.ControlLabel>Tên sản phẩm</Form.ControlLabel>
                <Form.Control value={tensp} onChange={(e) => { handleTensp(e) }} name="ProductName" />
                <Form.HelpText>Tên sản phẩm bắt buộc phải nhập</Form.HelpText>
              </Form.Group>
              <Form.Group >
                <Form.ControlLabel>giá sản phẩm</Form.ControlLabel>
                <Form.Control value={gia} onChange={(e) => { handleGia(e) }} name="Price" />
                <Form.HelpText>giá sản phẩm là bắt buộc</Form.HelpText>
              </Form.Group>
              <Form.Group >
                <Form.ControlLabel>Thương Hiệu</Form.ControlLabel>
                <Form.Control value={thuonghieu} onChange={(e) => { handleThuongHieu(e) }} name="BrandCode" />
                <Form.HelpText>Tên thương hiệu là bắt buộc</Form.HelpText>
              </Form.Group>
              <Form.Group >
                <Form.ControlLabel>Nhóm sản phẩm</Form.ControlLabel>
                <Form.Control value={product} onChange={(e) => { handleProduct(e) }} name="CateProCode" />
                <Form.HelpText>nhóm sản phẩm là bắt buộc nhập</Form.HelpText>
              </Form.Group>
              <Form.Group >
                <Form.ControlLabel>Trạng thái</Form.ControlLabel>
                <div style={{ width: 60 }}>
                  <InputNumber width={10} onChange={(e) => { handerTrangThai(e) }} value={trangthai} defaultValue={trangthai} max={1} min={0} />
                </div>
              </Form.Group>
            </Form>
            <Form>
              <Checkbox onChange={(value, checked) => onchangePrice(value, checked)} />
              {price ? (

                <Form.Group >
                  <Form.ControlLabel>giá khuyến mại</Form.ControlLabel>
                  <Form.Control value={updc} onChange={onchangeUpdc} name="UPDc" />
                  <Form.HelpText>nhóm sản phẩm là bắt buộc nhập</Form.HelpText>
                </Form.Group>

              ) : (

                <Form.Group >
                  <Form.ControlLabel>Phần trăm khuyến mại</Form.ControlLabel>
                  <Form.Control value={upratedc} onChange={onchangeUpdca} name="UPRateDc" />
                  <Form.HelpText>nhóm sản phẩm là bắt buộc nhập</Form.HelpText>
                </Form.Group>
              )}

            </Form>
          </Modal.Body>
          <Modal.Footer>
            {edittingRow ? (
              <Button onClick={() => handelEdit()} style={{ background: "#FF9900", color: "white" }}>
                Ok
              </Button>
            ) : (
              <Button onClick={() => handelAdd()} style={{ background: "#00FF66", color: "white" }} >
                Ok
              </Button>
            )}

            <Button onClick={handleClose} appearance="subtle">
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal size={size} open={opendeleter} onClose={handleClose}>
          <Modal.Header>
            <Modal.Title>xóa</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <List>
              <List.Item>mã sản phẩm:<br></br> {masp}</List.Item>
              <List.Item>Tên sản phẩm: <br></br>{tensp}</List.Item>
              <List.Item>giá sản phẩm:<br></br>{gia}</List.Item>
              <List.Item>%khuyến mại:<br></br> {upratedc}</List.Item>
              <List.Item>giá khuyến mại:<br></br> {updc}</List.Item>
              <List.Item>khuyến mại theo giá:<br></br> {price}</List.Item>
              <List.Item>thương hiệu:<br></br> {thuonghieu}</List.Item>
              <List.Item>nhóm sản phẩm :<br></br>{product}</List.Item>
              <List.Item>trạng thái:<br></br> {trangthai}</List.Item>
            </List>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleDeltel} style={{background:"red", color:"white"}}>
              OK
            </Button>
            <Button onClick={handleClose} >
              Thoát
            </Button>
          </Modal.Footer>
        </Modal>

      </>
      <div style={{ display: 'flex' }}>
        <div style={{ paddingTop: 8 }}>Tìm theo tên sản phẩm</div>
        <InputGroup style={styles}>
          <AutoComplete onChange={(e) => handleMasplist(e)} data={data.map((item: any) => {
            return {
              label: item.ProductName,
              value: item.ProductName
            }
          })
          } value={search} />
          <InputGroup.Button tabIndex={-1} >
            <SearchIcon />
          </InputGroup.Button>
        </InputGroup>

      </div>
      <div style={{ display: 'flex' }}>
        <span style={{ paddingTop: 8 }}>giá sản phẩm</span>
        <InputGroup style={styles}>
          <Input onChange={(e) => handelMin(e)} />
          <InputGroup.Addon >to</InputGroup.Addon>
          <Input onChange={(e) => handelMax(e)} />
          <InputGroup.Button    >
            <SearchIcon />
          </InputGroup.Button>
        </InputGroup>

      </div>

      <Table
        height={400}
        data={data.map((item: any, index: any) => {
          return {
            ...item,
            Id: ++index
          }
        })}
      >
        <Column width={40} align="center" fixed>
          <HeaderCell>Id</HeaderCell>
          <Cell dataKey="Id" />
        </Column>
        <Column width={150}>
          <HeaderCell>Mã sản phẩm</HeaderCell>
          <Cell dataKey="ProductCode" />
        </Column>
        <Column width={150}>
          <HeaderCell>Tên sản phẩm</HeaderCell>
          <Cell dataKey="ProductName" />
        </Column>

        <Column width={100}>
          <HeaderCell>giá sản phẩm</HeaderCell>
          <Cell dataKey="Price" />
        </Column>

        <Column width={100}>
          <HeaderCell>% Khuyến mại</HeaderCell>
          <Cell dataKey="UPRateDc" />
        </Column>

        <Column width={120}>
          <HeaderCell>giá khuyến mại</HeaderCell>
          <Cell dataKey="UPDc" />
        </Column>
        <Column width={140}>
          <HeaderCell>Khuyến mại theo giá</HeaderCell>
          <Cell dataKey="FlagPrice" />
        </Column>
        <Column width={100}>
          <HeaderCell>Thương hiệu</HeaderCell>
          <Cell dataKey="BrandCode" />
        </Column>
        <Column width={100}>
          <HeaderCell>Nhóm sản phẩm</HeaderCell>
          <Cell dataKey="CateProCode" />
        </Column>
        <Column width={100}>
          <HeaderCell>Trạng thái</HeaderCell>
          <Cell dataKey="FlagActive" />
        </Column>
        <Column width={50} fixed="right">
          <HeaderCell> </HeaderCell>
          <Cell style={{ padding: '6px' }}>
            {rowData => (
              <Button onClick={() => { handleEditingrow(rowData) }} style={{ background: 'yellow', color: 'white' }} >
                Sửa
              </Button>
            )}

          </Cell>
        </Column>
        <Column width={50} >
          <HeaderCell> </HeaderCell>
          <Cell style={{ padding: '6px' }}>
            {rowData => (
              <Button style={{ background: 'red', color: 'white' }} onClick={() => handleListDeltel(rowData)}>
                xóa
              </Button>
            )}

          </Cell>
        </Column>
      </Table>
    </div>
  );
}

export default App;
