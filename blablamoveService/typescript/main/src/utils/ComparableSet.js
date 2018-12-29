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
exports.__esModule = true;
var ComparableSet = /** @class */ (function (_super) {
    __extends(ComparableSet, _super);
    function ComparableSet() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ComparableSet.prototype.contain = function (obj) {
        if (this.getIndexOf(obj) === null) {
            return false;
        }
        else {
            return true;
        }
    };
    ComparableSet.prototype.getIndexOf = function (obj) {
        this.forEach(function (val, index) {
            if (val.equal(obj))
                return index;
        });
        return null;
    };
    return ComparableSet;
}(Array));
exports.ComparableSet = ComparableSet;
