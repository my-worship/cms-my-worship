import {
  defaultPaginatedData,
  IPaginatedParams,
} from "../utilities/type-utils";

export default class QueryParamsHelper {
  toObjQueryParamsPagination(data?: string): IPaginatedParams {
    if (data) {
      const checkString = data.replace("?", "");
      const result = JSON.parse(
        '{"' + checkString.replace(/&/g, '","').replace(/=/g, '":"') + '"}',
        function (key, value) {
          return key === "" ? value : decodeURIComponent(value);
        }
      );
      return {
        page: parseInt(result.page),
        size: parseInt(result.size),
        sort: result.sort,
      };
    } else {
      return defaultPaginatedData;
    }
  }

  getUrlParsingValue(value: any) {
    if (value) {
      const { page, size, keyword, sort, paymentStatus } = value;
      let param = "";
      param = this.getUrlParsing(param, "page", page);
      param = this.getUrlParsing(param, "size", size);
      param = this.getUrlParsing(param, "sort", sort);
      param = this.getUrlParsing(param, "keyword", keyword);
      param = this.getUrlParsing(param, "paymentStatus", paymentStatus);
      return param;
    }
  }

  getUrlParsing(onGoingParameter: string, value: string, parameter: any) {
    if (parameter !== undefined) {
      if (parameter !== null) {
        if (parameter !== "") {
          if (
            onGoingParameter === undefined ||
            onGoingParameter === null ||
            onGoingParameter === ""
          ) {
            onGoingParameter =
              "?" + value + "=" + encodeURIComponent(parameter);
          } else {
            onGoingParameter =
              onGoingParameter +
              "&" +
              value +
              "=" +
              encodeURIComponent(parameter);
          }
        }
      }
    }
    return onGoingParameter;
  }
}
