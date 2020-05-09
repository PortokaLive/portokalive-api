var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GeneralError = (function (_super) {
    __extends(GeneralError, _super);
    function GeneralError(code, message, name) {
        _super.call(this);
        this.code = code;
        this.message = message;
        this.name = name;
    }
    return GeneralError;
})(Error);
exports.GeneralError = GeneralError;
