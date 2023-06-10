export class UtilsHelper {
  public paginatedCalc(size: number, count: number) {
    const calculate = count / size;
    return Math.ceil(calculate) - 1;
  }
}