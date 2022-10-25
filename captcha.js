/**生成一个随机数**/
function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

let size = 4; //设置验证码长度
function Captcha(options) { //创建一个图形验证码对象，接收options对象为参数
  this.options = { //默认options参数值
    id: "", //容器Id
    canvasId: "verifyCanvas", //canvas的ID
    width: "50", //默认canvas宽度
    height: "30", //默认canvas高度
    code: "",
  }
  if (Object.prototype.toString.call(options) == "[object Object]") { //判断传入参数类型
    for (var i in options) { //根据传入的参数，修改默认参数值
      this.options[i] = options[i];
    }
  } else {
    this.options.id = options;
  }
  this.options.numArr = "0,1,2,3,4,5,6,7,8,9".split(",");
  this._init();
  this.refresh();
}

Captcha.prototype = {
  /**初始化**/
  _init: function () {
    var con = document.getElementById(this.options.id);
    var canvas = document.createElement("canvas");
    this.options.width = con.offsetWidth > 0 ? con.offsetWidth : "100";
    this.options.height = con.offsetHeight > 0 ? con.offsetHeight : "30";
    canvas.id = this.options.canvasId;
    canvas.width = this.options.width;
    canvas.height = this.options.height;
    canvas.style.cursor = "pointer";
    canvas.innerHTML = "您的浏览器版本不支持canvas";
    con.appendChild(canvas);
    var parent = this;
    canvas.onclick = function () {
      parent.refresh();
    }
  },

  /**生成验证码**/
  refresh: function () {
    this.options.code = "";
    var canvas = document.getElementById(this.options.canvasId);
    if (canvas.getContext) {
      var ctx = canvas.getContext('2d');
    } else {
      return;
    }
    ctx.textBaseline = "middle"; // 文本绘制时对齐的基线
    ctx.fillStyle = 'rgb(247,253,251)'; //背景色
    ctx.fillRect(0, 0, this.options.width, this.options.height); // 矩形填充
    var txtArr = "0,1,2,3,4,5,6,7,8,9".split(","); //数字数组
    for (var i = 1; i <= size; i++) {
      var txt = txtArr[randomNum(0, txtArr.length)];
      this.options.code += txt;
      ctx.font = '25px SimSun' // 字体大小和字体格式
      ctx.fillStyle = 'rgb(93,151,126)'; //字体颜色  
      var x = this.options.width / (size + 1) * i;
      var y = this.options.height / 2;
      ctx.translate(x, y);
      ctx.fillText(txt, -6, -3);
      ctx.translate(-x, -y);
    }
  },

  /**验证验证码**/
  validate: function (code) {
    var v_code = this.options.code;
    if (code == v_code) {
      return true;
    } else {
      this.refresh();
      return false;
    }
  }
}