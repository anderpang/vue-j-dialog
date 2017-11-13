import Dialog from "./index.vue";

function Message(Vue){
    const Vm=Vue.extend(Dialog);
    const bd=document.body;
    Vue.prototype.$dialog=function(options){
         var vm=new Vm({propsData:options}),
             el=vm.$mount().$el,
             context=options&&options.context;

         vm._context=context?context===this?this.$el:context:bd;
         vm._context.appendChild(vm.$mount().$el);
         vm._context.offsetHeight;
         vm.show=true;
         return vm;
    };
}

export default Message;