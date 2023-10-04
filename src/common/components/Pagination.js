import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { nextPrevPage } from "src/store/Pagination/reducers";

const Pagination = (props) => {
  const dispatch = useDispatch();

  //
  const {
    page,
    limit,
    totalPage,
    totalRecords,
    loading: PageLoading,
  } = useSelector((state) => {
    console.log("state--pagination-->", state.Pagination);
    return state.Pagination;
  });
  // const { totalPage = 1, paginationClick, page = 1 } = props

  const paginationClick = (nextPage) => {
    const { selected } = nextPage;
    const finalPage = (Number(selected) || 0) + 1;
    dispatch(nextPrevPage(finalPage));
  };

  return !PageLoading && totalRecords > limit ? (
    <ReactPaginate
      {...props}
      breakLabel="..."
      breakClassName="page-item"
      breakLinkClassName="page-link"
      nextLabel=">"
      pageCount={totalPage}
      pageRangeDisplayed={4}
      marginPagesDisplayed={1}
      previousLabel="<"
      renderOnZeroPageCount={null}
      containerClassName="pagination mtb-4"
      pageLinkClassName="page-link page-link"
      pageClassName="page-item"
      activeClassName="active"
      nextLinkClassName="page-link"
      previousClassName="page-item"
      previousLinkClassName="page-link"
      nextClassName="page-item"
      onPageChange={paginationClick}
      forcePage={page - 1}
    />
  ) : null;
};

export default Pagination;
