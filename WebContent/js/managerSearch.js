console.log("searchBtn");
$("#manager .form1").on('click','#search-btn',function(){
    console.log("searchBtn.........");
    var kw = $('#txtSearch').val();
    console.log(kw);
    searchLoad(1,kw);

    $('#manager .pager').on('click','a',function(event){
        event.preventDefault(); //阻止跳转行为
        //获取要跳转的页号
        var pageNum = $(this).attr('href');
        searchLoad(pageNum,kw)
    });
});
//功能点五 用户点击分页条号时实现异步加载
/**功能点5：用户点击分页条中的页号时，实现数据的异步加载**/

function searchLoad(pageNum,kw){
    $.ajax({
        url:"data/managerSearch.php?pageNum="+pageNum+"&kw="+kw,
        data: {mname: sessionStorage['loginName']},
        success:function(pager){
            var html='';
            $.each(pager.data,function(i,d){
                html+=`
                <tr>
                  <td>${d.mid}</td>
                  <td>${d.mname}</td>
                  <td><button id="del" class="${d.mid}">删除</button></td>
                </tr>
                `;
            });
            $("#manager table tbody").html(html);
            //根据返回的响应数据动态创建分页条
            var html = '';
            //html += `<a href="${pager.pageNum-pager.pageNum+1}">首页</a> `;
            if(pager.pageNum-2>0){
                html += `<a href="${pager.pageNum-2}">${pager.pageNum-2}</a> `;
            }
            if(pager.pageNum-1>0){
                html += `<a href="${pager.pageNum-1}">${pager.pageNum-1}</a> `;
            }
            html += `<a href="#" class="curr">${pager.pageNum}</a> `;
            if(pager.pageNum+1<=pager.pageCount){
                html += `<a href="${pager.pageNum+1}">${pager.pageNum+1}</a> `;
            }
            if(pager.pageNum+2<=pager.pageCount){
                html += `<a href="${pager.pageNum+2}">${pager.pageNum+2}</a> `;
            }
            //html += `<a href="${pager.pageNum}">尾页</a> `;
            $('#manager .pager').html(html);

            //删除商品
            $('#manager tbody').on('click','#del',function(event){
                event.preventDefault();
                var mid = $(this).attr('class');
                //发起异步请求
                $.ajax({
                    type: 'POST',
                    url: 'data/deleteManager.php',
                    data: {mname: sessionStorage['loginName'],mid:mid},
                    success: function(obj){
                        alert("删除成功");
                        location.reload();
                    }
                });
            });
        }
    });
}
