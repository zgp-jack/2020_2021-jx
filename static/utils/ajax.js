
import {Dialog} from 'vant';

export default function ajax_post(url,data){
	var ajax=new XMLHttpRequest();
		ajax.open('post',url);
        ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        ajax.send('gourideToken=$2y$10$pP56P69AqKKxxuQFzM./Juh.WzX5dzduO9YDR7qDMHGbYl5MBCoUK&hamapi=112921');
		// if(data){
		// 	ajax.send('gourideToken=$2y$10$pP56P69AqKKxxuQFzM./Juh.WzX5dzduO9YDR7qDMHGbYl5MBCoUK&hamapi=112921');
		// }else{
		// 	ajax.send();
		// }
		ajax.onreadystatechange=function(e){
            Dialog.alert({
                title:'提示',
                message: ajax.responseText,
            });
			if(ajax.readyState==4&&ajax.status==200){
				// Dialog.alert({
                //     title:'提示3',
                //     message: ajax.responseText,
                // });
		    }
	}
}