# **手机遥控接口总览**


- - -
##### 小前端电影列表同步

- 接口地址
http://openvod.cleartv.cn/backend_mgt/v1/cacheproxymovie

- 方法
POST

- 参数
```JSON
{
	"action": "updateMovieList",
	"projectID": "test",
	"mac":"xx:xx:xx:xx:xx",
	"data": "小前端电影json"
}
```


- 返回内容
```JSON
{
    "errInfo": "None",
    "rescode": "200"
}
```

- - - -
##### 获取所有电影列表

- 接口地址
http://openvod.cleartv.cn/backend_mgt/v1/cacheproxymovie

- 方法
POST

- 参数
```JSON
{
	"action": "getMovieList",
	"projectID": "test"
}
```

- 返回内容
```JSON
{
    "rescode": "200",
    "errInfo": "None",
    "data": {
		"Movies": [
            {
                "Introduce": {
                    "zh-CN": "经历了紧张刺激的伦敦大战，多米尼克·托雷托（范·迪塞尔 Vin Diesel 饰）和他的伙伴们重新回归平静的生活，但是江湖的恩恩怨怨却决不允许他们轻易抽身而去。棘手的死对头欧文·肖瘫在医院，不得动弹，他的哥哥戴克·肖（杰森·斯坦森 Jason Stantham 饰）则发誓要为弟弟复仇。戴克曾是美国特种部队的王牌杀手，不仅身怀绝技，而且心狠手辣。他干掉了远在东京的韩，还几乎把探长卢克·霍布斯（道恩·强森 Dwayne Johnson 饰）送到另一个世界，甚至多米尼克那世外桃源般的家也被对方炸毁。 \n　　复仇的利刃已经架在脖子上，多米尼克再也没有选择，他找到长久以来最为信赖的团队，与来势汹汹的戴克展开生死对决……",
                    "en-US": "Fast & Furious 7"
                },
                "PicSize": 70614,
                "Name": {
                    "zh-CN": "速度与激情7",
                    "en-US": "Fast & Furious 7"
                },
                "Seq": 173,
                "SearchName": "SDYJQ",
                "URL": "/Video/resource/suduyujiqing7.mp4",
                "Price": 5,
                "Tags": [
                    {
                        "CategoryID": 1
                    }
                ],
                "URL_ABS": "http://vodresource.cleartv.cn/movies/suduyujiqing7.mp4",
                "Actor": {
                    "zh-CN": "范·迪塞尔，保罗·沃克，杰森·斯坦森，米歇尔·罗德里格兹",
                    "en-US": "Vin Diesel, Paul Walker, Dwayne Johnson"
                },
                "Director": {
                    "zh-CN": "温子仁",
                    "en-US": "James Wan"
                },
                "PicURL_ABS": "http://mres.cleartv.cn/default/830bf85fe925564115a59418a783a6ef_148706271378.jpg",
                "Score": 8,
                "PicURL": "/Video/resource/830bf85fe925564115a59418a783a6ef_148706271378.jpg",
                "MovieSize": 3287790416,
                "Year": "2015",
                "Duration": 8394,
                "ID": 367,
                "Location": [
                    {
                        "LocationID": 2
                    }
                ]
            }
		],
		"MovieInfo": {
            "CurVersion": 304,
            "MoviesFilter": null,
            "PackageFee": 18,
            "FeeDiscount": 200
        },
		"Location": [
            {
                "LocationName": {
                    "zh-CN": "国产",
                    "en-US": "MainLand"
                },
                "ID": 1,
                "Location": "China"
            },
            {
                "LocationName": {
                    "zh-CN": "欧美",
                    "en-US": "USA&Euro"
                },
                "ID": 2,
                "Location": "EuroUS"
            },
        ],
        "Tags": [
            {
                "Category": "Hot",
                "ID": 0,
                "CategoryName": {
                    "zh-CN": "热门",
                    "en-US": "Hot"
                }
            },
            {
                "Category": "Action",
                "ID": 1,
                "CategoryName": {
                    "zh-CN": "动作",
                    "en-US": "Action"
                }
            }
        ]
	}
}
```

