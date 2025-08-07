import React from "react";
import ReactPaginate from "react-paginate";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

import "@/styles/components/pagination.scss";

const Pagination = ({
	onPageChange = () => {},
	currentPage = 1,
	pageLimit = 20,
}) => {
	return (
		<div className="pagination-container">
			<ReactPaginate
				previousLabel={<FaChevronLeft size={20} />}
				nextLabel={<FaChevronRight size={20} />}
				breakLabel={"..."}
				breakClassName={"breakItem"}
				pageCount={100}
				forcePage={currentPage - 1}
				marginPagesDisplayed={2}
				pageRangeDisplayed={5}
				onPageChange={onPageChange}
				containerClassName={"pagination"}
				pageClassName={"page-item"}
				pageLinkClassName={"page-link"}
				activeClassName={"active"}
			/>
			<div className="paginationShimmer"></div>
		</div>
	);
};

export default Pagination;
