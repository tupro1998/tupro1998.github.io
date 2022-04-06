function themsp() {
    var ten = document.getElementById('tensp').value;
    var gia = document.getElementById('tien').value;
    
    var hinhanh_mp = document.getElementById('chon').value;
    var hinhanh = hinhanh_mp.substr(12,hinhanh_mp.length);    
    var id= Math.floor(Math.random()*10);

    if (ten == '' || gia == '' || hinhanh == '' ) {
        document.getElementById('form-themsp').innerHTML = '<div>*BẠN KHÔNG ĐƯỢC BỎ TRỐNG*</div>';
    } else {
        let sanpham = localStorage.getItem('sanpham') ? JSON.parse(localStorage.getItem('sanpham')) : [];
        sanpham.push({
            tensp: ten,
            giasp: gia,
            hinhanhsp: hinhanh,
            idsp:id,
      
        });

        localStorage.setItem('sanpham',JSON.stringify(sanpham));
    }
}

function xuatsp(){
    let sanpham = localStorage.getItem('sanpham') ? JSON.parse(localStorage.getItem('sanpham')) : [];
    var tbsp= ``;
    sanpham.forEach(i => {
    tbsp += `        <div class="col-lg-4 mb-3 mb-lg-0">
                <div class="hover hover-5 text-white rounded">
                <img src="../images/${i.hinhanhsp}" alt="">
                <div class="hover-overlay"></div>
                <div class="hover-5-noidung px-5 py-4 mt-3">
                
                    <h3 class="hover-5-tieude text-uppercase font-weight-bold mb-0 text-white" style="color:">${i.tensp}<hr> 
                    <span class="font-weight-bold" style="color:red;">
                    ${i.giasp.replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.')} vnđ <br>
                    <div class="form-group">
                    
                    </div>       
                         
                    <a href="#" onClick="themspzogiohang(${i.idsp})" "> Thêm vào giỏ hàng</a><br>
                    <a href="#" onClick="editsp(${i.idsp})" style="color:white;">Sửa</a>
                    </span> </h3>        
                     
                    <p class="hover-5-trichdan font-weight-light mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                        </div>
                        </div>
                        </div> `;

    });
        document.getElementById('form-themsp').innerHTML= `<div class="row">`+tbsp+`</div>`;}

function themspzogiohang(a){  
    
    alert("Bạn đã thêm sản phẩm thành công");
    
    let sanpham = localStorage.getItem('sanpham') ? JSON.parse(localStorage.getItem('sanpham')) : [];
    let giohang = localStorage.getItem('giohang') ? JSON.parse(localStorage.getItem('giohang')) : [];
        
    sanpham.forEach(x => {
        if(x.idsp == a){
            giohang.push({
                idgh:x.idsp,
                tengh:x.tensp,
                giagh:x.giasp,
                hinhanhgh:x.hinhanhsp,
                                               
            })
            localStorage.setItem('giohang',JSON.stringify(giohang));

        }
    });
   

}
function xemgiohang(){
    var slgiohang = document.getElementById('giohang1').value;
    if(slgiohang == 'undefined'){
            document.getElementById('giohang2').style.display='none';
    }           
    else{
        document.getElementById('giohang2').style.display='block';
        document.getElementById('bestazir').style.display='none';
        document.getElementById('form-themsp').style.display='none';
        document.getElementById('load-loc').style.display='none';
        document.getElementById('form-locsp').style.display='none';
    } 
    giohangview();
}


function giohangview(){
    let giohang = localStorage.getItem('giohang') ? JSON.parse(localStorage.getItem('giohang')) : [];
    var tablegh = ``;
    

    giohang.forEach(h=>{
        tablegh += `      
                <div class="media mt-5">
                <img src="../images/${h.hinhanhgh}" class="mr-3" alt="..." width="200px" >
                <div class="media-body">
                    <h3 class="mt-0 " >${h.tengh}</h3>
                <div class="text-danger" style="font-size:20px; font-weight:bold;">${h.giagh.replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.')} vnđ</div>
               
                <a href="#"  id="xoaspgh" class="btn btn-danger" onClick="xoaspgh(${h.idgh})"> Xóa </a>
                </div>
                </div>`;        
    });
    document.getElementById('giohang3').innerHTML= tablegh+ 
                `<input type="text" placeholder="Địa chỉ nhận hàng" id="diachi" style="width:1200px; margin-top:100px;"> <br>
                <input type="text" placeholder="Email của bạn" class="email" style="width:1200px; "> <br>
                <input class="btn btn-primary mt-5" style="margin-left:500px;" type="submit" value="Xác nhận mua hàng" id="submit" onClick="kiemtradiachi()">
                <div id="diachitrong"><div>
                                `;
}

