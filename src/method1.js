function $(str){
	return document.getElementById(str);
}

var address = $("address"); //地址显示框
var btn = document.getElementsByClassName("btn")[0]; //确定按钮
var provinceSelect = $("province"); //省份选择
var citySelect = $("city"); //城市选择
var countySelect = $("county"); //县区选择

var curr = { //当前选择地区
	prov: "",
	city: "",
	county: ""
};

(function loadProvince(){ //加载省份，自调用直接加载
	btn.disabled = true;
	var len = region.length;
	for(var i = 0; i < len; i++){
		var provinceOpt = document.createElement("option");
		provinceOpt.innerText = region[i].name;
		provinceSelect.appendChild(provinceOpt);
	}
})();

function loadCity(obj){ //加载城市，在选中一个省份后开始加载
	btn.disabled = true;
	var provIndex = obj.selectedIndex - 1;
	curr.prov = provIndex;
	
	citySelect.length = 1;
	countySelect.length = 1; //清空city和county的select

	if(provIndex == -1){ //选择为：=请选择省份=，直接返回
		return;
	}

	if(provIndex != null){ //根据选择的省份加载相应城市
		var cityLen = region[provIndex].city.length;
		for(var j = 0; j < cityLen; j++){
			var cityOpt = document.createElement("option");
			cityOpt.innerText = region[provIndex]["city"][j].name;
			citySelect.appendChild(cityOpt);
		}
	}
}

function loadCounty(obj){
	btn.disabled = true;
	var cityIndex = obj.selectedIndex - 1;
	curr.city = cityIndex;

	countySelect.length = 1; //清空county的select

	if(cityIndex == -1){
		return;
	}

	if(cityIndex != null){
		var countyLen = region[curr.prov]["city"][cityIndex].districtAndCounty.length;

		if(countyLen == 0){ // 城市下再无县区，可直接点确定
			btn.disabled = false;
			curr.county = "";
		}

		for(var k = 0; k < countyLen; k++){
			var courtyOpt = document.createElement("option");
			courtyOpt.innerText = region[curr.prov]["city"][cityIndex]["districtAndCounty"][k];
			countySelect.appendChild(courtyOpt);
		}
	}
}

function selectedCounty(obj){ //选择县区后
	var countyIndex = obj.selectedIndex - 1;
	curr.county = countyIndex;
	if(countyIndex == -1){
		btn.disabled = true;
		return;
	}
	btn.disabled = false;
}

function showRegion(){ //点击确定，显示地区
	console.log(curr.county);
	console.log(typeof curr.county);
	if(curr.county === ""){ //无县区情况
		address.value = region[curr.prov].name + '-' + region[curr.prov]["city"][curr.city].name;	
	}
	else address.value = region[curr.prov].name + '-' + region[curr.prov]["city"][curr.city].name + '-' + region[curr.prov]["city"][curr.city]["districtAndCounty"][curr.county];
}




