import React, { Component } from 'react';
import {Link} from 'react-router-dom';
//import Carousel from 'antd-mobile/lib/carousel';
//import WingBlank from 'antd-mobile/lib/wing-blank';
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.min.css';
import '../style/Shouye.scss';
import '../iconfont/iconfont.css';
import axios from 'axios';



export default class Shouye extends Component {
	constructor(props) {
		super(props);
	
		this.state = {
			lunboImg: [],
			navListImg:[],
			newPublishImg:{},
			listImg:[],
			presonImgs:{},
			guangaoImg:{},			
			presonImg:[],
			
		}

		
	}
	componentDidMount() {
		axios.get("/index")
			.then((res) => {
				console.log(res);
				this.setState({
					lunboImg: res.data.result.focus,
					navListImg:res.data.result.cates,
					newPublishImg:res.data.result.ad[0],
					presonImgs:res.data.result.popular,
					presonImg:res.data.result.popular.show,
					listImg:res.data.result.classify,
					guangaoImg:res.data.result.popular.img
				})
				console.log(this.state.listImg);
		})
		setTimeout(() => {
		    new Swiper('.swiper-container', {
				autoplay:{
					delay: 2000,
				},
				loop:true,
				pagination: {
				    el: '.swiper-pagination',
				    type: 'bullets',
				    //clickable :true,
				    bulletElement : 'li',
				},				
			})
		}, 500);
	}

	render() {
		return(			
				<div className="box">
					<header>
						<div className="topLeft">
							<a href="">北京市</a>
							<i className="iconfont">&#xe615;</i>
						</div>
						<div className="topLogo"></div>
						<div className="topRight">
							<div className="left">
								<i className="iconfont">&#xe600;</i>
							</div>
							<div className="right">
								<Link to="/goodList">
									<i className="iconfont">&#xe66e;</i>
								</Link>

							</div>								
						</div>
					</header>
					<section>				
						<div className="lunbo">
							<div className="swiper-container">
								<div className="swiper-wrapper">
									{
										this.state.lunboImg.map((item,index)=>{
											return (
												<div className="swiper-slide" key={item.pic}>
													<img src={item.pic} alt="" />
												</div>
											)
										})
									}
								</div>
								<div className="swiper-pagination"></div>
							</div>
						</div>
							
						<div className="navs">
							<ul>
								{
									this.state.navListImg.map((item,index)=>{
										return (
											<li key={item.tag}>
												<Link to={"/goodList/"+item.tid+"/"+item.tag}>
													<img src={item.pic} alt=""/>
													<span>{item.tag}</span>
												</Link>
											</li>
										)
									})
								}
							</ul>
						</div>
							
						<div className="newPublish">									
							<div>
								<img src={this.state.newPublishImg.pic} alt=""/>
							</div>										
						</div>
							
						<div className="preson">
							<div className="presonTop">
								<div className="presonTopLeft">
									<span>人气推荐</span>
								</div>
								<div className="presonTopRight">
									<span>更多 ></span>
								</div>
							</div>
							<div className="guanggao">
								<img src={this.state.guangaoImg.pic} alt=""/>
							</div>
							<ul className="presonUl">
								{
									this.state.presonImg.map((item,index)=>{
										return (
											<li key={item.tag}>
												<div className="aa">
													<span>{item.tag}</span>
												</div>
												<div className="bb">
													<span>{item.tag_en}</span>
												</div>
												<div className="cc">
													<img src={item.pic} alt=""/>
												</div>
											</li>
										)
									})
								}
							</ul>
						</div>
							
						{
							this.state.listImg.map((item,index)=>{
								return(
									<div className="list" key={item.title.word}>
										<div className="listTop">
											<div className="listTopLeft">
												<span>{item.title.word}</span>
											</div>
											<div className="listTopRight">
												<span>{item.more.word}</span>
											</div>
										</div>
										<div className="listGuanggao">
											<img src={item.img.pic} alt=""/>
										</div>
										
										<dl className="listGoodDl">										
											<dt>
												<p>{item.show[0].tag}</p>
												<p>{item.show[0].tag_en}</p>
												<p><img src={item.show[0].pic} alt=""/></p>
											</dt>	
											<dd>
												<div className="ddTop">
													<p>{item.show[1].tag}</p>
													<p>{item.show[1].tag_en}</p>
													<p><img src={item.show[1].pic} alt=""/></p>
												</div>
												<div className="ddDown">
													<p>{item.show[2].tag}</p>
													<p>{item.show[2].tag_en}</p>
													<p><img src={item.show[2].pic} alt=""/></p>
												</div>
											</dd>					
										</dl>
									</div>
								)
							})
							
						}	
					</section>
					<footer>
						<a>
							<p>
								<i className="iconfont">&#xe611;</i>
							</p>
							<span>首页</span>
						</a>
						<a>
							<p>
								<i className="iconfont">&#xe7b1;</i>
							</p>
							<span>团购</span>
						</a>
						<a>
							<p>
								<i className="iconfont">&#xe646;</i>
							</p>
							<span>客服</span>
						</a>
						<a>
							<p>
								<i className="iconfont">&#xe615;</i>
							</p>
							<span>附近体验店</span>
						</a>
						<a>
							<p>
								<i className="iconfont">&#xe621;</i>
							</p>
							<span>我的</span>
						</a>
					</footer>
				</div>

		)
	}
}