function kiemtradiachi(){
var diachi= document.getElementById("diachi").value;

var randomid= Math.floor(Math.random()*1000);

let giohang = localStorage.getItem('giohang') ? JSON.parse(localStorage.getItem('giohang')) : [];

if(diachi ==""){
    alert("không được bỏ trống địa chỉ");
    location.reload();
}
else{
    let bill = localStorage.getItem('bill') ? JSON.parse(localStorage.getItem('bill')) : [];
    giohang.forEach(t =>{
       
        bill.push({           
            idbill:randomid,
            idhd:t.idgh,
            tenhd:t.tengh,
            giahd:t.giagh,
            hinhanhhd:t.hinhanhgh,         
            diachigh:diachi,
        })
        localStorage.setItem('bill',JSON.stringify(bill));             
        xuatbill(randomid);}) 
    giohang.splice(0,giohang.length);
        localStorage.setItem('giohang',JSON.stringify(giohang));
}}

function xuatbill(id){
    
    let bill = localStorage.getItem('bill') ? JSON.parse(localStorage.getItem('bill')) : [];
    document.getElementById('giohang3').style.display =  'none';
    document.getElementById('giohang4').style.display =  'block';
    var tablexuatbill=``;
    var diachibill='';
    var tien=0;
    var msbill=``;
    

    bill.forEach(l => {
        if(l.idbill == id ){
            diachibill=l.diachigh;
            msbill=l.idbill;                 
            tablexuatbill += `
                        <div class="media mt-2" style="border:solid 1px black;">
                        <img src="../images/${l.hinhanhhd}" class="mr-3" alt="..." width="200px" >
                        <div class="media-body">
                        <h3 class="mt-0 " >Tên sản phẩm:${l.tenhd}</h3>
                        <div class="text-danger" style="font-size:20px; font-weight:bold;"><span class="text-dark">Giá tiền:</span>${l.giahd.replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.')}<span class="text-dark">vnđ</span></div>        
                        
                        </div>                                                                           
                        </div>                        
                        `;
            tien += Number(l.giahd);
        ;}}       
    )
      document.getElementById("giohang4").innerHTML=`      
                        <h2 align="center" class="text-white bg-dark mt-5" >Bảng Hóa đơn</h2>`
                        +`<div style="font-size:20px; font-weight:bold;">Mã số hóa đơn: 0000000${msbill}</div> <br>`+
                        `<div style="font-size:20px; font-weight:bold;">Địa chỉ người nhận:${diachibill}</div> <br>`
                        +tablexuatbill +
                        `<div style="font-size:20px; font-weight:bold; margin-left:55%;">Tổng tiền phải thanh toán: ${tien} VNĐ </div><br>` +
                        `<a class="btn btn-primary text-white" style="margin-left:40%" onClick="thanhtoan()">Thanh toán </a> `;
    }
function xoaspgh(idxoa){
    let giohang = localStorage.getItem('giohang') ? JSON.parse(localStorage.getItem('giohang')) : [];

    giohang.forEach((m,index) => {
        if(idxoa == m.idgh){
            giohang.splice(index,1);
            localStorage.setItem('giohang',JSON.stringify(giohang));
            location.reload();
        }} )

}

