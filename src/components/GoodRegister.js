import React, {Component} from 'react';
import {Link} from 'react-router-dom';
//import Carousel from 'antd-mobile/lib/carousel';
//import WingBlank from 'antd-mobile/lib/wing-blank';
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.min.css';
import '../style/GoodRegister.scss';
import '../iconfont/iconfont.css';
import axios from 'axios';



export default class GoodRegister extends Component {
	constructor(props){
		super(props);
		
		this.state={
			GoodRegitsterLunboImg : [],
			GoodRegs : {},
			GoodRegPromiseTag : [],
			GoodRegModels : [],
			GoodRegColors : [],

		}
	}
	componentDidMount(){
		axios.get("/goods/"+this.props.match.params.fidReg)
		.then((res)=>{
			console.log(res);
			this.setState({
				GoodRegitsterLunboImg : res.data.result.info.pics,
				GoodRegs : res.data.result.info,
				GoodRegPromiseTag : res.data.result.info.promiseTag,
				GoodRegModels : res.data.result.models,

			})
			
			//var len = this.state.GoodRegModels.length;
			//for(var i=0; i<len; i++){
			//	this.state.GoodRegColors.push(this.state.GoodRegModels[i].goodsName.split(" ")[3]);
			//}

			var lis = document.querySelectorAll(".goodRegColor>ul>li");
			var spans = document.querySelectorAll(".goodRegColor>ul>li>span");
		    var len = lis.length;
		    var that = this;
		    for (var m=0; m<len; m++){

			    (function(i){
			        lis[i].onclick = function(){
			           for(var j = 0; j<len; j++){
			               spans[j].style.color = "#000";
			               spans[j].style.background = "#c8c8c8";
			           } 
			           spans[i].style.color = "#fff";
			           spans[i].style.background = "#F48F18";

			           axios.get("/goods/"+that.state.GoodRegModels[i].goodsId)
			           .then((res)=>{
			           		console.log(res+"444");
			           		that.setState({								
								GoodRegitsterLunboImg : res.data.result.info.pics,
								GoodRegs : res.data.result.info,
								GoodRegPromiseTag : res.data.result.info.promiseTag,
								GoodRegModels : res.data.result.models,
				
							})
			           })
			      }.bind(this)
			    })(m)
			}
		    
		    if(this.state.GoodRegPromiseTag.length === 0){
		    	document.querySelector(".goodRegPromiseTag").style.visibility = "none";
		    }

			
		})

		//setTimeout(() => {

	     	new Swiper('.swiper-container', {
				autoplay:{
					delay: 2000,
				},				
				pagination: {
				    el: '.swiper-pagination',
				    type: 'bullets',
				    bulletElement : 'li',
				},
				loop:true,
			})
	    //}, 500);	    	    	    		
	}
	
	render() {
		
		return (			
			<div className="goodRegisterBox">
				<header>				
					<div className="topLeft">
						<Link to="/">
							<i className="iconfont">&#xe610;</i>
						</Link>
					</div>
					<div className="topLogo">
						<span></span>
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
					<div className="lunbos">
						<div className="swiper-container">
							<div className="swiper-wrapper">
								{
									this.state.GoodRegitsterLunboImg.map((item,index)=>{
										return (
											<div className="swiper-slide" key={item}>
												<img src={"http://image.loho88.com/"+item} alt="" />
											</div>
										)
									})
								}
							</div>
							<div className="swiper-pagination"></div>
						</div>
					</div>					
					
					<div className="goodRegName">
						<div className="regNameLeft">
							<span>{this.state.GoodRegs.goodsName}</span>
						</div>
						<div className="regNameRight">
							<span className="regSpan">
								<i className="iconfont">&#xe61e;</i>
								<span>分享</span>
							</span>
						</div>
					</div>
					
					<div className="goodRegsPrice">
						<div className="goodRegPrice">
							<div className="goodRegPrice-shopPrice">
								<span>￥ {this.state.GoodRegs.shopPrice}</span>
							</div>
							<div className="goodRegPrice-goodsType">
								<span>快递:￥{this.state.GoodRegs.goodsType}</span>
							</div>
							<div className="goodRegPrice-salesNum">
								<span>{this.state.GoodRegs.salesNum}人已买</span>
							</div>
						</div>
					</div>
					
					if(this.state.GoodRegPromiseTag.length > 0){
						
							<div className="goodRegPromiseTag">
								<ul>
									{
										this.state.GoodRegPromiseTag.map((item,index)=>{
											return (
												<li key={item}>
													<i className="iconfont">&#xe625;</i>
													<span>
														{item}
													</span>
												</li>
											)
										})	
									}	
								</ul>
							</div>
						
					}else{
						<div></div>
					}
					<div className="goodRegColor">
						<p>
							<span>颜色选择</span>
						</p>
						<ul>
							{
								this.state.GoodRegModels.map((item,index)=>{
									return(
										<li key={item.goodsId}>
											<span>{item.color}</span>
										</li>
									)
								})
							}
						</ul>
					</div>
				</section>
				
				<footer>
					<div className="regFooterLeft">
						<div className="regFooterLeft-kf">
							<p><i className="iconfont">&#xe64c;</i></p>
							<span>客服</span>
						</div>
						<div className="regFooterLeft-sc">
							<p><i className="iconfont">&#xe6a7;</i></p>
							<span>收藏</span>
						</div>
					</div>
					<div className="regFooterRight">
						<div className="regFooterRight-gwc">
							<span>加入购物车</span>
						</div>
						<div className="regFooterRight-fj">
							<span>预约附近验光点</span>
						</div>
					</div>				
				</footer>
			</div>
		)
	}
}

