import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { FormControl, MenuItem, Skeleton } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import {
  defaultPaginatedData,
  IPaginatedParams,
} from "../../utilities/type-utils";
import { UtilsHelper } from "../../helper/utils-helper";
import { Row } from "./Row";
import { LoadingSkeleton } from "./LoadingSkeleton";
import { IResultPaginatedData } from "../../utilities/base-response";

export const Paginated = (props: IProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState(defaultPaginatedData.page);
  const [size, setSize] = useState<number>(defaultPaginatedData.size);
  const [totalCount, setTotalCount] = useState(0);
  const [resultValue, setResultValue] =
    useState<IPaginatedParams>(defaultPaginatedData);

  const utilsHelper = new UtilsHelper();

  useEffect(() => {
    if (props.dataPaginated) {
      setTotalCount(
        utilsHelper.paginatedCalc(size, props.dataPaginated.total_data)
      );
      setSize(props.dataPaginated.size);
      setPage(props.dataPaginated.page);
    }
  }, [props.dataPaginated]);

  useEffect(() => {
    if (props.isLoading !== undefined) {
      setIsLoading(props.isLoading);
    }
  }, [props.isLoading]);

  const handleChange = (event: SelectChangeEvent) => {
    setSize(parseInt(event.target.value));
    setPage(0);
  };

  function handlePageClick(e: any) {
    setPage(e.selected);
    if (props.onChange) {
      props.onChange({
        page: e.selected,
        size: size,
        total_data: resultValue.total_data,
      });
    }
  }

  useEffect(() => {
    setResultValue({
      page: page,
      size: size,
      total_data: 0,
    });
  }, [page, size]);

  useEffect(() => {
    if (resultValue.total_data !== 0) {
      if (props.onChange) {
        props.onChange(resultValue);
      }
    }
  }, [resultValue]);

  if (isLoading) {
    return (
      <Row itemsAlign={"center"} justify={"space-between"}>
        <Row itemsAlign={"center"} gap={"md"}>
          <Skeleton height={16} width={65} />
          <Skeleton height={35} width={100} />
        </Row>
        <Row
          justify={"end"}
          className={"w-fit"}
          itemsAlign={"center"}
          gap={"md"}
        >
          <LoadingSkeleton height={32} width={32} isRow length={5} gap={"sm"} />
        </Row>
      </Row>
    );
  } else {
    return (
      <div
        className={"pagination-custom flex items-center w-full justify-between"}
      >
        <div className={"flex items-center gap-2"}>
          <div>Show</div>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <Select
              sx={{ "& legend": { display: "none" }, "& fieldset": { top: 0 } }}
              labelId="demo-select-small"
              className={"select_pagination"}
              id="demo-select-small"
              value={size.toString()}
              label="Age"
              onChange={handleChange}
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={6}>6</MenuItem>
            </Select>
          </FormControl>
        </div>

        <ReactPaginate
          activeClassName="item active "
          breakClassName="item break-me "
          breakLabel="..."
          containerClassName="pagination"
          disabledClassName="disabled-page"
          marginPagesDisplayed={2}
          nextClassName="item next "
          previousLabel={<KeyboardArrowLeft />}
          onPageChange={handlePageClick}
          pageCount={totalCount + 1}
          pageClassName="item pagination-page "
          pageRangeDisplayed={2}
          initialPage={page}
          previousClassName="item previous"
          nextLabel={<KeyboardArrowRight />}
        />
      </div>
    );
  }
};

interface IProps {
  isLoading?: boolean;
  dataPaginated?: IResultPaginatedData;
  onChange?: (data: IPaginatedParams) => void;
}