function thanhtoan(){
    alert("bạn đã mua hàng thành công");
    document.getElementById("giohang4").innerHTML= 
    `<h1 style="color:green; font-size:30px; text-align:center; margin-top:20px;"> 
    $ Bạn đã mua hàng thành công! $
    </h1> `;
    sendEmail();
}
function locsp1(){
    let sanpham = localStorage.getItem('sanpham') ? JSON.parse(localStorage.getItem('sanpham')) : [];
    var tableloc =``;
    var tableloc2=``;
    var tableloc3=``; 
    var loc = document.getElementById("locsp").value;
    var loc2=document.getElementById("locsp").value;
    var loc3=document.getElementById("locsp").value;
    var loc4=document.getElementById("locsp").value;

    
    
        if(loc==1){

           sanpham.forEach(l =>{
            if(l.giasp < 200000){
                
             tableloc+=
             `<div class="col-lg-4 mb-3 mb-lg-0">
             <div class="hover hover-5 text-white rounded">
             <img src="../images/${l.hinhanhsp}" alt="">
             <div class="hover-overlay"></div>
             <div class="hover-5-noidung px-5 py-4 mt-3">
             
                 <h3 class="hover-5-tieude text-uppercase font-weight-bold mb-0 text-white" style="color:">${l.tensp}<hr> 
                 <span class="font-weight-bold" style="color:red;">
                 ${l.giasp.replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.')} vnđ <br>
                 <div class="form-group">
                 
                 </div>       
                      
                 <a href="#" onClick="themspzogiohang(${l.idsp})" "> Thêm vào giỏ hàng</a><br>
                 <a href="#" onClick="editsp(${l.idsp})" style="color:white;">Sửa</a>
                 </span> </h3>        
                  
                 <p class="hover-5-trichdan font-weight-light mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                     </div>
                     </div>
                     </div> 
             `;  
               }})
               document.getElementById("load-loc").innerHTML=`<div class="container"><div class="row">`+tableloc+`</div></div>`;
               document.getElementById("form-themsp").style.display='none';
            }

              
             
//lọc sp 2
                if(loc2==2){
                    sanpham.forEach(p =>{
                     if(p.giasp >= 200000 && p.giasp < 1000000){                        
                      tableloc2 +=
                      `<div class="col-lg-4 mb-3 mb-lg-0">
                      <div class="hover hover-5 text-white rounded">
                      <img src="../images/${p.hinhanhsp}" alt="">
                      <div class="hover-overlay"></div>
                      <div class="hover-5-noidung px-5 py-4 mt-3">
                      
                          <h3 class="hover-5-tieude text-uppercase font-weight-bold mb-0 text-white" style="color:">${p.tensp}<hr> 
                          <span class="font-weight-bold" style="color:red;">
                          ${p.giasp.replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.')} vnđ <br>
                          <div class="form-group">
                          
                          </div>       
                               
                          <a href="#" onClick="themspzogiohang(${p.idsp})" "> Thêm vào giỏ hàng</a><br>
                          <a href="#" onClick="editsp(${p.idsp})" style="color:white;">Sửa</a>
                          </span> </h3>        
                           
                          <p class="hover-5-trichdan font-weight-light mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                              </div>
                              </div>
                              </div> 
                      `;  
                         }})
                         document.getElementById("load-loc").innerHTML='<div class="container"><div class="row">'+tableloc2+'</div></div>';
                         document.getElementById("form-themsp").style.display='none';}

      //lọc sp 3                   
                if(loc3==3){
                    sanpham.forEach(s =>{
                     if(s.giasp > 1000000){                        
                      tableloc3 +=
                      `<div class="col-lg-4 mb-3 mb-lg-0">
                      <div class="hover hover-5 text-white rounded">
                      <img src="../images/${s.hinhanhsp}" alt="">
                      <div class="hover-overlay"></div>
                      <div class="hover-5-noidung px-5 py-4 mt-3">
                      
                          <h3 class="hover-5-tieude text-uppercase font-weight-bold mb-0 text-white" style="color:">${s.tensp}<hr> 
                          <span class="font-weight-bold" style="color:red;">
                          ${s.giasp.replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.')} vnđ <br>
                          <div class="form-group">
                          
                          </div>       
                               
                          <a href="#" onClick="themspzogiohang(${s.idsp})" "> Thêm vào giỏ hàng</a><br>
                          <a href="#" onClick="editsp(${s.idsp})" style="color:white;">Sửa</a>
                          </span> </h3>        
                           
                          <p class="hover-5-trichdan font-weight-light mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                              </div>
                              </div>
                              </div> 
                      `;  
                         }})
                         document.getElementById("load-loc").innerHTML='<div class="container"><div class="row">'+tableloc3+'</div></div>';
                         document.getElementById("form-themsp").style.display='none';}
}


function sendEmail() {
    var mail=document.getElementsByClassName('email')[0].value;  
    Email.send({
      Host: "smtp.gmail.com",
      Username: "tusmoker9898@gmail.com",
      Password: "tripro9x",
      To:mail,
      From: "tusmoker9898@gmail.com",
      Subject: "Đơn Hàng từ Tú SneakerShop",
      Body: "TuSneakerShop cám ơn bạn đã sử dụng mặt hàng của shop!Đơn hàng đang được vận chuyển!",
    })
      .then(function (message) {
        alert("mail sent successfully")
      });
  }