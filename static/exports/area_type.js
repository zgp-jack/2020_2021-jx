const area = require('./area.js')
/**原始数据 分层 */
function StorageType(array,pid_zero='1'){
    var par = [],
        son = [],
		len = array.length;
	
	for(var i = 0;i<len;i++){
		if (array[i].pid == pid_zero){
			par.push(array[i])
			let son_item = [{ "id": array[i].id, "pid": array[i].id, "name": array[i].name }]
			if (!(pid_zero == '1' && array[i].id == '1')) {
				array.forEach(function (val, key) {
					if (val.pid == array[i].id) { son_item.push(val) }
				})
			}
			son.push(son_item)
		}else continue
	}
    return { "par": par, "son": son }
}

function GetArea(){
    let result = StorageType(area.area, '1')
    return { "area": [{ id: 1, name: "全国", pid: "0" }].concat(result.par), "city": [{ id: 1, name: "全国", pid: "0" }].concat(result.son) }
}

module.exports = {
    get_area: GetArea,
}