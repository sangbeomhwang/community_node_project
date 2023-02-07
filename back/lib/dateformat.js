class DateFormat {
  constructor(date) {
    this.time = new Date(date);
  }

  dateformat() {
    const yyyy = this.time.getFullYear();
    let mm = this.time.getMonth() + 1;
    let dd = this.time.getDate();

    mm = (mm > 9 ? "" : "0") + mm;
    dd = (dd > 9 ? "" : "0") + dd;

    const result = [yyyy, mm, dd];
    return result.join("-");
  }
}

module.exports = DateFormat;
