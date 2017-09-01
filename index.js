
module.exports = function (source) {
	// 启用缓存
	this.cacheable && this.cacheable();

	// 做一些处理
	var reg = /\ssrc.*\.\w{2,3}/g;
	var result = source.replace(reg, function (args) {
		var timestamp = Date.now();
		var fileUrl = args.split('=');
		var attrString = fileUrl[0];
		var name = fileUrl[1].slice(1);
		return attrString + '=' + fileUrl[1].slice(0, 1) + name + '?version=' + timestamp;
	});

	// 同步字符串处理，直接return返回
	return "module.exports = " + JSON.stringify(result);

	// 若需要配合，返回多个数据给下一个loader
	// this.callback(null, source, other);

	// 若需要异步
	// var callback = this.async();
	// doSomething(content, function(err, result) {
	// 		if(err) return callback(err);
	// 		callback(null, result);
	// });
}
