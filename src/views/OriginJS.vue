<template>
  <div class="container">
  <h4>使用css 制作包含五角星的按钮，该按钮背景线性渐变，边框圆角，附带外阴影与外层描边</h4>
  <h4>使用原生JS编写一个可移动可缩放的容器</h4>
      <div class="module-btn normal">
        <span class="pentacle"></span>CHECKOUT<span class="pentacle"></span>
      </div>
    <div class="drag-resize">
      <div class="drag-size-target">
        <div class="top-left"></div>
        <div class="top-right"></div>
        <div class="bottom-left"></div>
        <div class="bottom-right"></div>
      </div>
    </div>
    <p>错误修正1：除右下角外的大小缩放，缩放过程中的最小化未正确固定内部区块</p>
    <p>错误修正2：重置大小时在父级边界外仍可重置缩放，修正为超出边界停止缩放</p>
  </div>
</template>
<script>
export default{
    name:'OriginJS',
    mounted() {
        dragSize('.drag-resize')
    },
    methods: {
    },
}
  function dragSize(goal) {
    var parent = new Object();
    var outerBox = document.querySelectorAll(goal)[0], // 外层容器
      target = outerBox.querySelectorAll(".drag-size-target")[0], // 内层拖动，可更改大小容器 层级仅限 .drag-size-target
      outerBoxX = outerBox.getBoundingClientRect().x, // 外层容器外边距x
      outerBoxY = outerBox.getBoundingClientRect().y, // 外层容器外边距y
      outerBoxWidth = outerBox.getBoundingClientRect().width, // 外层容器宽度
      outerBoxHeight = outerBox.getBoundingClientRect().height, // 外层容器高度
      targetWidth = target.getBoundingClientRect().width, // 内层容器初始宽度 函数体内父级顶层变量
      targetHeight = target.getBoundingClientRect().height, // 内层容器初始高度 函数体内父级顶层变量
      targetX = target.getBoundingClientRect().x,
      targetY = target.getBoundingClientRect().y,
      targetMargin = 10,
      isMoveable = false, //
      // resize
      topLeftSwitch = target.querySelectorAll(".top-left")[0],
      topRightSwitch = target.querySelectorAll(".top-right")[0],
      bottomLeftSwitch = target.querySelectorAll(".bottom-left")[0],
      bottomRightSwitch = target.querySelectorAll(".bottom-right")[0],
      isResizeable = false,
      startX = 0, // when mousedown store the init mouse position
      startY = 0, // when mousedown store the init mouse position
      isTL = false, //左上
      isTR = false, // 右上
      isBL = false, //左下
      isBR = false, // 右下
      spaceGap = targetMargin + 1;
    //   spaceGap = 0;
    parent.getState = function () {
      // 更新内层容器高宽 定位 数据
      targetWidth = target.getBoundingClientRect().width;
      targetHeight = target.getBoundingClientRect().height;
      targetX = target.getBoundingClientRect().x;
      targetY = target.getBoundingClientRect().y;
    };

    parent.movingStart = function (e) {
      startX = e.clientX;
      startY = e.clientY;
      isMoveable = true;
      isResizeable = false;
      parent.getState();
    };
    parent.movingEnd = function () {
      isMoveable = false;
      isResizeable = false;
      isTL = false; //左上
      isTR = false; // 右上
      isBL = false; //左下
      isBR = false; // 右下
    };
    parent.mousemove = function (e) {
      var movingX = e.clientX,
        movingY = e.clientY,
        goToX =
          movingX - outerBoxX > outerBoxWidth - targetWidth / 2 - targetMargin
            ? outerBoxWidth - targetWidth - targetMargin
            : movingX - outerBoxX < targetWidth / 2 - targetMargin
            ? -targetMargin
            : movingX - outerBoxX - targetWidth / 2,
        goToY =
          movingY - outerBoxY > outerBoxHeight - targetHeight / 2 - targetMargin
            ? outerBoxHeight - targetHeight - targetMargin
            : movingY - outerBoxY < targetHeight / 2 - targetMargin
            ? -targetMargin
            : movingY - outerBoxY - targetHeight / 2;
      // console.log(outerBoxX,outerBoxY);
    movingX < outerBoxX || movingX > outerBoxX + outerBoxWidth ||
    movingY < outerBoxY || movingY > outerBoxY + outerBoxHeight ? isResizeable = false : ''
      if (isMoveable) {
        // 鼠标在内层可拖动容器按下未松开  继续执行move事件
        parent.setStyle("left", goToX + "px");
        parent.setStyle("top", goToY + "px");
      } else {
        if (!isResizeable) return; // 如未点击重置大小，阻断后续未生效代码执行
        // 开始缩放大小后对目标x y 与 target 原 x y 对比，避免高宽为0后可继续拖动缩放
        // 四角按下鼠标开始拖动的初始按下xy 与target 原xy 有一定距离，需要移除该间距影响带来的框体跳动
        if (isTL) {
          // 向左 规定初始变动方向 左上的拖动需要更改target left top
          if (targetY + targetHeight > movingY) {
            parent.setStyle(
              "top",
              targetY + (movingY - startY - outerBoxY - spaceGap) + "px"
            );
            parent.setStyle("height", targetHeight - movingY + startY + "px");
          }
          if (targetX + targetWidth > movingX) {
            parent.setStyle(
              "left",
              targetX + (movingX - startX - outerBoxX - spaceGap) + "px"
            );
            parent.setStyle("width", targetWidth - movingX + startX + "px");
          }
        } else if (isTR) {
          // 向右 右上拖动时需更改target  top
          if (targetY + targetHeight > movingY) {
            parent.setStyle(
              "top",
              targetY + (movingY - startY - outerBoxY - spaceGap) + "px"
            );
            parent.setStyle("height", targetHeight - movingY + startY + "px");
          }
          parent.setStyle("width", targetWidth + movingX - startX + "px");
        } else if (isBL) {
          // 左下 仅更改left
          if (targetX + targetWidth > movingX) {
            parent.setStyle(
              "left",
              targetX + (movingX - startX - outerBoxX - spaceGap) + "px"
            );
            parent.setStyle("width", targetWidth - movingX + startX + "px");
          }
          parent.setStyle("height", targetHeight + movingY - startY + "px");
        } else if (isBR) {
          // 右下 无需特殊更改
          parent.setStyle("width", targetWidth + movingX - startX + "px");
          parent.setStyle("height", targetHeight + movingY - startY + "px");
        }
      }
    };
    parent.resizMinimal = function (positionXorY, originPosition) {
      if (positionXorY <= originPosition) return true;
    };
    parent.reSizSwitcher = function (e) {
      parent.getState();
      startX = e.clientX;
      startY = e.clientY;
      isMoveable = false;
      isResizeable = true;
      var tagclass = e.target.getAttribute("class");
      switch (tagclass) {
        case "top-left":
          isTL = true;
          break;
        case "top-right":
          isTR = true;
          break;
        case "bottom-left":
          isBL = true;
          break;
        case "bottom-right":
          isBR = true;
          break;
      }
    };
    parent.setStyle = function (style, value) {
      target.style[style] = value;
    };
    target.addEventListener("mousedown", parent.movingStart, true);
    document.addEventListener("mouseup", parent.movingEnd, true); //up事件绑定到document 移出外层容器松开鼠标即停止当前动作
    outerBox.addEventListener("mousemove", parent.mousemove, true);
    topLeftSwitch.addEventListener("mousedown", parent.reSizSwitcher, true);
    topRightSwitch.addEventListener("mousedown", parent.reSizSwitcher, true);
    bottomLeftSwitch.addEventListener("mousedown", parent.reSizSwitcher, true);
    bottomRightSwitch.addEventListener("mousedown", parent.reSizSwitcher, true);
  }
