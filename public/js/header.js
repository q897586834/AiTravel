$(function(){
    $(`<link rel="stylesheet" href="css/header.css">`).appendTo("head");
    $.ajax({
        url:"header.html",
        type:"get",
        success:function(res){
            $(res).replaceAll("#header");
            var vm=new Vue({
                el:"#header",
                data:{
                    islogin:false,
                    keyword:"",
                    uname:sessionStorage.getItem("uname"),
                    uid: ""
                },
                mounted(){
                    var self=this;
                    //var uid=localStorage.getItem(uid);
                  //  console.log(uid);
                    // this.$http.get("users/islogin").then(res=>{
                    //     if (res.data.ok == 1) {
                    //         self.islogin = true;
                    //         self.uname = res.data.uname;
                    //         self.uid = res.data.uid;
                    //       } else
                    //     self.islogin=false;
                    // })
                    console.log(this.uname);
                    if(this.uname){
                        self.islogin = true;
                    }else{
                        self.islogin=false;
                    }
                  },
                  
                methods:{
                    signout(){
                        // this.$http.get("users/signout").then(res=>{
                        //   location.href="/"
                        // })
                        sessionStorage.removeItem("uname");
                        location.href="/"
                      },
                    update(uname){
                        location.href="/update.html?uname=" + uname;
                      },
                      buy(uname){
                        location.href="/buy.html?uname=" + uname;
                      }
                }
            })
        }
    })
})