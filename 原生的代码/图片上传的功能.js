class Uploads {
	constructor(that){
		/*
			btn:点击按钮
			readFile:用户选择的图片
		*/
		this.settings = {
			readFile:null,
			btn:null,
			drag:null,
			view:function(){},
			actionMount:function(){},
			uploadEndMount:function(){},
			progressMount:function(){},
			bong:function(){},
			ondrog:function(){},
			dragleave:function(){}
		}
		this.arr = []; 
		this.num = 0;
	}
	
	
	init(opt){
		let _this = this;
		$.extend(this.settings,opt);
		
		//选择图片
		if(this.settings.readFile){
			
			
			this.settings.readFile.change(function(ev){
				
				_this.addPic(this.files[0]);
				
	
				ev.target.value = '';
			});
		}
		
		if(this.settings.btn){
			//点击的时候去上传
			this.settings.btn.click(function(){
				_this.send();
				_this.settings.actionMount(_this.arr);
			});
		}
		
		
		
		$(document).on('dragover',function(){return false})
		if(this.settings.drag){
			//拖拽抬起
			this.settings.drag.on('drop',function(ev){
				
				//console.log();
				
				_this.addPic(ev.originalEvent.dataTransfer.files[0]);
				_this.settings.ondrog();
				return false;
			});
			
			//拖拽移入
			this.settings.drag.on('dragenter',function(ev){
				_this.settings.bong();
			});
			
			
			this.settings.drag.on('dragleave',function(ev){
				_this.settings.dragleave();
			});
			
			
			
			
		}
		
	}
	
	//添加不重复的数据。
	addPic(data){
		if(!this.arr.some(e=>e.name == data.name)){
			this.arr.push(data);
			
			//不重复才显示选中的图片。
			this.settings.view(data);
		}
	}
	
	send(){
		let _this = this;
		this.arr.forEach(e=>{
			let fromData = new FormData;
			fromData.append('file',e);
			
			$.ajax({
				url:'php/post_file.php',
				method:'post',
				data:fromData,
				processData:false,
				contentType:false,
				success:function(data){
					_this.num ++;
					
					//上传进度(每次传成功的数字,总数字)
					_this.settings.progressMount(_this.num,_this.arr.length);
					
					if(_this.num == _this.arr.length){
						//全部上传成功
						_this.settings.uploadEndMount();
						_this.arr.length = 0;
						_this.num = 0;
					}
					
					//console.log(111);
				}
			});
		});
	}
	
	changeData(data,callback){
		
		var fr = new FileReader;
		fr.onload = function(){
			
			callback(fr.result);
			//console.log(fr.result);
		}
		
		fr.readAsDataURL(data);
		
	}
	
	//删除被选中的数据。
	removeData(name){
		this.arr = this.arr.filter(e=>e.name != name);
		
		console.log(this.arr);
	}
	
	
}



$.fn.extend({
	
	uploads(opt){
		console.log(1232132)
		let uploads = new Uploads(this);
		
		uploads.init(opt);
		
		return {that:this,up:uploads};
	},
	
	msk(val){
		
		this.html(val);
		
		this.animate({
			top:0
		});
		
		this.delay(800).animate({
			top:-20
		});
	}
	
	
});