</script>

<style scoped>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  .container h4{
    text-align:left;
    line-height:24px;
  }

  .pentacle {
    font-size: 0;
    display: inline-block;
    position: relative;
    width: 0;
    height: 0;
    border-bottom: 7px solid #888;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    transform: rotate(35deg) scale(0.6);
  }

  .pentacle::before,
  .pentacle::after {
    content: "";
    display: inline-block;
    position: absolute;
    top: 0;
    left: -10px;
    transform: rotate(75deg);
    width: 0;
    height: 0;
    border-bottom: 7px solid #888;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
  }

  .pentacle::after {
    transform: rotate(-68deg);
  }

  .module-btn {
    user-select: none;
    -webkit-user-select: none;
    position: relative;
    display: inline-block;
    font-size: 14px;
    margin: 0 8px;
    color: #555555;
    font-weight: 800;
    border: 1px solid #b5b5b5;
    outline: 1px solid #b5b5b5;
    outline-offset: 5px;
    border-radius: 5px;
    height: 35px;
    line-height: 35px;
    box-shadow: 0px 0px 0px 4px #cbcbcb;
    background: -moz-linear-gradient(180deg, #e1e1e1 0, #b2b2b2 100%);
    /* FF3.6+ */
    background: -webkit-gradient(
      linear,
      180deg,
      color-stop(0, E1E1E1),
      color-stop(100%, B2B2B2)
    );
    /* Chrome,Safari4+ */
    background: -webkit-linear-gradient(180deg, #e1e1e1 0, #b2b2b2 100%);
    /* Chrome10+,Safari5.1+ */
    background: -o-linear-gradient(180deg, #e1e1e1 0, #b2b2b2 100%);
    /* Opera 11.10+ */
    background: -ms-linear-gradient(180deg, #e1e1e1 0, #b2b2b2 100%);
    /* IE10+ */
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#1301FE', endColorstr='#F4F60C', GradientType='1');
    /* for IE */
    background: linear-gradient(180deg, #e1e1e1 0, #b2b2b2 100%);
    /* W3C */
  }

  .module-btn .pentacle {
    top: -2px;
  }

  .module-btn.normal {
    outline: none;
    outline-offset: 5px;
  }

  .module-btn.normal::after {
    content: "";
    display: block;
    position: absolute;
    top: -7px;
    left: -7px;
    width: calc(100% + 12px);
    height: calc(100% + 12px);
    border: 1px solid #787878;
    border-radius: 10px;
  }
  .drag-resize {
    margin: 20px auto;
    width: 600px;
    height: 600px;
    position: relative;
    font-size: 0;
    border: 1px solid #cfcfcf;
  }

  .drag-resize .drag-size-target {
    position: absolute;
    width: 100px;
    height: 100px;
    margin: 10px;
    top: 250px;
    left: 250px;
    cursor: move;
    border: 1px dashed green;
  }

  .drag-resize .top-left,
  .drag-resize .top-right,
  .drag-resize .bottom-left,
  .drag-resize .bottom-right {
    position: absolute;
    width: 10px;
    height: 10px;
    border: 1px solid #000;
    z-index: 1;
  }

  .drag-resize .top-left {
    top: -5px;
    left: -5px;
    cursor: nwse-resize;
  }

  .drag-resize .top-right {
    top: -5px;
    right: -5px;
    cursor: nesw-resize;
  }

  .drag-resize .bottom-left {
    bottom: -5px;
    left: -5px;
    cursor: nesw-resize;
  }

  .drag-resize .bottom-right {
    bottom: -5px;
    right: -5px;
    cursor: nwse-resize;
  }
</style>
