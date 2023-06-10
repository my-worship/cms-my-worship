import React, { Fragment, useState } from "react";
import { IconButton, Skeleton } from "@mui/material";
import { FilterList } from "@mui/icons-material";

const Body = ({
  data,
  col,
  isLoading,
  onClick,
  disableOnClickIndex,
}: IPropsBody) => {
  const LoadingComp = () => (
    <>
      {Array.from({ length: 5 }).map((_, i) => (
        <tr key={i} className="bg-white   h-full table_row border-base ">
          {col.map((c, i) => (
            <td key={i} className={`${c.paddingNone ? "p-0" : "py-4 px-6"}`}>
              {col.map((e, i) => {
                if (e.key === c.key) {
                  return (
                    <Fragment key={i}>
                      {e.loadingComponents ?? <Skeleton variant={"text"} />}
                    </Fragment>
                  );
                }
              })}
            </td>
          ))}
        </tr>
      ))}
    </>
  );
  return (
    <>
      <tbody className="h-full">
        {isLoading ? (
          LoadingComp()
        ) : (
          <>
            {data ? (
              data.length > 0 ? (
                data.map((item, i) => (
                  <tr
                    key={i}
                    className={`bg-white   h-full table_row border-b duration-500`}
                  >
                    {col.map((c, i) => (
                      <td
                        key={i}
                        className={`${c.paddingNone ? "p-0" : "py-4 px-6"} ${
                          c.className ?? ""
                        }`}
                        onClick={() =>
                          onClick && i !== disableOnClickIndex
                            ? onClick(item)
                            : null
                        }
                      >
                        {col.map((e, i) => {
                          if (e.key === c.key) {
                            return (
                              <Fragment key={i}>
                                {item[e.value ?? ""]}
                                {e.layouts && e.layouts(item)}
                              </Fragment>
                            );
                          }
                        })}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <></>
              )
            ) : (
              <></>
            )}
          </>
        )}
      </tbody>
    </>
  );
};
export const MainTable = (props: ITableProps) => {
  const [order, setOder] = useState<boolean | undefined>(true);
  const [key, setKey] = useState<string>("");
  const handleCekSort = (title: string) => {
    let newOrder = order;
    if (title === key) {
      if (order) {
        newOrder = undefined;
        setOder(undefined);
      } else {
        if (order === undefined) {
          newOrder = false;
          setOder(false);
        } else {
          newOrder = !newOrder;
          setOder(!order);
        }
      }
      setKey(title);
    } else {
      newOrder = false;
      setOder(false);
      setKey(title);
    }
    return { field: title, order: toOrder(newOrder) };
  };

  function toOrder(order: boolean | undefined) {
    if (order) {
      return "desc";
    } else if (order === undefined) {
      return undefined;
    } else {
      return "asc";
    }
  }

  return (
    <div className={"overflow-x-auto"}>
      <table
        className={` text-sm text-left text-gray-500 table-auto w-full  ${props?.className}`}
      >
        {!props.hideHeader && (
          <thead className="text-xs text-gray-700 uppercase  border-b">
            <tr>
              {props.count && (
                <th
                  scope="col"
                  className="py-3 px-6 bg-white  border-transparent"
                >
                  No
                </th>
              )}
              {props.column.map((item: any) => (
                <th
                  key={item.headerTitle}
                  scope="col"
                  className={`py-3 px-6 bg-white w-fit  border ${item.headerClassName}`}
                >
                  <div className={"flex items-center justify-between"}>
                    {props.isLoading ? (
                      <div className={"w-full"}>
                        <Skeleton height={24} width={"90%"} variant={"text"} />
                      </div>
                    ) : (
                      item.headerTitle ?? ""
                    )}
                    {item?.sort && (
                      <>
                        {props.isLoading ? (
                          <Skeleton height={16} width={16} />
                        ) : (
                          <div
                            onClick={() => item.onSort(handleCekSort(item.key))}
                          >
                            <IconButton>
                              <FilterList />
                            </IconButton>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
        )}

        <Body
          disableOnClickIndex={props.disableOnClickIndex}
          onClick={props.onClick}
          isLoading={props?.isLoading}
          data={props?.data}
          col={props.column}
        />
      </table>
    </div>
  );
};

export interface ITableColumnData {
  sort?: boolean;
  headerTitle?: string;
  headerClassName?: string;
  value?: string;
  key: string;
  className?: string;
  layouts?: (data?: any) => any;
  loadingComponents?: any;
  paddingNone?: boolean;
  onSort?: (e: any) => void;
}

export interface ITableProps {
  isLoading?: boolean;
  column: ITableColumnData[];
  className?: string;
  count?: boolean;
  callbackOnchange?: any;
  data?: any[];
  hideHeader?: boolean;
  paddingNone?: boolean;
  onClick?: (e: any) => void;
  disableOnClickIndex?: number;
}

interface IPropsBody {
  isLoading?: boolean;
  data?: any[];
  onClick?: (e: any) => void;
  disableOnClickIndex?: number;
  col: ITableColumnData[];
}
