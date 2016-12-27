/**
 * Created by admin on 2016/12/21.
 */
var casper = require('casper').create();
var url='https://www.baidu.com/index.php?tn=78040160_47_pg';
var fs=require('fs');
phantom.outputEncoding="gb2312"
casper.on("remote.message",function (msg) {
    console.log(msg);
})
casper.start(url,function () {
    console.log("打开网站了！");
    console.log(url);
});
  var mydata;
casper.then(function() {
    this.page.injectJs('node_modules/jquery/dist/jquery.js');
    var result = this.evaluate(function () {
        var item = [];
        var a;
       a= $('#header').text();
        console.log(a);
        $('#header').children().each(function (index,element) {
            var data = {};
            if(element.tagName==='DIV'){
                data.name=$(element).text();
                data.url=$(element).attr('href');
            }else if(element.tagName==='IMG'){
                data.path=$(element).text();
                data.imapath=$(element).attr('src');
            }
            // if(element.tagName==='IMG'){
            //     data.img=$(element).attr(src);
            // }
            item.push(data);
            console.log(element.text());
        })
        return item;
    });
    mydata=result;
});

casper.then(function () {
    var datainfo=JSON.stringify(mydata);
    fs.write("my.json",datainfo,644);


})


casper.run();