- - -
##### 获取所有电影分类列表

- 接口地址
http://openvod.cleartv.cn/backend_mgt/v1/cacheproxymovie

- 方法
POST

- 参数
```JSON
{
	"action": "getMovieTag",
	"projectID": "test"
}
```

- 返回内容
```JSON
{
    "data": [
        {
            "Category": "Hot",
            "ID": 0,
            "CategoryName": {
                "zh-CN": "热门",
                "en-US": "Hot"
            }
        },
        {
            "Category": "Action",
            "ID": 1,
            "CategoryName": {
                "zh-CN": "动作",
                "en-US": "Action"
            }
        },
        {
            "Category": "Love",
            "ID": 2,
            "CategoryName": {
                "zh-CN": "爱情",
                "en-US": "Love"
            }
        },
        {
            "Category": "Comedy",
            "ID": 3,
            "CategoryName": {
                "zh-CN": "喜剧",
                "en-US": "Comedy"
            }
        },
        {
            "Category": "Sci-Fi",
            "ID": 4,
            "CategoryName": {
                "zh-CN": "科幻",
                "en-US": "Sci-Fi"
            }
        },
        {
            "Category": "Cartoon",
            "ID": 5,
            "CategoryName": {
                "zh-CN": "动画",
                "en-US": "Cartoon"
            }
        },
        {
            "Category": "Dracula",
            "ID": 6,
            "CategoryName": {
                "zh-CN": "惊悚",
                "en-US": "Dracula"
            }
        },
        {
            "Category": "Documentary",
            "ID": 7,
            "CategoryName": {
                "zh-CN": "纪实",
                "en-US": "Documentary"
            }
        }
    ],
    "rescode": "200",
    "errInfo": "None"
}
```


- - -
##### 根据分类ID获取电影

- 接口地址
http://openvod.cleartv.cn/backend_mgt/v1/cacheproxymovie

- 方法
POST

- 参数
```JSON
{
	"action": "getMovieListByTag",
	"projectID": "test",
	"data": {"tagid":1}
}
```

- 返回内容
```JSON
{
    "data": [
        {
                "Introduce": {
                    "zh-CN": "经历了紧张刺激的伦敦大战，多米尼克·托雷托（范·迪塞尔 Vin Diesel 饰）和他的伙伴们重新回归平静的生活，但是江湖的恩恩怨怨却决不允许他们轻易抽身而去。棘手的死对头欧文·肖瘫在医院，不得动弹，他的哥哥戴克·肖（杰森·斯坦森 Jason Stantham 饰）则发誓要为弟弟复仇。戴克曾是美国特种部队的王牌杀手，不仅身怀绝技，而且心狠手辣。他干掉了远在东京的韩，还几乎把探长卢克·霍布斯（道恩·强森 Dwayne Johnson 饰）送到另一个世界，甚至多米尼克那世外桃源般的家也被对方炸毁。 \n　　复仇的利刃已经架在脖子上，多米尼克再也没有选择，他找到长久以来最为信赖的团队，与来势汹汹的戴克展开生死对决……",
                    "en-US": "Fast & Furious 7"
                },
                "PicSize": 70614,
                "Name": {
                    "zh-CN": "速度与激情7",
                    "en-US": "Fast & Furious 7"
                },
                "Seq": 173,
                "SearchName": "SDYJQ",
                "URL": "/Video/resource/suduyujiqing7.mp4",
                "Price": 5,
                "Tags": [
                    {
                        "CategoryID": 1
                    }
                ],
                "URL_ABS": "http://vodresource.cleartv.cn/movies/suduyujiqing7.mp4",
                "Actor": {
                    "zh-CN": "范·迪塞尔，保罗·沃克，杰森·斯坦森，米歇尔·罗德里格兹",
                    "en-US": "Vin Diesel, Paul Walker, Dwayne Johnson"
                },
                "Director": {
                    "zh-CN": "温子仁",
                    "en-US": "James Wan"
                },
                "PicURL_ABS": "http://mres.cleartv.cn/default/830bf85fe925564115a59418a783a6ef_148706271378.jpg",
                "Score": 8,
                "PicURL": "/Video/resource/830bf85fe925564115a59418a783a6ef_148706271378.jpg",
                "MovieSize": 3287790416,
                "Year": "2015",
                "Duration": 8394,
                "ID": 367,
                "Location": [
                    {
                        "LocationID": 2
                    }
                ]
            }
    ],
    "rescode": "200",
    "errInfo": "None"
}
```


