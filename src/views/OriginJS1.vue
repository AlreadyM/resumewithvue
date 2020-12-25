<template>
  <div class="">
  <h4>1、使用css 制作包含五角星的按钮，该按钮背景线性渐变，边框圆角，附带外阴影与外层描边</h4>
  <h4>2、使用原生JS编写一个可移动可缩放的容器</h4>
      
      <el-container>
        <el-aside>
          <div class="module-btn normal">
            <span class="pentacle"></span>CHECKOUT<span class="pentacle"></span>
          </div>

          <p>错误修正1：除右下角外的大小缩放，缩放过程中的最小化未正确固定内部区块</p>
          <p>错误修正2：重置大小时在父级边界外仍可重置缩放，修正为超出边界停止缩放</p>
        </el-aside>
        <el-main>

        <div class="drag-resize">
      <div class="drag-size-target">
        <div class="top-left"></div>
        <div class="top-right"></div>
        <div class="bottom-left"></div>
        <div class="bottom-right"></div>
      </div>
    </div>
        </el-main>

      </el-container>
    
    
  </div>
</template>
<script>
export default{
    name:'OriginJS',
    mounted() {
       dragSize('.drag-resize','.drag-size-target')
    },
    methods: {
    },
}
  function dragSize(outbox,inbox) {
            var outerBox = document.querySelectorAll(outbox)[0],
                target = outerBox.querySelectorAll(inbox)[0],

                outerBoxParameters = outerBox.getBoundingClientRect(),
                outerBoxX = outerBoxParameters.x,
                outerBoxY = outerBoxParameters.y,
                outerBoxWidth = outerBoxParameters.width,
                outerBoxHeight = outerBoxParameters.height,

                targetBoxParameters = target.getBoundingClientRect(),
                targetX = targetBoxParameters.x,
                targetY = targetBoxParameters.y,
                targetWidth = targetBoxParameters.width,
                targetHeight = targetBoxParameters.height,

                startX = 0,startY = 0,
                gapX = 0,gapY = 0,
                movestartgapX = 0,movestartgapY = 0,
                isMoveable = false,isResizeable = false,
                isTL = false, isTR = false, isBL = false, isBR = false,
                topLeftSwitch = target.querySelectorAll(".top-left")[0],
                topRightSwitch = target.querySelectorAll(".top-right")[0],
                bottomLeftSwitch = target.querySelectorAll(".bottom-left")[0],
                bottomRightSwitch = target.querySelectorAll(".bottom-right")[0]
                ;

            function movingStart(e) {
                updatetargetinfo()
                isMoveable = true
                startX = e.clientX 
                startY = e.clientY 
                movestartgapX = startX - targetX
                movestartgapY = startY - targetY
            }
           
            function mousemove(e) {
                if(!isMoveable && !isResizeable){
                    return
                }
                var movingX = e.clientX,
                    movingY = e.clientY
                    gapX = movingX - startX
                    gapY = movingY - startY
                    ;
                    console.log(targetHeight,targetWidth);
                if(isMoveable){

                    var left = movingX - outerBoxX - movestartgapX <= 0 ? 0 : movingX + targetWidth- movestartgapX > outerBoxX + outerBoxWidth ?  outerBoxWidth  - targetWidth  : targetX + gapX - outerBoxX,
                        top = movingY - outerBoxY - movestartgapY <= 0 ? 0  : movingY + targetHeight -  movestartgapY > outerBoxY + outerBoxHeight ?   outerBoxHeight - targetHeight : targetY + gapY- outerBoxY
                        ;
                    setStyle({
                        left:   left ,
                        top:   top 
                    })
                }else if(isResizeable){ // 缩放
                    var obj ;
                    gapX = movingX - startX
                    gapY = movingY - startY
                    if(isTL){ // 左上
                        obj = {
                            left: movingX > startX + targetWidth ?  targetX + targetWidth - outerBoxX : movingX < outerBoxX ? 0 : targetX + gapX - outerBoxX,
                            top: movingY > startY + targetHeight ? targetY + targetHeight - outerBoxY : movingY < outerBoxY ? 0 :  targetY + gapY - outerBoxY,
                            width: movingX > startX + targetWidth ? 0 : targetWidth - gapX,
                            height: movingY > startY + targetHeight ? 0 : targetHeight - gapY
                        }
                    }else if(isTR){ // 右上
                        obj = {
                            top: movingY > targetY + targetHeight ? targetY + targetHeight - outerBoxY : movingY < outerBoxY ? 0 :  targetY + gapY - outerBoxY,
                            width: movingX < startX - targetWidth? 0  : movingX > outerBoxWidth  + outerBoxX ? outerBoxWidth - startX - targetWidth : targetWidth + gapX,
                            height: movingY > targetY + targetHeight ? 0 : targetHeight - gapY
                        }
                    }else if(isBL){ // 左下
                        obj = {
                            left:movingX > startX + targetWidth ?  targetX + targetWidth - outerBoxX : movingX < outerBoxX ? 0 : targetX + gapX - outerBoxX,
                            width: movingX > startX + targetWidth ? 0 : targetWidth - gapX,
                            height:movingY < startY - targetHeight ?  0 : movingY > outerBoxY + outerBoxHeight ? outerBoxHeight - startY + targetHeight + outerBoxY :targetHeight + gapY
                        }
                    }else if(isBR){ //  右下
                        obj = {
                            width: movingX < startX - targetWidth? 0  : movingX > outerBoxWidth  + outerBoxX ? outerBoxWidth - startX - targetWidth : targetWidth + gapX,
                            height:movingY > outerBoxHeight + outerBoxY ?  outerBoxHeight - startY + targetHeight +outerBoxY: targetHeight + gapY
                        }
                    }
                    setStyle(obj)
                }
            }
            function movingEnd() {
                isMoveable = false
                isResizeable = false
                isTL = false
                isTR = false
                isBL = false
                isBR = false
            }
            function setStyle(obj) {
                if(obj != undefined){
                    for( var item in obj){
                        target.style[item] = obj[item] + 'px'
                    }
                }
            }
            function updatetargetinfo() {
                targetBoxParameters = target.getBoundingClientRect()
                targetX = targetBoxParameters.x
                targetY = targetBoxParameters.y
                targetWidth = targetBoxParameters.width
                targetHeight = targetBoxParameters.height
                console.log('updating info')
            }
            function reSizeSwitcher(e) {
                updatetargetinfo()
                
                isMoveable = false;
                isResizeable = true;
                var tagClass = e.target.getAttribute("class");
                switch (tagClass) {
                    case "top-left":
                    isTL = true;
                    startX = targetX;
                    startY = targetY;
                    break;
                    case "top-right":
                    isTR = true;
                    startX = targetX + targetWidth;
                    startY = targetY ;
                    break;
                    case "bottom-left":
                    isBL = true;
                    startX = targetX ;
                    startY = targetY + targetHeight;
                    break;
                    case "bottom-right":
                    isBR = true;
                    startX = targetX + targetWidth;
                    startY = targetY + targetHeight;
                    break;
                }
            }
            // document.querySelectorAll('.el-main')[0].addEventListener('scroll',updatetargetinfo,true) // 给外层main content 添加滚动监听，滚动时更新内部target info 保障滚动后导致的位置变动不影响拖动，缩放
            target.addEventListener('mousedown', movingStart, true)
            document.addEventListener('mouseup', movingEnd, true) //up事件绑定到document 移出外层容器松开鼠标即停止当前动作
            outerBox.addEventListener('mousemove', mousemove, true)
            topLeftSwitch.addEventListener('mousedown', reSizeSwitcher, true)
            topRightSwitch.addEventListener('mousedown', reSizeSwitcher, true)
            bottomLeftSwitch.addEventListener('mousedown', reSizeSwitcher, true)
            bottomRightSwitch.addEventListener('mousedown', reSizeSwitcher, true)
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
    margin:  8px;
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
    margin: 20px auto 0;
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
