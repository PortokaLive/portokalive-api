"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var userSchema = new mongoose_1.Schema({
    email: {
        type: String,
        requred: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    role: {
        type: Number,
        required: true,
        default: 0,
    },
    name: {
        type: String,
        required: false,
    },
    age: {
        type: Number,
        required: false,
    },
    gender: {
        type: String,
        required: false,
    },
    uuid: {
        type: String,
        required: true,
        select: false,
    },
    phone: {
        type: String,
        required: false,
    },
    activated: {
        type: Boolean,
        required: true,
        select: false,
        default: false,
    },
    location: {
        type: Object,
        required: false,
    },
});
exports.User = mongoose_1.model("model_users", userSchema);
var IUser = /** @class */ (function (_super) {
    __extends(IUser, _super);
    function IUser() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.id = "";
        _this.email = "";
        _this.password = "";
        _this.role = 0;
        _this.name = "";
        _this.age = 18;
        _this.gender = "";
        _this.uuid = "";
        _this.phone = "";
        _this.location = {};
        _this.activated = false;
        return _this;
    }
    return IUser;
}(mongoose_1.Document));
exports.IUser = IUser;
//# sourceMappingURL=User.js.map