- - -
##### 获取直播列表

- 接口地址
http://openvod.cleartv.cn/backend_mgt/v1/cacheproxymovie

- 方法
POST

- 参数
```JSON
{
	"action": "getLiveList",
	"projectID": "test"
}
```

- 返回内容
```JSON
{
    "data": [
        {
            "ChannelNum": 1,
            "ChannelName": {
                "zh-CN": "1",
                "en-US": "1"
            },
            "ChannelPicURL": "http://mres.cleartv.cn/default/2d468c7a0d86bbe592a5c918141122cb_150529552706.png"
        },
        {
            "ChannelNum": 2,
            "ChannelName": {
                "zh-CN": "2",
                "en-US": "2"
            },
            "ChannelPicURL": "http://mres.cleartv.cn/default/2d468c7a0d86bbe592a5c918141122cb_150529583036.png"
        },
        {
            "ChannelNum": 3,
            "ChannelName": {
                "zh-CN": "3",
                "en-US": "3"
            },
            "ChannelPicURL": "http://mres.cleartv.cn/default/2d468c7a0d86bbe592a5c918141122cb_150529583987.png"
        }
    ],
    "rescode": "200",
    "errInfo": "None"
}
```

- - -
##### 分页获取电影总列表

- 接口地址
http://openvod.cleartv.cn/backend_mgt/v1/cacheproxymovie

- 方法
POST

- 参数
```JSON
{
	"action": "getMoviePage",
	"projectID": "test",
	"data": {"page":1,"per_page":10}
}
```


- 返回内容
```JSON
{
    "data": [
        {
            "Introduce": {
                "zh-CN": "彼得帕克（汤姆·赫兰德 Tom Holland 饰）在内战后受到了钢铁侠托尼斯塔克（小罗伯特·唐尼 Robert Downey Jr. 饰）的赏识，表面上，彼得进入托尼的公司成为了一名实习生，实际上，他和复仇者联盟的成员们一起接受了各种各样的训练。托尼虽然欣赏彼得的勇敢和正直，却并不认为他目前已经拥有加入复联的实力，他派出了特工哈皮（乔恩·费儒 Jon Favreau 饰）暗中观察，这让十分想证明自己的彼得感到万分焦躁。 \n　　在对付两个银行劫匪的过程中，彼得发现劫匪们使用的是一种前所未见的新型武器，他孤身一人深入敌后顺藤摸瓜找到了幕后主使秃鹰（迈克尔·基顿 Michael Keaton 饰），让他彼得没有想到的是，秃鹰竟然是他爱慕的女生利兹（劳拉·海瑞尔 Laura Harrier 饰）的父亲",
                "en-US": "Thrilled by his experience with the Avengers, Peter returns home, where he lives with his Aunt May, under the watchful eye of his new mentor Tony Stark, Peter tries to fall back into his normal daily routine - distracted by thoughts of proving himself to be more than just your friendly neighborhood Spider-Man - but when the Vulture emerges as a new villain, everything that Peter holds most important will be threatened."
            },
            "PicSize": 117223,
            "Name": {
                "zh-CN": "蜘蛛侠：英雄归来",
                "en-US": "Spider-Man: Homecoming"
            },
            "Seq": 286,
            "SearchName": "ZZX",
            "URL": "/Video/resource/804414976677ccaff76e7182452a7007_150649356254_transcoded.mp4",
            "Price": 7,
            "URL_ABS": "http://vodresource.cleartv.cn/movies/804414976677ccaff76e7182452a7007_150649356254_transcoded.mp4",
            "Actor": {
                "zh-CN": "汤姆·霍兰德 / 小罗伯特·唐尼 / 玛丽莎·托梅",
                "en-US": "Tom Holland, Michael Keaton, Robert Downey Jr."
            },
            "Director": {
                "zh-CN": "乔·沃茨",
                "en-US": "Jon Watts"
            },
            "PicURL_ABS": "http://mres.cleartv.cn/default/2b890afeff164aebe4eb189dd948359d_150649607034.jpg",
            "Score": 7.5,
            "PicURL": "/Video/resource/2b890afeff164aebe4eb189dd948359d_150649607034.jpg",
            "MovieSize": 3114504179,
            "Year": "2017",
            "Duration": 8006,
            "ID": 626
        }
    ],
    "rescode": "200",
    "errInfo": "None"
}
```


