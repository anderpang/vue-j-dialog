import Dialog from "./index.vue";

function Message(Vue){
    const Vm=Vue.extend(Dialog);
    const bd=document.body;
    Vue.prototype.$dialog=function(options){
        var isTip=options&&options.type==="tip",
            vm,
            el,
            context;

             if(isTip){
                 if(Vm._tip){
                     clearTimeout(Vm._timer);
                     Vm._tip.show=false;
                 }
                 options.showHeader=options.showCloseButton=options.showFooter=options.enableCoverClick=false;
                 options.className||(options.className="dialog-tip-cover");
             }
             vm=new Vm({propsData:options});
             el=vm.$mount().$el;
             context=options&&options.context;

         vm._context=context?context===this?this.$el:context:bd;
         vm._context.appendChild(vm.$mount().$el);
         vm._context.offsetHeight;
         vm.show=true;
         if(isTip){
             Vm._tip=vm;
             Vm._timer=setTimeout(function(){
                 Vm._tip=null;
                 vm.show=false;
             },options.timeout||3000);
         }
         return vm;
    };
}

export default Message;