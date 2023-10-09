import { SearchOutlined } from "@ant-design/icons";
import { Table, Space, Input } from "antd";
import _ from "lodash";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card } from "reactstrap";
import StarRatings from "src/common/components/Ratings";
import { ProductList } from "src/store/Product/thunk";
// import TextSearchFilter from "./components/TextSearchFilter";

const ProductsList = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const dispatch = useDispatch();

  const getProducts = async () => {
    dispatch(ProductList({}));
  };

  // const { data } = productsData;
  useEffect(() => {
    getProducts();
  }, []);

  const productsData = useSelector((state) => {
    return state?.Products?.products;
  });
  let storeData = productsData;
  console.log("use--products-data", productsData);

  const TextSearchFilter = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    // render: (text) =>
    //   searchedColumn === dataIndex ? (
    //     <Highlighter
    //       highlightStyle={{
    //         backgroundColor: "#ffc069",
    //         padding: 0,
    //       }}
    //       searchWords={[searchText]}
    //       autoEscape
    //       textToHighlight={text ? text.toString() : ""}
    //     />
    //   ) : (
    //     text
    //   ),
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const coloumn = [
    {
      title: "Id",
      dataIndex: "id",
      sorter: (a, b) => a.id - b.id,
      width: "80px",
      align: "center",
      fixed: true,
      render: (text, row) => {
        console.log("text, row", productsData);
        return (
          <div className="">
            <div className="">{row.id}</div>
          </div>
        );
      },
    },
    {
      title: "Title",
      dataIndex: "title",
      sorter: (a, b) => a.title.localeCompare(b.title),
      width: "80px",
      align: "center",
      fixed: true,
      filters: [
        {
          text: "Joe",
          value: "Joe",
        },
        {
          text: "Jim",
          value: "Jim",
        },
        {
          text: "Submenu",
          value: "Submenu",
          children: [
            {
              text: "Green",
              value: "Green",
            },
            {
              text: "Black",
              value: "Black",
            },
          ],
        },
      ],
      render: (text, row) => (
        <div className="">
          <div className="">
            {/* <Link to={row.detailsPageLink}>{row.commodity_form_code}</Link> */}
            {row.title}
          </div>
        </div>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      sorter: (a, b) => a.description.localeCompare(b.description),
      width: "80px",
      align: "center",
      fixed: true,
      render: (text, row) => (
        <div className="">
          <div className="">{row.description}</div>
        </div>
      ),
    },
    {
      title: "Discount Percentage",
      dataIndex: "discountPercentage",
      sorter: (a, b) => a.discountPercentage - b.discountPercentage,
      width: "80px",
      align: "center",
      fixed: true,
      render: (text, row) => (
        <div className="">
          <div className="">{row.discountPercentage}</div>
        </div>
      ),
    },
    {
      title: "Rating",
      dataIndex: "rating",
      sorter: (a, b) => a.rating - b.rating,
      width: "80px",
      align: "center",
      fixed: true,
      render: (text, row) => (
        <div className="">
          <div className="">
            {/* {row.rating} */}
            <StarRatings rating={row.rating} />
          </div>
        </div>
      ),
    },
    {
      title: "Stock",
      dataIndex: "stock",
      sorter: (a, b) => a.stock - b.stock,
      width: "80px",
      align: "center",
      fixed: true,
      render: (text, row) => (
        <div className="">
          <div className="">{row.stock}</div>
        </div>
      ),
    },
    {
      title: "Brand",
      dataIndex: "brand",
      sorter: (a, b) => a.brand.localeCompare(b.brand),
      width: "80px",
      align: "center",
      fixed: true,
      render: (text, row) => (
        <div className="">
          <div className="">{row.brand}</div>
        </div>
      ),
      ...TextSearchFilter("brand"),
    },
    {
      title: "Category",
      dataIndex: "category",
      sorter: (a, b) => a.category.localeCompare(b.category),
      width: "80px",
      align: "center",
      fixed: true,
      render: (text, row) => (
        <div className="">
          <div className="">{row.category}</div>
        </div>
      ),
    },
    {
      title: "Thumbnail",
      dataIndex: "thumbnail",
      width: "80px",
      align: "center",
      fixed: true,
      render: (text, row) => (
        <div className="">
          <div className="">
            <img src={row.thumbnail} height={100} width={100} alt="" />
          </div>
        </div>
      ),
    },
    {
      title: "Action",
      //   dataIndex: "category",
      //   sorter: (a, b) => a.category.localeCompare(b.category),
      width: "80px",
      align: "center",
      fixed: true,
      render: (text, row) => (
        <div className="">
          <div className="">
            <Button
              color="primary"
              onClick={() => console.log("row.id", row.id)}
            >
              Buy
            </Button>
          </div>
        </div>
      ),
    },
  ];
  return (
    <div>
      <Card>
        <Table
          dataSource={storeData}
          columns={coloumn}
          pagination={false}
          //   onChange={handlePageChange}
          scroll={{ y: 550 }}
          className="ant-table"
          size="small"
        />
      </Card>
    </div>
  );
};

export default ProductsList;