- - -
##### 检查小前端电影版本

- 接口地址
http://openvod.cleartv.cn/backend_mgt/v1/cacheproxymovie

- 方法
POST

- 参数
```JSON
{
	"action": "checkVersion",
	"projectID": "nanqinghuameida"}
}
```

- 返回内容
```JSON
{
    "data": {
        "curVersion": "605",
        "proxyVersion": "605",
        "isNewest": true
    },
    "rescode": "200",
    "errInfo": "None"
}
```


- - -
##### 发送遥控器事件接口

- 接口地址
http://openvod.cleartv.cn/backend_wx/v1/remote_control

- 方法
POST

- 参数
```JSON
{
	"package": "com.clearcrane.vod",
	"alias":"test$888$123123123",
	"action":"playMovie",    // playLive  keyEvent
	"project":"test",
	"userID":"123",
	"sendTime":1504251464539,
	"data": {
		"movieID": 433, // action：playMovie  movie的ID 
		"channelIndex": 0, // action：playLive  电视频道的序号,从0开始
		"keyCode": 22 // action：keyEvent  android键值，见附录
	}
}
```


- 返回内容
```JSON
{
    "data": {
        "sendno": "0",
        "msg_id": "561987800"
    },
    "rescode": "200",
    "errInfo": "None"
}
```

- - -
##### 获取遥控器二维码地址

- 接口地址
http://openvod.cleartv.cn/rc/getremoteurl

- 方法
POST

- 参数
```JSON
{
    "alias": "nanqinghuameida$888$1507863801652",
    "regID": "100d8559097c403c504",
    "platform": "A3000Y",
    "appVersion": 1073,
    "ip": "192.168.17.72",
    "controllerVersion": 10,
    "scenes": [
        "Start",
        "Welcome",
        "Menu",
        "MovieList",
        "MovieDetail"
    ]
}
```


- 返回内容
```JSON
{
    "data": {
        "Start": "http://openvod.cleartv.cn/rc/4ddb2e455e",
        "Welcome": "http://openvod.cleartv.cn/rc/391a170196",
        "MovieDetail": "http://openvod.cleartv.cn/rc/5bbbae71ff",
        "MovieList": "http://openvod.cleartv.cn/rc/25eeb03231",
        "Menu": "http://openvod.cleartv.cn/rc/1957aa9043"
    },
    "errInfo": "None",
    "rescode": "200"
}
```

- - -
##### 遥控器案件统计上传

- 接口地址
http://openvod.cleartv.cn/rc/uploadcontrolevent

- 方法
POST

- 参数
```JSON
{
	"action":"updateEvent",
	"alias":"nanqinghuameida$888$1507863801652",
	"local":122,
    "remote":12
}
```


- 返回内容
```JSON
{
    "errInfo": "None",
    "rescode": "200"
}
```

- - -
##### 获取用户微信信息

- 接口地址
http://openvod.cleartv.cn/backend_wx/v1/buildsession

- 方法
POST

- 参数
```JSON
{
    "appid": "wxeae127ff98a4c844",
    "code": "031RzCQ00fYtKC11OmN00vlwQ00RzCQV"
}
```


