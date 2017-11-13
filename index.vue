<template>
<transition name="dialog">
   <div class="dialog-cover" @click.stop="onClick($event)" v-if="show">
        <div :class="['dialog-box',className]">
             <header class="dialog-header" v-if="showHeader">
                 {{title}}
             </header>
             <span class="dialog-close-btn dialog-close" v-if="showCloseButton">&times;</span>
             <div class="dialog-body">
                 <slot>{{content}}</slot>
             </div>
             <footer class="dialog-footer" v-if="showFooter">
                <button class="dialog-btn dialog-close" v-if="showCancelButton">{{cancelText}}</button>
                <button class="dialog-btn dialog-ok-btn" @click.stop="ok" v-if="showOkButton">{{okText}}</button>
             </footer>
        </div>
   </div>
</transition>
</template>

<script>
export default {
    props:{
        value:{
            type:Boolean,
            default:false,
        },

        title:{
            type:String,
            default:"提示"
        },        
        content:{
            type:String,
            default:""
        },

        width:{
            type:String,
            default:''
        },
        height:{
            type:String,
            default:''
        },
        className:{
            type:String,
            default:''
        },

        showHeader:{
            type:Boolean,
            default:true
        },
        showFooter:{
            type:Boolean,
            default:true
        },
        showCloseButton:{
            type:Boolean,
            default:true
        },
        showCancelButton:{
            type:Boolean,
            default:true
        },
        showOkButton:{
            type:Boolean,
            default:true
        },

        cancelText:{
            type:String,
            default:"取消"
        },
        okText:{
            type:String,
            default:"确定"
        },

        enableCoverClick:{
           type:Boolean,
           default:true
        }
    },
    data(){
        return {
            show:this.value
        }
    },
    methods:{
       onClick(e){
          var t=e.target,
              ct=e.currentTarget;
          if(t===ct){
            this.enableCoverClick&&(this.show=false);
            return;
          }

          while(t&&t!==ct)
          {
            if(t.classList.contains("dialog-close")){
               this.show=false;
               break;
            }
            t=t.parentNode;
          }
       },
       ok(){
           this.$emit("ok",this);
       }
    },
    watch:{
        value(){
            this.show=this.value;
        },
        show(){
            this.$emit("input",this.show);
            if(this.show)
            {
                this.$emit("open",this.$el);
            }
            else
            {
                this.$emit("close",this.$el);
            }
        }        
    },
    updated(){
        if(this._context&&this.$el.nodeType===8){
            this._context.removeChild(this.$el);
        }
    }
}
</script>

<style>
.dialog-enter-to,
.dialog-leave-to{transition:opacity .3s;}
.dialog-enter,
.dialog-leave-to{opacity:0;}
.dialog-enter>.dialog-box,
.dialog-leave-to>.dialog-box{transform:translate(-50%,-100%) scaleZ(1);}
.dialog-enter-to>.dialog-box,
.dialog-leave-to>.dialog-box{transition:all .3s;}

.dialog-cover{position:fixed;left:0;top:0;z-index:900;width:100%;height:100%;background:rgba(0,0,0,.8);}
.dialog-box{position:absolute;left:50%;top:50%;width:30%;min-width:300px;margin:0 auto;background:#FFF;transform:translate(-50%,-50%) scaleZ(1);}
.dialog-close-btn{position:absolute;top:0;right:0;}
.dialog-body{min-height:1em;}

.dialog-btn{
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    border: 1px solid #d8dce5;
    border-color: #d8dce5;
    color: #5a5e66;
    -webkit-appearance: none;
    text-align: center;
    outline: none;
    transition: .1s;
    font-weight: 500;
    user-select: none;
    padding: .6em 1.5em;
    border-radius: 4px;
}
</style>