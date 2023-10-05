import { Table } from "antd";
import _ from "lodash";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Button, Card } from "reactstrap";
import { ProductList } from "src/store/Product/thunk";

const ProductsList = () => {
  const dispatch = useDispatch();
  //   const onFilterChange = (e, dataIndex, confirm) => {
  //     confirm();
  //     let params = {
  //       ...filters,
  //     };
  //     switch (dataIndex) {
  //       case "id":
  //         params = {
  //           ...params,
  //           commodity_form_id: e,
  //         };
  //         break;
  //       default:
  //         params = {
  //           ...params,
  //           [dataIndex]: e,
  //         };
  //         break;
  //     }
  //     setFilters(params);
  //     history.push(FilterUtils.createUrl(params));
  //   };
  //   const handleReset = (clearFilters, dataIndex) => {
  //     clearFilters();
  //     let params = {
  //       ...filters,
  //     };
  //     switch (dataIndex) {
  //       case "id":
  //         delete params["commodity_form_id"];
  //         setFilters(params);
  //         // history.push(FilterUtils.removeUrl("commodity_form_id"));
  //         break;
  //       default:
  //         delete params[dataIndex];
  //         setFilters(params);
  //         history.push(FilterUtils.removeUrl(dataIndex));
  //         break;
  //     }
  //   };

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
          <div className="">{row.rating}</div>
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
      title: "Add to Cart",
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
              Add to Cart
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
