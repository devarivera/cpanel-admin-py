var appCpanel = new Vue({
el: "#appCpanel",   
data:{     
     cpanels:[],
     accountsData:[],
     search:'',
     total:0,
 },    
 delimiters: ['[[', ']]'], 
methods:{ 
    
    fcsearch: function() {
      if (this.search != '') {
        var expresion = new RegExp('^.*'+this.search+'.*$','i');
        this.cpanels=this.accountsData.filter(function(item){
            return ( 
              item['first_name'].match(expresion) || 
              item['last_name'].match(expresion) ||
              item['registration_key'].match(expresion) ||
              item['first_name'].concat(' '+item['last_name']).match(expresion) ||
              item['last_name'].concat(' '+item['first_name']).match(expresion)
               )
          });
      }else{
        this.cpanels=this.accountsData;
      }

    },
    btnediItem:async function(id,has_trial_coupon,mkting_client,ismarket_listing,user_show_quizz){
      var checked_has='',checked_mkting_client='',checked_ismarket_listing='',checked_user_show_quizz='';
      if (has_trial_coupon=='1') {
        checked_has='checked';
      }

      if (mkting_client=='1') {
        checked_mkting_client='checked';
      }

      if (ismarket_listing=='1') {
        checked_ismarket_listing='checked';
      }

      if (user_show_quizz=='1') {
        checked_user_show_quizz='checked';
      }
      

        await Swal.fire({
        title: 'Setting Account Cpanel',
        html:'<div class="row"><label class="col-sm-7 col-form-label">Modal Pay Active?</label><div class="col-sm-2"><input id="has_trial_coupon" type="checkbox" '+checked_has+' /></div></div><div class="row"><label class="col-sm-7 col-form-label">is marketing client ?</label><div class="col-sm-2"><input id="mkting_client" type="checkbox" '+checked_mkting_client+' /></div></div><div class="row"><label class="col-sm-7 col-form-label">Off Market Listing Active ?</label><div class="col-sm-2"><input id="ismarket_listing" type="checkbox" '+checked_ismarket_listing+' /></div></div> <div class="row"><label class="col-sm-7 col-form-label">QUizz is Active ?</label><div class="col-sm-2"><input id="isuser_show_quizz" type="checkbox" '+checked_user_show_quizz+' /></div></div>',
        focusConfirm: false,
        showCancelButton: true,                         
        }).then((result) => {
          if (result.value) {
              has_trial_coupon = document.getElementById('has_trial_coupon').checked,
              mkting_client = document.getElementById('mkting_client').checked,
              ismarket_listing = document.getElementById('ismarket_listing').checked,          
              user_show_quizz = document.getElementById('isuser_show_quizz').checked,
            
            this.ediItem(id,has_trial_coupon,mkting_client,ismarket_listing,user_show_quizz);
            Swal.fire(
              '',
              'Registration updated successfully.',
              'success'
            )                  
          }
        });
        
    },

    listData:function(){
        axios.post(idxUrl.list).then(response =>{
           this.accountsData = response.data.data;
           this.cpanels=this.accountsData;
        });
    },    

    ediItem:function(id,has_trial_coupon,mkting_client,ismarket_listing,user_show_quizz){
      console.log(has_trial_coupon,mkting_client,ismarket_listing);
      var vtrial='0',vismarket='0',vmkting='0',isquizz='0';
      var data = new FormData();
    
      if (has_trial_coupon=='on' || has_trial_coupon!=false ) 
        vtrial='1';
      
      if (mkting_client=='on' || mkting_client!=false)  
        vmkting='1';

      if (ismarket_listing=='on' || ismarket_listing!=false) 
        vismarket='1';              

      if (user_show_quizz=='on' || user_show_quizz!=false) 
        isquizz='1';


      data.append("id", id );
      data.append("has_trial_coupon", vtrial );
      data.append("mkting_client", vmkting );
      data.append("ismarket_listing", vismarket );
      data.append("user_show_quizz", isquizz );

      axios.post(idxUrl.generate, data ).then(response =>{
        this.listData();           
      });                              
    }

},      
created: function(){            
   this.listData();            
},    
computed:{
    totalBuilding(){
        return this.total;   
    }
}    
});
