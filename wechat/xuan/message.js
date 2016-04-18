/**
 * Created by lenovo on 2016/4/18.
 */
/**
 * Created by lenovo on 2016/4/17.
 */

var PORT=8070;
var http = require('http');
var qs = require('qs');
var TOKEN='millie';

function checkSignature(params,token){
    var key=[token,params.timestamp,params.nonce].sort().join('');
    var sha1 = require('crypto').createHash('sha1');
    sha1.update(key);
    return sha1.digest('hex')==params.signature;
}

var server = http.createServer(function(request,response){
    var query = require('url').parse(request.url).query;
    var params = qs.parse(query);
    //console.log(params);
    // console.log("token-->",TOKEN);
    //如果签名不对，结束请求并返回
    if(!checkSignature(params,TOKEN)){
        response.end('signature fail');
        return;
    }

    if(request.method == "GET"){
        //如果请求是GET，返回echostr用于通过服务器有效校验
        response.end(params.echostr);
    }else{
        //否则是微信给开发者服务器的POST请求
        var postdata = "";
        request.addListener("data", function (postchunk) {
            postdata += postchunk;
        });
        //获取到了POST数据
        request.addListener("end",function(){
            var parseString = require('xml2js').parseString;

            parseString(postdata, function (err, result) {
                if(!err){
                    console.log(result);
                    response.end('success');
                }
            });
            //console.log(postdata);
            // response.end('success');
        });
    }

});

server.listen(PORT);
console.log("Server running at port "+PORT+".");