- 返回内容
```JSON
{
    "openid": "o3y-kw4cmQAHR5tUZq62aRKWh0B0",
    "access_token": "qGsGr1rjYSay7y-2hpH90qVRYZ2UhfPf4TXfcmF0GiTEnzYpfn3XOQLvMXIIjdraDNaiEpD3-aoZZMTWh8E2oWxrP4y3tK2jljzL4C014jGjsFUPY4SdnaU6NuX9Pmz0",
    "expires_in": 7200,
    "clear_session": "xxxxxxxx",
    "scope": "snsapi_userinfo",
    "refresh_token": "Ryd1WyrW-rCwBRR_1MdzmPJxGmpt4nKOCSz9LKm04XiZ3iZouEUq_hba0IZB7DqdS5SuwcEW0eUF8v8PdJlxZol_98q3nuxTuHRgrYYLQXQRySSUYTCMI1f-K8c0UcdM"
}
```

- - -
##### 查看该用户是否关注公众号

- 接口地址
http://openvod.cleartv.cn/backend_wx/v1/wxusersubscheck

- 方法
POST

- 参数
```JSON
{
	"clear_session": "openvod_userid_94_lyk8ad7w",
	"lang":"zh_CN"
}
```

- 返回内容
```JSON
{
    "openid": "o3y-kwylHsmxoHewqeeQSzXFCxes",
    "subscribe": 1 //0 未关注；1 关注
}
```

- - -
##### 获取关注该公众号的URL

- 接口地址
http://openvoddev.cleartv.cn/backend_wx/v1/subscribeurl

- 方法
POST

- 参数
```JSON
{
	"clear_session":"openvod_userid_94_lyk8ad7w"
}
```

- 返回内容
```JSON
{
	"rescode":"200"
    "subscribeurl": "http://weixin.qq.com/q/02q6SbhzkWeo410000w038",
	"urlType": "redirect" // redirect，直接跳转； qrcode 展示成二维码 ；image 展示图片
}
```

- - -
##### 获取JSSDK所需的Signature

- 接口地址
http://openvoddev.cleartv.cn/backend_wx/v1/jssdksign

- 方法
POST

- 参数
```JSON
{
	"appid":"wxeae127ff98a4c844",
	"clear_session":"openvod_userid_94_lyk8ad7w",
	"url":"xxxxxx"
}
```

- 返回内容
```JSON
{
	"rescode":"200"
    "signature": "xxxxxxxx",
	"noncestr": "xxxxxxxx",
	"timestamp": 123123123,
	"errInfo": "None"
}
```

- - -
##### 用户与终端绑定

- 接口地址
http://openvod.cleartv.cn/backend_wx/v1/bindtvdevice

- 方法
POST

- 参数
```JSON
{
	"clear_session":"openvod_userid_94_lyk8ad7w",
	"deviceid":"xxxxxx"
}
```


- 返回内容
```JSON
{
    "errInfo": "None",
    "rescode": "200"
}
```

- - -
##### 获取用户绑定的终端

- 接口地址
http://openvod.cleartv.cn/backend_wx/v1/gettvdeviceid

- 方法
POST

- 参数
```JSON
{
	"clear_session":"openvod_userid_94_lyk8ad7w"
}
```


- 返回内容
```JSON
{
	"deviceid": "demo$888$123123123"
    "errInfo": "None",
    "rescode": "200"
}
```



## 附录：KeyCode
| Name       | KeyCode |
| ---------  | -----:  |
| Up  		 |    19   |
| Down       |    20 |
| Left       |    21 |
| Right      |    22 |
| Back       |    4 |
| OK         |    23 |
| VolUp      |    24 |
| VolDown    |    25 |
| ChannleUp  |    92 |
| ChannelDown|    93 |
| Home       |    135 |
| Menu       |    82 |
| TV         |    170 |
| 静音       |    164 |
| Power      |    26 |
| 0-9    |  7-16 |
| A-Z    | 29-54 |
| Del    |    67 |
