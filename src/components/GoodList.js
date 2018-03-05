import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import '../style/GoodList.scss';
import '../iconfont/iconfont.css';
import axios from 'axios';



export default class GoodList extends Component {
	constructor(props){
		super(props);
		
		this.state={
			GoodListImg:[],
			
		}
		this.gotoA = this.gotoA.bind(this);
		this.gotoB = this.gotoB.bind(this);
		this.gotoC = this.gotoC.bind(this);
	}
	componentDidMount(){
		axios.get("/search/?e="+this.props.match.params.fid+"&page=1")
		.then((res)=>{
			console.log(res);
			this.setState({
				GoodListImg:res.data.result.data,
			})
		})
		
		var lis = document.querySelectorAll(".GoodListUl>li");
		var spans = document.querySelectorAll(".GoodListUl>li>span");
		var len = lis.length;
		
		for (var m=0; m<len; m++){
		    (function(i){
		        lis[i].onclick = function(){
		           for(var j = 0; j<len; j++){
		               spans[j].style.color = "#000";
		           } 
		           spans[i].style.color = "#f00";
		           }
		    })(m)
		}		
	}
	gotoA(fia){		
		console.log(fia);
		axios.get("/search/?e="+this.props.match.params.fid+"&page=1"+fia)
		.then((res)=>{
			console.log(res);
			this.setState({
				GoodListImg:res.data.result.data,
			})
		})		
	}
	gotoB(fib){		
		console.log(fib);
		axios.get("/search/?e="+this.props.match.params.fid+"&page=1"+fib)
		.then((res)=>{
			console.log(res);
			this.setState({
				GoodListImg:res.data.result.data,
			})
		})
	}
	gotoC(fic){		
		console.log(fic);
		axios.get("/search/?e="+this.props.match.params.fid+"&page=1"+fic)
		.then((res)=>{
			console.log(res);
			this.setState({
				GoodListImg:res.data.result.data,
			})
		})
	}
	render() {
		var that=this;
		return (			
			<div className="goodListBox">
				<header>				
					<div className="topLeft">
						<Link to="/">
							<i className="iconfont">&#xe610;</i>
						</Link>
					</div>
					<div className="topLogo">
						<span>{this.props.match.params.fit}</span>
					</div>
					<div className="topRight">
						<div className="left">
							<i className="iconfont">&#xe600;</i>
						</div>
						<div className="right">
							<i className="iconfont">&#xe785;</i>
						</div>								
					</div>
				</header>
				
				<section>					
					<ul className="GoodListUl">
						<li onClick={()=>that.gotoA("")}>
							<span className="listSpan">综合</span>
						</li>
						<li onClick={()=>that.gotoB("&sort=o1")}>
							<span>销量</span>
						</li>
						<li onClick={()=>that.gotoC("&sort=o5")}>
							<span>价格</span>
						</li>
						<li onClick={()=>that.gotoC("&sort=o5")}>
							<span>筛选</span>
						</li>
					</ul>
					<div className="GoodListZh">
						<ul>
							{
								this.state.GoodListImg.map((item,index)=>{
									return (
										<li key={item.goodsId}>
											<Link to={"/goodRegister/"+item.goodsId}>
												<div className="listImg">
													<img src={"http://image.loho88.com/"+item.img} alt=""/>
												</div>
												<div className="listMesg">
													<span>{item.title}</span>
												</div>
												<div className="listPrice">
													<span>￥ {item.price}</span>
													<span>{item.salesNum}人已买</span>
												</div>
											</Link>
										</li>
									)
								})
							}
						</ul>
					</div>
				</section>
			</div>
		)
	}
}

