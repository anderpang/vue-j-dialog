# vue-j-dialog

Dialog (Modal) component for Vue2.x

## npm

```bash

$ npm install vue-j-dialog

```

## Options


| Option                  | Purpose                                                                                                                                                                                                                                                                                                                         |
|----------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| context        | {DOM} 挂靠元素，默认为body |
| type           | {String} 只有一个值"tip",为提示信息 |
| timeout        | {Number} 当type="tip"时，提示信息显示时间（单位：毫秒) |
| title          | {String} 标题 |
| content        | {String} 内容  |
| width          | {String} 宽，例如："100%","10em" |
| height         | {String} 高  |
| className      | {String} css类名  |
| showHeader      | {Boolean} 显示头部  |
| showFooter      | {Boolean} 显示脚部  |
| showCloseButton      | {Boolean} 显示关闭按钮  |
| showCancelButton      | {Boolean} 显示取消按钮  |
| showOkButton      | {Boolean} 显示确认按钮  |
| cancelText      | {String} 取消按钮文字  |
| okText      | {String} 确认按钮文字  |
| enableCoverClick      | {Boolean} 遮罩层是否能点击 |

## Example

#### main.js
```javascript
  import Vue from "vue";
  import Dialog from "vue-j-dialog";

  Vue.use(Dialog);
```
page.vue

```javascript
<template>
  <button @click="btnClick" @close="onClose" @open="onOpen">打开弹窗（模板方式）</button>

  <button @click="btnClick2">打开弹窗（函数方式）</button>

  <show-dialog v-model="isShow"> 
    <p>弹窗内容</p>
  </show-dialog>
</template>

<script>
import ShowDialog from "vue-j-dialog/index.vue"; //用于模板方式

export default {
    data () {
        return {
          isShow:false
        }
    },

    methods:{
       onOpen(){
           console.log("打开回调");
       },
       onClose(){
           consle.log("关闭回调")
       },

       btnClick(){
           this.isShow=true;          
       },

       btnClick2(){
            this.$dialog({
                title:"说明",
                content:"这是函数打开"
            })
            .$on("close",this.onClose)
            .$on("open",this.onOpen).
            .$on("ok",function(){
                console.log("点击了确定按钮");
            });
       }
    }
}
</script>
```
