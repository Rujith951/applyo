import React from "react";
import ReactPaginate from "react-paginate";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

import "@/styles/components/pagination.scss";

type PaginationProps = {
	onPageChange: (selectedItem: { selected: number }) => void;
	currentPage: number;
	totalPages: number;
};

const Pagination = ({
	onPageChange = () => {},
	currentPage = 1,
	totalPages = 500,
}: PaginationProps) => {
	return (
		<div className="pagination-container">
			<ReactPaginate
				previousLabel={<FaChevronLeft size={20} />}
				nextLabel={<FaChevronRight size={20} />}
				breakLabel={"..."}
				breakClassName={"breakItem"}
				pageCount={totalPages}
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
