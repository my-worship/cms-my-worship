export class UtilsHelper {
  public paginatedCalc(size: number, count: number) {
    const calculate = count / size;
    return Math.ceil(calculate) - 1;
  }
}

export function checkMappingData(str?: string | number) {
  if (!str) {
    return "-";
  } else if (str === 0) {
    return "0";
  } else if (str === " ") {
    return "-";
  } else if (typeof str === "number") {
    return str.toString();
  } else {
    return str;
  }
}
