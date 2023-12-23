import { Field, Form, Formik, useFormikContext } from "formik";
import { useSelector } from "react-redux";
import TextField from "src/common/components/TextField";
import { PostList } from "src/store/actions";

const { useEffect } = require("react");
const { Link } = require("react-router-dom");
const { Row, Col, Card, Table } = require("reactstrap");
const { default: Pagination } = require("src/common/components/Pagination");

const Post = () => {
  // const dispatch = useDispatch();
  const { page, limit } = useSelector((state) => state.Pagination);
  const list = useSelector((state) => state.Contact.posts);
  return (
    <Row>
      {/* <Col lg={3} className="mb-3 text-end"> */}

      {/* </Col> */}
      <Col>
        <div className="d-flex justify-content-between m-4">
          <Formik
            initialValues={{
              search: "",
            }}
          >
            <Form className="needs-validation">
              <SearchComponent />
              <Row className="flex-column">
                <Col md="12" lg="12" sm="12">
                  <Field
                    name="search"
                    placeholder="Search By Title or Body"
                    type="text"
                    id="search"
                    isSearch
                    component={TextField}
                  />
                </Col>
              </Row>
            </Form>
          </Formik>
          <div className="d-flex justify-content-between m-4">
            <Link
              color="primary"
              className="btn btn-primary w-lg waves-effect waves-light"
              to={"/create-contact"}
              state={{}}
            >
              Create
            </Link>
          </div>
        </div>
        <Card className="m-3">
          <Row>
            <Col>
              <div className="table-responsive m-4">
                <Table className="table mb-0 cust-tab table-centered tab-img">
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>User Id</th>
                      <th>Id</th>
                      <th>Title</th>
                      <th>Body</th>
                      {/* <th className="text-center">Action</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {list &&
                      list.map((row, index) => (
                        <tr id={index} key={index} className="d-table-row">
                          {/* <td>{index + 1}</td> */}
                          <td>{(page - 1) * limit + (index + 1)}</td>
                          <td>{row.userId}</td>
                          <td>{row.id}</td>
                          <td>{row.title}</td>
                          <td>{row.body}</td>
                          {/* <td>
                            {row.imgPath ? (
                              <img
                                src={`${row.imgPath}`}
                                className="list-input-img"
                              />
                            ) : (
                              <p className="h7">Image Not Available</p>
                            )}
                          </td> */}
                        </tr>
                      ))}
                  </tbody>
                </Table>
              </div>
              <Col lg={12}>
                <Pagination />
              </Col>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};

export default Post;

export const SearchComponent = () => {
  const dispatch = useDispatch();
  const { values } = useFormikContext();
  const { page, limit } = useSelector((state) => state.Pagination);
  useEffect(() => {
    const params = {
      limit: limit,
      //   page: page,
      //   _sort: "product_name",
      //   _order: "ASC",
      //   title: values?.search || "",
      //   body: values?.search || "",
    };
    dispatch(PostList(params));
  }, [limit, page, values?.search]);
  return null;
};
